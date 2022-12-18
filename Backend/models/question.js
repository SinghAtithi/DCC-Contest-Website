const mongoose = require("mongoose");

const QuesSchema = mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    constraints : {
        type : String,
        required : true
    },
    input_format : {
        type : String,
        required : true
    },
    output_format : {
        type : String,
        required : true
    },
    time_limit : {
        type : Number,
        required : true
    },
    public_test_cases : {
        type : String,
        required : true
    },
    private_test_cases : {
        type : String,
        required : true
    },
    no_of_public_test_cases : {
        type : Number,
        required : true
    },
    no_of_private_test_cases : {
        type : Number,
        required : true
    }
});

const Question = new mongoose.model('question',QuesSchema);
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