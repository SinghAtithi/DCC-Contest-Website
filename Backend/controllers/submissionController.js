// submissionController.js

const moment = require("moment");
const { ExecuteQueue } = require("../queue/ExecuteQueue/index.js");
const Submission = require("../models/submission.js");
const User = require("../models/user.js");
const isContestRunning = require("../utils/isContestRunning.js");

const createSubmission = async (req, res) => {
      try {
            // send contest_id in the body
            const contest_id = req.body.contest_id;
            const contestRunning = await isContestRunning(contest_id);
            const userId = req.user.userId;
            const user = await User.findOne({ _id: userId }, "username").exec();
            if (!user) {
                  return res.status(404).json({
                        error_code: "UNF",
                        error: "User not found.",
                  });
            }
            else {
                  const { lang, code, ques_id } = req.body;
                  if (!code) {
                        return res.status(400).json({
                              error_code: "ECCBE",
                              error: "Empty code cannot be executed.",
                        });
                  }
                  else {
                        const formattedDate = moment(new Date()).utcOffset("+05:30").format("DD/MM/YYYY HH:mm").toString();
                        const submission = await createSubmissionInDb(user.username, lang, code, ques_id, formattedDate, contest_id);
                        addToQueue(submission._id, contestRunning, res);
                  }
            }
      } catch (error) {
            console.log("From last catch ", error);
            res.status(400).json({
                  error_code: "SWR",
                  error: "Something went wrong. Please try again.",
            });
      }
};

const createSubmissionInDb = async (username, language = "cpp", code, ques_id, timestamp, contest_id = "") => {
      return await new Submission({
            ques_id: ques_id,
            contest_id: contest_id,
            username: username,
            language: language,
            code: code,
            time_stamp: timestamp,
      }).save();
};

const addToQueue = (submissionId, contestRunning, res) => {
      ExecuteQueue.add({ submission_id: submissionId, contestRunning: contestRunning })
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

module.exports = createSubmission;
