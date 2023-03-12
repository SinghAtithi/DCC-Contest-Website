const express = require("express");
const moment = require("moment");
const { ExecuteQueue } = require("../queue/ExecuteQueue/index.js");
const Submission = require("../models/submission.js");
const Contest = require("../models/contest.js");
const { verifyGeneralUser } = require("../middlewares/verifyToken.js");
const User = require("../models/user.js");

const router = express.Router();

router.post("/submit", verifyGeneralUser, async (req, res) => {
  try {
    // Get user_id from token
    const user_id = req.user.userId;
    const user = await User.findOne(
      { _id: user_id },
      "username total_contests"
    ).exec();
    if (user) {
      // Get the code and the question no
      const { lang = "cpp", code, ques_id, contest_id } = req.body;

      // If no code is sent
      if (code === undefined) {
        res.status(400).json({
          error_code: "ECCBE",
          error: "Empty code cannot be executed.",
        });
      } else {
        const currDate = moment(new Date())
          .format("DD/MM/YYYY HH:mm")
          .toString();

        if (contest_id) {
          const contest = await Contest.findOne(
            { contest_id: contest_id },
            "ques_ids"
          ).exec();
          var flag = false;
          for (var i = 0; i < contest.ques_ids.length; i++) {
            if (contest.ques_ids[i].ques_id === ques_id) {
              flag = true;
              break;
            }
          }

          if (!flag) {
            res.status(404).json({
              error_code: "QNFIC",
              error: "Question not found in this contest.",
            });
          } else {
            // Save the code in the database
            const submission = await new Submission({
              ques_id: ques_id,
              username: user.username,
              language: lang,
              code: code,
              time_stamp: currDate,
            }).save();

            // Update the status of contest as attempted in users model
            const total_contests = user.total_contests;
            for (var i = 0; i < total_contests.length; i++) {
              if (total_contests.contest_id === contest_id) {
                total_contests.status = "attempted";
                break;
              }
            }
            const updatedUser = await findOneAndUpdate(
              { _id: user_id },
              { total_contests: total_contests },
              { new: true }
            ).exec();
            console.log(updatedUser);

            // Add this to the queue
            ExecuteQueue.add({ submission_id: submission._id })
              .then(() => {
                console.log("Successfully added to the queue");
                res
                  .status(200)
                  .send({ message: "Successfully added to the queue" });
              })
              .catch((err) => {
                console.log("From first catch ", err);
                res.status(400).json({
                  error_code: "SWR",
                  error: "Something went wrong. Please try again.",
                });
              });
          }
        } else {
          // Save the code in the database
          const submission = await new Submission({
            ques_id: ques_id,
            username: user.username,
            language: lang,
            code: code,
            time_stamp: currDate,
          }).save();

          // Add this to the queue
          ExecuteQueue.add({ submission_id: submission._id })
            .then(() => {
              console.log("Successfully added to the queue");
              res
                .status(200)
                .send({ message: "Successfully added to the queue" });
            })
            .catch((err) => {
              console.log("From first catch ", err);
              res.status(400).json({
                error_code: "SWR",
                error: "Something went wrong. Please try again.",
              });
            });
        }
      }
    } else {
      res.status(404).json({ error_code: "UNF", error: "User not found." });
    }
  } catch (error) {
    console.log("From last catch ", error);
    res.status(400).json({
      error_code: "SWR",
      error: "Something went wrong. Please try again.",
    });
  }
});

module.exports = router;
