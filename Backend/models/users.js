// This is a mongoose model for the users collection in the database.
// It defines the schema for this collection.

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      user_name: {
            type: String,
            required: true,
            unique: true,
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
      questions_solved: {
            type: Array,
      },
});

const User = new mongoose.model("user", UserSchema);
module.exports = User;