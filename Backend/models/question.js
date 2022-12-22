// This is a mongoose model for the Questions collection in the database.
// It defines the schema for this collection.

const mongoose = require("mongoose");

const QuesSchema = mongoose.Schema({
  ques_no: {
    type: String,
    required: true,
    unique: true

  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  constraints: {
    type: String,
    required: true,
  },
  input_format: {
    type: String,
    required: true,
  },
  output_format: {
    type: String,
    required: true,
  },
  time_limit: {
    type: Number,
    required: true,
  },
  public_test_cases: {
    type: String,
    required: true,
  },
  private_test_cases: {
    type: String,
    required: true,
  },
  no_of_public_test_cases: {
    type: Number,
    required: true,
  },
  no_of_private_test_cases: {
    type: Number,
    required: true,
  },
  // topics is a comma separated string
  topics: {
    type: String,
    required: false,
  },
});

const Question = new mongoose.model("question", QuesSchema);
module.exports = Question;

// ---------- Format of public and private test cases in database ---------
// [{
//     input : {
//         type : String,
//         required : true
//     },
//     output : {
//         type : String,
//         required : true
//     }
// }]
