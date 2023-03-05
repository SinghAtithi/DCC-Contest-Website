const mongoose = require("mongoose");

const SubmissionSchema = mongoose.Schema({
      ques_id: {
            type: String,
            required: true
      },
      user_id: {
            type: String,
            required: true
      },
      language: {
            type: String,
            required: true
      },
      code: {
            type: Array,
            required: true
      },
      verdict: {
            type: Array,
            required: true
      },
      time_stamp: {
            type: Array,
            required: true
      },
      // memory: {
      //       type: Array,
      //       required: true
      // },
});

const Submission = new mongoose.model("submission", SubmissionSchema);
module.exports = Submission;

