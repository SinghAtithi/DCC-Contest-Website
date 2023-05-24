const mongoose = require("mongoose");
const moment = require("moment");

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
        console.log(date);
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

    launched: {
      type: Boolean,
      default: false,
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

    result: [
      {
        username: {
          type: String,
          validate: [
            {
              validator: async function (username) {
                const registrations = await mongoose
                  .model("contest")
                  .find({ registrations: { $in: [username] } });
                return registrations.length !== 0;
              },
              message: `User is not registered for the contest.`,
            },
          ],
        },
        points: {
          type: Number,
        },
        solved: [
          {
            type: String,
          },
        ],
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
ContestSchema.statics.updateResult = function (contestId, ques_id, username) {
  return new Promise(async (resolve, reject) => {
    try {
      // Find the contest by contest_id
      const contest = await this.findOne({ contest_id: contestId });

      if (!contest) {
        reject(`Contest with contest_id '${contestId}' not found.`);
      }

      // Find the index of ques_id in ques_ids araay
      const quesIndex = contest.ques_ids.findIndex(
        (ques) => ques.ques_id === ques_id
      );

      if (quesIndex !== -1) {
        const points = contest.ques_ids[quesIndex].points;

        // Find the index of the username in the result array
        const resultIndex = contest.result.findIndex(
          (result) => result.username === username
        );

        if (resultIndex === -1) {
          // Username not found, create a new result object
          const newResult = {
            username,
            points: points,
            solved: [ques_id],
          };

          // Add the new result to the result array
          contest.result.push(newResult);
        } else {
          // Update the points for the existing username if the point has not been added.
          if (!contest.result[resultIndex].solved.includes(ques_id)) {
            contest.result[resultIndex].points += points;
            contest.result[resultIndex].solved.push(ques_id);
          }
        }
        // Save the updated contest
        await contest.save();

        console.log(
          `Result updated for username '${username}' in contest '${contestId}'.`
        );

        resolve(contest); // Resolve the promise with the updated contest object
      } else {
        reject("Internal Server Error");
      }
    } catch (error) {
      console.error("Error updating result:", error.message);
      reject(error); // Reject the promise with the error
    }
  });
};

const Contest = new mongoose.model("contest", ContestSchema);
module.exports = Contest;
