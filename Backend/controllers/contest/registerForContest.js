const Contest = require("../../models/contest");

async function registerForContestController(req, res){
    const { contest_id, type } = req.body;
    const username = req.user.username;
    try {
      // Find the contest by contestId
      const contest = await Contest.findOne({ contest_id: contest_id });
  
      // console.log(contest);
  
      // Check if the contest exists
      if (contest) {
        if (type === "register") {
          // Check if the username already exists in the registration array
          const isUsernameRegistered = contest.registrations.some(
            (registration) => registration === username
          );
          if (!isUsernameRegistered) {
            // Add the username to the registration array
            contest.registrations.push(username);
  
            // Save the updated contest
            await contest.save();
  
            res.status(200).json({ message: "Username registered successfully" });
          } else {
            res.status(400).send([
              {
                error_field: "username",
                error_message: "username is already registered with this contest",
              },
            ]);
          }
        } else {
          // Check if the username exists in the registration array
          const registrationIndex = contest.registrations.findIndex(
            (registration) => registration === username
          );
          if (registrationIndex !== -1) {
            // Remove the username from the registration array
            contest.registrations.splice(registrationIndex, 1);
  
            // Save the updated contest
            await contest.save();
            res
              .status(200)
              .json({ message: "Username unregistered successfully" });
          } else {
            res.status(400).send([
              {
                error_field: "username",
                error_message: "username is not registered with this contest",
              },
            ]);
          }
        }
      } else {
        res.status(400).send([
          {
            error_field: "contest_id",
            error_message: `Contest with contest id "${contest_id}" not found.`,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send([
        {
          error_field: "server",
          error_message: "Internal Server Error",
        },
      ]);
    }
  }


  module.exports = registerForContestController;