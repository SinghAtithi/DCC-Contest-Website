const express = require("express");
const moment = require("moment");
const { ExecuteQueue } = require("../queue/ExecuteQueue/index.js");
const Submission = require("../models/submission.js");
const { verifyGeneralUser } = require("../middlewares/verifyToken.js");
const User = require("../models/user.js");

const router = express.Router();



router.post("/submit", verifyGeneralUser, async (req, res) => {
  try {
    // Get user_id from token
    const user_id = req.user.userId;
    console.log(user_id);
    const user = await User.findOne({ _id: user_id }, "username").exec();
    if (user) {
      // Get the code and the question no
      const { lang = "cpp", code, ques_id } = req.body;

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
              .send({
                message: "Successfully added to the queue",
                submission_id: submission._id,
              });
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
