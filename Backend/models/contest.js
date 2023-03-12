const mongoose = require("mongoose")

const ContestSchema = mongoose.Schema({
    contest_name: {
        type: String,
        required: true,
        unique: true
    },
    contest_id: {
        type: String,
        required: true,
        unique: true
    },
    // [{ques_id = ques_id, points = points}]
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

    // [user_id]
    registrations: {
        type: Array
    },
    result: {
        type: Array,
        // {username:coder_ravan, points:754}
    },
    ratings_updated: {
        type: Boolean,
        default: false
    },
});


const Contest = new mongoose.model("contest", ContestSchema);
module.exports = Contest;
