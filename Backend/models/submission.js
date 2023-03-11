const mongoose = require("mongoose");

const SubmissionSchema = mongoose.Schema({
  ques_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  verdict: {
    type: String,
    default : "Queued"
  },
  error: {
    type: String,
    default: "",
  },
  time_taken: {
    type: String,
    default: "",
  },

  time_stamp: {
    type: String,
    required: true,
  },
  // memory: {
  //       type: Array,
  //       required: true
  // },
});

const Submission = new mongoose.model("submission", SubmissionSchema);
module.exports = Submission;
