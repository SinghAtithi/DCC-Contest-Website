const express = require("express");
const Question = require("../models/question");
const { generateTestCaseFiles } = require("../utils/generateTestCaseFiles.js");
const router = express.Router();

// Get the list of ques_no,name and topics of all questions
router.get("/", (req, res) => {
    Question.find({}, 'ques_no name topics', (err, result) => {
        if (err) {
            res.status(404).send({ error: err });
        }
        else {
            // console.log(eval(result[0]["public_test_cases"])); // TO convert string in JSON
            if (result === null || result === undefined) {
                res.status(404).send({ error: "Not Found" });
            }
            res.status(200).json(result);
        }
    })
});

router.post("/createQuestion/create", async (req, res) => {
    console.log("Came to Question create");
    const { description, constraints, input_format, output_format, time_limit, public_test_cases, private_test_cases } = req.body;
    try {
        var public_tc = JSON.parse(public_test_cases);
        var private_tc = JSON.parse(private_test_cases);

        var no_of_public_test_cases = public_tc.length;
        var no_of_private_test_cases = private_tc.length;
        const ques = await new Question({ description, constraints, input_format, output_format, time_limit, public_test_cases, private_test_cases, no_of_public_test_cases, no_of_private_test_cases }).save();


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
        Question.findOne({ ques_no: req.params.ques_no }, (error, result) => {
            if (error) {
                res.status(404).json({ error: error });
            }
            else {
                if (result === null || result === undefined) {
                    res.status(404).send({ error: "Not Found" });
                }
                else res.status(200).json(result);
            }
        })
    }
    catch (error) {
        res.status(500).send({ error: error });
    }
});


module.exports = router;