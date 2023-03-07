// I have a contest ID, First fetch all the users who participated on that contest.
const express = require('express');
const Contest = require('../models/contest.js');
const User = require('../models/user.js');
const calculateElo = require('../utils/calculateElo.js');
const sortObjectsByPointsDescending = require("../utils/sortUserPointsArrayObject")
const router = express.Router();

router.post('/updateRating', (req, res) => {

      // Get the contest_id

      const contest_id = req.body.contest_id;
      console.log(contest_id);

      const latestContest = Contest.findOne({ contest_id: contest_id }, async (err, contest) => {
            if (err) {
                  res.status(400).json({ error: "Error fetching contest" });
            }
            if (contest.ratings_updated == true) {
                  res.status(400).json({ error: "Ratings already updated" });
            }
            else {
                  // Now we have the contest object
                  // Now we have to fetch all the users who participated in that contest.
                  const users = await contest.result;
                  // Now we have all the users as array of objects who participated in that contest.
                  // console.log(users);

                  await sortObjectsByPointsDescending(users);
                  // console.log(users);
                  /*
                  There are three steps involved,
                  1. Get the details of every user who participated
                  2. Calculate the new elo
                  3. Update the elo
                  */


                  /* This format will be followed for calculation of elo
                  const rankings = [
                        { name: "Alice", rating: 1000, standing: 1 },
                        { name: "Bob", rating: 1000, standing: 2 },
                        { name: "Charlie", rating: 1000, standing: 3 },
                        { name: "Dave", rating: 1000, standing: 4 }
                  ];
                  */

                  let rankings = [];

                  // users.forEach(async element => {
                  //       const uuser = await User.findOne({ username: element.username }, "current_rating").exec();
                  //       console.log(uuser)
                  //       let newUser = {
                  //             username: element.username,
                  //             rating: uuser.current_rating,
                  //             standing: rankings.length + 1
                  //       }
                  //       rankings.push(newUser);
                  // });

                  for await (let element of users) {
                        const uuser = await User.findOne({ username: element.username }, "current_rating").exec();
                        let newUser = {
                              username: element.username,
                              rating: uuser.current_rating,
                              standing: rankings.length + 1,
                        }
                        rankings.push(newUser);
                  }


                  console.log(rankings)

                  let updatedRating = await calculateElo(rankings);

                  console.log(updatedRating);
                  // this is also an array of objects
                  // [
                  //       { username: 'Alice', rating: 1030 },
                  //       { username: 'Bob', rating: 1398 },
                  //       { username: 'Charlie', rating: 1705 },
                  //       { username: 'Dave', rating: 737 }
                  // ]

                  for await (let element of updatedRating) {
                        try {
                              const ur = await User.findOneAndUpdate({ username: element.username }, { current_rating: element.rating }).exec();
                        }
                        catch {
                              res.status(400).json({ error: "Error updating ratings" });
                        }
                  }

                  res.status(200).json({ message: "Ratings updated successfully" });

            }
      });

});

module.exports = router;