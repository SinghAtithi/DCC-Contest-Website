const mongoose = require("mongoose");

const pointSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  heatMap: {
    type: String,
    default: "0".repeat(22), // Sets a default value of a 22-character string of zeros
  },
  codeforcesURL: {
    type: String,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  thisDaySubmitTimeStamp: {
    type: Date
  }
});

const PointModel = mongoose.model("Point", pointSchema);
module.exports = PointModel;
