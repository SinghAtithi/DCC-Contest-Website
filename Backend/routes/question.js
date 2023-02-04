const express = require("express");
const Question = require("../models/question");
const { generateTestCaseFiles } = require("../utils/generateTestCaseFiles.js");
const router = express.Router();
// Get the list of ques_no,name and topics page by page as specified by query parameter
router.get("/", (req, res) => {
    const options = {
        select : 'ques_no name topics',
        page : (req.query.page)?req.query.page:1,
        limit : 8,
        collation : {
            locale : 'en',
        },
    }

    Question.paginate({},options,(err,result)=>{
        if(err) res.status(404).send({ error: err });
        else {
            if(result.docs.length==0) res.status(404).send({ error: "Not Found" });
            else res.status(200).json(result.docs);
        }      
    })
});

router.post("/createQuestion/create", async (req, res) => {
    console.log(req.body); 

    const {name, description, constraints, input_format, output_format, time_limit, public_test_cases, private_test_cases, topics, problemID } = req.body;
    try {
        var public_tc = public_test_cases;
        var private_tc = private_test_cases;
        var ques_no = problemID;

        var no_of_public_test_cases = public_tc.length;
        var no_of_private_test_cases = private_tc.length;
        const ques = await new Question({ name, description, constraints, input_format, output_format, time_limit, public_test_cases, private_test_cases, no_of_public_test_cases, no_of_private_test_cases, topics,ques_no }).save();


        generateTestCaseFiles(public_tc, private_tc, ques._id);
        res.status(200).json("Question created successfully"); 
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Get question by ques_no
router.get("/:ques_no", (req, res) => {
    try {
        Question.findOne({ ques_no: req.params.ques_no }, 'ques_no name description constraints input_format output_format time_limit public_test_cases',(error, result) => {
            if (error) {
                res.status(404).json({ error: error });
            }
            else {
                if (result === null || result === undefined) {
                    res.status(404).send({ error: "Not Found" });
                }
                else{
                    console.log(result);
                    res.status(200).json(result);

                }
            }
        })
    }
    catch (error) {
        res.status(500).send({ error: error });
    }
});


module.exports = router;