const mongoose = require("mongoose");
const moment = require("moment");

<<<<<<< HEAD
const ContestSchema = mongoose.Schema(
  {
    contest_name: {
      type: String,
      required: [true, "Contest Name is required."],
      unique: [true, "Contest Name must be unique."],
    },
    contest_id: {
      type: String,
      required: [true, "Contest id is required."],
      unique: [true, "Contest id must be unique."],
    },
    // [{ques_id = ques_id, points = points}]
    ques_ids: [
      {
        ques_id: {
          type: String,
          required: [true, "Question id is required"],
          validate: {
            validator: async function (ques_id) {
              const question = await mongoose
                .model("question")
                .findOne({ ques_id: ques_id });
              return question !== null;
            },
            message: `Question ID is invalid.`,
          },
        },
        points: {
          type: Number,
          required: [true, "Each question must be assigned some points."],
        },
      },
    ],
    start_time: {
      type: Date,
      required: [true, "Start time is required."],
      set: function (value) {
        // Parse the date string using the specified format
        const parsedDate = moment(value, "DD/MM/YYYY HH:mm", true);

        // If the parsed date is valid, return it as a Date object
        if (parsedDate.isValid()) {
          return parsedDate.toDate();
        }
        // If the parsed date is invalid, return the original value
        else {
          const error = new mongoose.Error.ValidationError(this);
          error.errors.start_time = {
            message: "Invalid date format",
            value: value,
          };
          throw error;
        }
      },
      get: function (value) {
        // Format the Date object to the specified format
        const date = moment(value).format("DD/MM/YYYY HH:mm").toString();
        return date;
      },
    },
    end_time: {
      type: Date,
      required: [true, "End time is required."],
      set: function (value) {
        // Parse the date string using the specified format
        const parsedDate = moment(value, "DD/MM/YYYY HH:mm", true);

        // If the parsed date is valid, return it as a Date object
        if (parsedDate.isValid()) {
          return parsedDate.toDate();
        }
        // If the parsed date is invalid, return the original value
        else {
          const error = new mongoose.Error.ValidationError(this);
          error.errors.end_time = {
            message: "Invalid date format",
            value: value,
          };
          throw error;
        }
      },
      get: function (value) {
        // Format the Date object to the specified format
        const date = moment(value).format("DD/MM/YYYY HH:mm").toString();
        return date;
      },
    },
    creator: {
      type: String,
      required: [true, "Creator is required."],
      validate: {
        validator: async function (username) {
          const user = await mongoose
            .model("user")
            .findOne({ username: username });
          return user !== null;
        },
        message: `Username is invalid.`,
      },
    },
    collaborators: [
      {
        type: String,
        validate: {
          validator: async function (username) {
            const user = await mongoose.model("user").findOne({
              username: username,
              role: { $in: ["admin", "super_admin"] },
            });
            return user !== null;
          },
          message: "Invalid collaborator username provided",
        },
      },
    ],

    is_draft: {
      type: Boolean,
      default: true,
    },

    // [user_id]
    registrations: [
      {
        type: String,
        validate: {
          validator: async function (username) {
            const user = await mongoose.model("user").findOne({ username });
            return user !== null;
          },
          message: "Invalid username provided.",
        },
      },
    ],
=======
const ContestSchema = mongoose.Schema({
    contestName: {
        type: String,
        required: true,
        unique: true
    },
    contestId: {
        type: String,
        required: true,
        unique: true
    },
    // [{ques_id = ques_id, points = points}]
    quesIds: {
        type: Array
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    creator: {
        type: Array,
        required: true
    },
    collaborators: {
        type: Array
    },
    isDraft: {
        type: Boolean,
        default: true
    },

    // [user_id]
    registrations: {
        type: Array
    },
    result: {
        type: Array,
        // {username:coder_ravan, points:754}
    },
    ratingsUpdated: {
        type: Boolean,
        default: false
    },
});
>>>>>>> 9142398 (made some changes)

    result: [
      {
        username: {
          type: String,
          validate: [
            {
              validator: async function (username) {
                const user = await mongoose
                  .model("user")
                  .findOne({ username: username });
                return user !== null;
              },
              message: `username is invalid.`,
            },
          ],
        },
        points: {
          type: Number,
        },
      },
    ],

    ratings_updated: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { getters: true } }
);

// The custom function updateResult
ContestSchema.statics.updateResult = function (contestId, username, newPoints) {
  return new Promise(async (resolve, reject) => {
    try {
      // Find the contest by contest_id
      const contest = await this.findOne({ contest_id: contestId });

      if (!contest) {
        reject(`Contest with contest_id '${contestId}' not found.`);
      }

      // Find the index of the username in the result array
      const resultIndex = contest.result.findIndex(
        (result) => result.username === username
      );

      if (resultIndex === -1) {
        reject(`Username '${username}' not found in the result array.`);
      }

      // Update the points for the username
      contest.result[resultIndex].points += newPoints;

      // Save the updated contest
      await contest.save();

      console.log(
        `Result updated for username '${username}' in contest '${contestId}'.`
      );

      resolve(contest); // Resolve the promise with the updated contest object
    } catch (error) {
      console.error("Error updating result:", error.message);
      reject(error); // Reject the promise with the error
    }
  });
};

const Contest = new mongoose.model("contest", ContestSchema);
module.exports = Contest;
