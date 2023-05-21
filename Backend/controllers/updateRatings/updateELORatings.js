// ----- Imports ----- //
const Contest = require("../../models/contest.js");
const User = require("../../models/user.js");
const calculateElo = require("../../utils/calculateElo.js");
const sortObjectsByPointsDescending = require("../../utils/sortUserPointsArrayObject");
const moment = require("moment");

async function updateELORatingsController(req, res) {
  const user = req.user;

  // Get the contest_id
  const contest_id = req.body.contest_id;
  try {
    // Get the current time in IST to query for past contests.
    const currTime = moment();

    // Get the contest
    const contest = await Contest.findOne(
      {
        contest_id: contest_id,
        is_draft: false,
        launched: true,
        creator: user.username,
        end_time: { $lt: currTime },
      },
      "ratings_updated result start_time"
    ).exec();

    if (contest) {
      if (contest.ratings_updated == true) {
        res.status(402).json({ error: "Ratings already updated" });
      } else {
        /*
            There are three steps involved,
            1. Get the details of every user who participated
            3. Sort them in dexcending order of points
            3. Calculate the new elo
            4. Update the elo
        */

        // ----- Step 1 ----- //
        // Fetch all the users who participated in that contest.
        const users = contest.result;

        //----- Step 2 ----- //
        // Sort the users in descending order of points.
        await sortObjectsByPointsDescending(users);

        // ----- Step 3.1 ----- //
        // Prepare the data for calculating ELO

        /* This format will be followed for calculation of elo
            const rankings = [
                  { name: "Alice", rating: 1000, standing: 1 },
                  { name: "Bob", rating: 1000, standing: 2 },
                  { name: "Charlie", rating: 1000, standing: 3 },
                  { name: "Dave", rating: 1000, standing: 4 }
            ];
        */

        // The array that will store the rankings in the above specified format
        let rankings = [];

        // Loop over the participants in users array created in step 1.
        // Append them to the ranking array in the specified format.
        for await (let element of users) {
          const uuser = await User.findOne(
            { username: element.username },
            "current_rating"
          ).exec();
          let newUser = {
            username: element.username,
            rating: uuser.current_rating,
            standing: rankings.length + 1,
          };
          rankings.push(newUser);
        }

        // ----- Step 3.2 ----- //
        let updatedRating = await calculateElo(rankings);

        /* this is also an array of objects
            [
                  { username: 'Alice', rating: 1030 },
                  { username: 'Bob', rating: 1398 },
                  { username: 'Charlie', rating: 1705 },
                  { username: 'Dave', rating: 737 }
            ]
        */

        // ----- Step 4 ----- //
        // loop over the updatedRating array and update the users.
        for await (let element of updatedRating) {
          try {
            const user = await User.findOne({
              username: element.username,
            }).exec();
            const newMaxRating = Math.max(user.max_rating, element.rating);
            user.rating_array.push({
              time_stamp: contest.start_time,
              contest_id: contest_id,
              rating: element.rating,
            });
            user.max_rating = newMaxRating;
            user.current_rating = element.rating;

            user.save();
          } catch {
            res.status(400).json({ error: "Error updating ratings" });
          }
        }

        // Set ratings_updated of contest to true
        contest.ratings_updated = true;
        await contest.save();

        //   Send a success message
        res.status(200).json({ message: "Ratings updated successfully" });
      }
    } else {
      res.status(404).send("Contest not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = updateELORatingsController;
