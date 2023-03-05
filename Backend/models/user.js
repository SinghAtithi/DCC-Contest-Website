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
  // Array of ques_no
  questions_solved: {
    type: Array,
  },
  role: {
    type: String,
    default: "endUser",
  },
  profile_pic: {
    type: String,
  },
  current_rating: {
    type: Number,
    default: 0,
  },
  max_rating: {
    type: Number,
    default: 0,
  },
  total_contests: {
    type: Array,
    default: 0,
  }
});


UserSchema.plugin(require('mongoose-beautiful-unique-validation'));

const User = new mongoose.model("user", UserSchema);
module.exports = User;
