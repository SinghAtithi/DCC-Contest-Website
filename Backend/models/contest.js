const mongoose = require("mongoose")

const ContestSchema = mongoose.Schema({
    contest_name: {
        type: String,
        required : true,
        unique: true
    },
    contest_id: { 
        type: String,
        required: true,
        unique: true
    },
    ques_ids : {
        type: Array
    },
    start_time : {
        type: String,
        required: true
    },
    end_time : {
        type: String,
        required: true
    },
    // user_name
    creator : {
        type : String,
        required: true
    },
    // user_names
    collaborators : {
        type : Array
    },

});


const Contest = new mongoose.model("contest", ContestSchema);
module.exports = Contest;
