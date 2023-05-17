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
  // Array of ques_no
  questions_solved: {
    type: Array,
  },
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

  // [{contest_id : contest_id, status : attempted/unattempted}]
  total_contests: {
    type: Array,
    default: [],
  },
  confirmed_email: {
    type: Boolean,
    default: false,
  },
});

const User = new mongoose.model("user", UserSchema);
module.exports = User;
