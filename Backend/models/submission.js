const mongoose = require("mongoose");

const SubmissionSchema = mongoose.Schema({
      ques_id: {
            type: String,
            required: true
      },
      username: {
            type: String,
            required: true
      },
      language: {
            type: String,
            required: true
      },
      code: {
            type: String,
            required: true
      },
      verdict: {
            type: String,
            required: true
      },
      time_stamp: {
            type: String,
            required: true
      },
      // memory: {
      //       type: Array,
      //       required: true
      // },
});

const Submission = new mongoose.model("submission", SubmissionSchema);
module.exports = Submission;

