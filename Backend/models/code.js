// This is a mongoose model for the Codes collection in the database.
// It defines the schema for this collection.

const mongoose = require("mongoose");

const CodeSchema = mongoose.Schema({
    codes: {
        type: Array
    },
    ques_no: { 
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
});


const Code = new mongoose.model("code", CodeSchema);
module.exports = Code;
