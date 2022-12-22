const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
      username: {
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
      avatar: {
            type: String,
      },
      bio: {
            type: String,
      },
      social: {
            type: [String],
      },
      problemsSolved: {
            type: [String],
      },
      numProblemsSolved: {
            type: Number,
            default: () => this.problemsSolved.length,
      },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
