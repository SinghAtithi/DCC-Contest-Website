// submissionController.js

const moment = require("moment");
const { ExecuteQueue } = require("../../queue/ExecuteQueue/index.js");
const Submission = require("../../models/submission.js");
const User = require("../../models/user.js");

const createTestSubmission = async (req, res) => {
  try {
    const { userId, username } = req.user;
    const user = await User.findOne({ _id: userId }, "username").exec();
    if (!user) {
      return res.status(404).json({
        error_code: "UNF",
        error: "User not found.",
      });
    } else {
      const { lang, code, ques_id, ques_name } = req.body;
      if (!code) {
        return res.status(400).json({
          error_code: "ECCBE",
          error: "Empty code cannot be executed.",
        });
      } else {
        const formattedDate = moment().format("DD/MM/YYYY HH:mm").toString();

        let display_after = moment()
          .add(1000, "days")
          .format("DD/MM/YYYY HH:mm")
          .toString();
        const submission = await createSubmissionInDb(
          user.username,
          ques_name,
          lang,
          code,
          ques_id,
          formattedDate,
          display_after
        );

        addToQueue(submission._id, false, user.username, "", true, res);
      }
    }
  } catch (error) {
    console.log("From last catch ", error);
    res.status(500).send("Internal Server Error");
  }
};

const createSubmissionInDb = async (
  username,
  ques_name,
  language = "cpp",
  code,
  ques_id,
  timestamp,
  display_after,
  contest_id = ""
) => {
  return await new Submission({
    ques_id: ques_id,
    ques_name: ques_name,
    contest_id: contest_id,
    username: username,
    language: language,
    code: code,
    time_stamp: timestamp,
    display_after: display_after,
  }).save();
};

const addToQueue = (
  submissionId,
  contestRunning,
  username,
  contest_id = "",
  testing,
  res
) => {
  ExecuteQueue.add({
    submission_id: submissionId,
    contestRunning: contestRunning,
    username: username,
    contest_id: contest_id,
    testing: testing,
  })
    .then(() => {
      console.log("Successfully added to the queue");
      res.status(200).send({
        message: "Successfully added to the queue",
        submission_id: submissionId,
      });
    })
    .catch((err) => {
      console.log("From first catch ", err);
      res.status(400).json({
        error_code: "SWR",
        error: "Something went wrong. Please try again.",
      });
    });
};

module.exports = createTestSubmission;
