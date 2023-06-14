const mongoose = require("mongoose");
const moment = require("moment");

const SubmissionSchema = mongoose.Schema(
  {
    // MongoDb ID
    ques_id: {
      type: String,
      required: true,
    },
    ques_name: {
      type: String,
      required: true,
    },
    contest_id: {
      type: String,
      default: "",
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
      default: "Queued",
    },
    error: {
      type: String,
      default: "",
    },
    // In milliseconds
    time_taken: {
      type: String,
      default: "",
    },

    time_stamp: {
      type: Date,
      required: true,
      set: function (value) {
        // Parse the date string using the specified format
        const parsedDate = moment(value, "DD/MM/YYYY HH:mm", true);

        // If the parsed date is valid, return it as a Date object
        if (parsedDate.isValid()) {
          return parsedDate.toDate();
        }
        // If the parsed date is invalid, return the original value
        else {
          throw new Error(
            "Submission validation failed: display_after: Invalid date format"
          );
        }
      },
      get: function (value) {
        // Format the Date object to the specified format
        const date = moment(value).format("DD/MM/YYYY HH:mm").toString();
        return date;
      },
    },
    display_after: {
      type: Date,
      required: true,
      set: function (value) {
        // Parse the date string using the specified format
        const parsedDate = moment(value, "DD/MM/YYYY HH:mm", true);

        // If the parsed date is valid, return it as a Date object
        if (parsedDate.isValid()) {
          return parsedDate.toDate();
        }
        // If the parsed date is invalid, return the original value
        else {
          throw new Error(
            "Submission validation failed: display_after: Invalid date format"
          );
        }
      },
      get: function (value) {
        // Format the Date object to the specified format
        const date = moment(value).format("DD/MM/YYYY HH:mm").toString();
        return date;
      },
    },
  },
  { toJSON: { getters: true } }
);

const Submission = new mongoose.model("submission", SubmissionSchema);
module.exports = Submission;
