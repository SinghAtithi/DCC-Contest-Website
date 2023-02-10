const mongoose = require("mongoose")

const ContestSchema = mongoose.Schema({
    contestName: {
        type: String,
        required : true
    },
    contestId: { 
        type: String,
        required: true
    },
    ques_id : {
        type: Array
    },
    startTime : {
        type: String,
        required: true
    },
    endTime : {
        type: String,
        required: true
    },
    

});


const Contest = new mongoose.model("contest", ContestSchema);
module.exports = Contest;
