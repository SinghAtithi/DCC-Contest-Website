// This is a mongoose model for the Questions collection in the database.
// It defines the schema for this collection.

const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const QuesSchema = mongoose.Schema({
  ques_id: {
    type: String,
    required: true,
    unique: true
  },
  contest_id: {
    type: String,
    required: false,
    default:""
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
    type: Array,
    required: true,
  },
  private_test_cases: {
    type: Array,
    required: true,
  },
  // topics is a comma separated string
  topics: {
    type: String,
    required: false,
  },
  display_after: {
    type: String,
    required: true
  },
  assigned: {
    type: Boolean,
    default: false
  },
  is_draft: {
    type: Boolean,
    default: true,
  },
  author: {
    type: String,
    required: true,
  }
});

QuesSchema.plugin(paginate);

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
