// This is a mongoose model for the users collection in the database.
// It defines the schema for this collection.

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  githubURL: {
    type: String,
  },
  linkedinURL: {
    type: String,
  },
  codeforcesURL: {
    type: String,
  },
  codechefURL: {
    type: String,
  },
  bio: {
    type: String,
    default: "Jai Mahakal",
  },
  role: {
    type: String,
    default: "end_user",
  },
  // Array of ques_ids
  questions_solved: [
    {
      type: String,
    },
  ],
  profile_pic: {
    type: String,
  },

  // [{time_stamp = "12/12/2001 10:42", contest_id = contest_id, rating = rating}]
  rating_array: {
    type: Array,
    deafult: [],
  },

  current_rating: {
    type: Number,
    default: 0,
  },

  max_rating: {
    type: Number,
    default: 0,
  },
  total_contests: [
    {
      contest_id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
        default: "unattempted",
      },
    },
  ],
  confirmed_email: {
    type: Boolean,
    default: false,
  },
  OTP: {
    type: Number,
  },
  OTP_validity: {
    type: Date,
  },
});

// The custom function update solved array
UserSchema.statics.updateSolved = function (ques_id, username) {
  return new Promise(async (resolve, reject) => {
    try {
      // Find the user by username
      const user = await this.findOne({ username: username });

      if (!user) {
        reject(`User with username '${username}' not found.`);
      }

      // Find the index of ques_id in solved array
      const quesIndex = user.questions_solved.findIndex(
        (ques) => ques === ques_id
      );

      if (quesIndex === -1) {
        // Add the new ques_id
        user.questions_solved.push(ques_id);
      }
      // Save the updated user
      await user.save();

      resolve(user); // Resolve the promise with the updated contest object
    } catch (error) {
      reject(error); // Reject the promise with the error
    }
  });
};

// The custom function to register a user for a contest
UserSchema.statics.registerForContest = function (contest_id, username) {
  return new Promise(async (resolve, reject) => {
    try {
      /// Find the user by username
      const user = await this.findOne({ username: username });

      if (!user) {
        reject(`User with username '${username}' not found.`);
      }

      // Find the index of contest_id in total contest array
      const contestIndex = user.total_contests.findIndex(
        (contest) => contest.contest_id === contest_id
      );

      if (contestIndex === -1) {
        // Add the new contest
        user.total_contests.push({
          contest_id: contest_id,
          status: "unattempted",
        });
      }
      // Save the updated user
      await user.save();

      resolve(user); // Resolve the promise with the updated contest object
    } catch (error) {
      reject(error); // Reject the promise with the error
    }
  });
};

// The custom function to unregister a user from a contest
UserSchema.statics.unRegisterForContest = function (contest_id, username) {
  return new Promise(async (resolve, reject) => {
    try {
      // Find the user by username
      const user = await this.findOne({ username: username });

      if (!user) {
        reject(`User with username '${username}' not found.`);
      }

      // Find the index of contest_id in total contest array
      const contestIndex = user.total_contests.findIndex(
        (contest) => contest.contest_id === contest_id
      );

      if (contestIndex !== -1) {
        // Remove the contest
        user.total_contests.splice(contestIndex, 1);
      }
      // Save the updated user
      await user.save();

      resolve(user); // Resolve the promise with the updated contest object
    } catch (error) {
      reject(error); // Reject the promise with the error
    }
  });
};

// The custom function to update status of contest
UserSchema.statics.updateContestStatus = function (contest_id, username) {
  return new Promise(async (resolve, reject) => {
    try {
      // Find the user by username
      const user = await this.findOne({ username: username });

      if (!user) {
        reject(`User with username '${username}' not found.`);
      }

      // Find the index of contest_id in total contest array
      const contestIndex = user.total_contests.findIndex(
        (contest) => contest.contest_id === contest_id
      );

      if (
        contestIndex !== -1 &&
        user.total_contests[contestIndex].status !== "attempted"
      ) {
        // Change the status
        user.total_contests[contestIndex].status = "attempted";

        // Save the updated user
        await user.save();
      }

      resolve(user); // Resolve the promise with the updated contest object
    } catch (error) {
      reject(error); // Reject the promise with the error
    }
  });
};

const User = new mongoose.model("user", UserSchema);
module.exports = User;
