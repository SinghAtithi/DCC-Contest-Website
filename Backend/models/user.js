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
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  githubURL: {
    type: String,
    unique: true,
  },
  linkedinURL: {
    type: String,
    unique: true,
  },
  codeforcesURL: {
    type: String,
    unique: true,
  },
  codechefURL: {
    type: String,
    unique: true,
  },
  bio: {
    type: String,
    unique: true,
  },
  // Array of ques_no
  questions_solved: {
    type: Array,
  },
});

const User = new mongoose.model("user", UserSchema);
module.exports = User;
