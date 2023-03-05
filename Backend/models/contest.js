const mongoose = require("mongoose")

const ContestSchema = mongoose.Schema({
    contest_name: {
        type: String,
        required: true
    },
    contest_id: {
        type: String,
        required: true
    },
    ques_ids: {
        type: Array
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    collaborators: {
        type: Array
    },
    is_draft: {
        type: Boolean,
        default: true
    },
    registrations: {
        type: Array
    },
    result: {
        type: Map,
        of: String
    }
});


const Contest = new mongoose.model("contest", ContestSchema);
module.exports = Contest;
