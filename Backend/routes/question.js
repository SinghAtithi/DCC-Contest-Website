const express = require("express");
const Question = require("../models/question");
const { generateTestCaseFiles } = require("../utils/generateTestCaseFiles.js");

const router = express.Router();


router.post("/create", async (req, res) => {
    const {description, constraints,input_format,output_format,time_limit,public_test_cases,private_test_cases} = req.body;
    try{
        var public_tc = JSON.parse(public_test_cases);
        var private_tc = JSON.parse(private_test_cases);

        var no_of_public_test_cases = public_tc.length;
        var no_of_private_test_cases = private_tc.length;
        const ques = await new Question({description, constraints,input_format,output_format,time_limit,public_test_cases,private_test_cases,no_of_public_test_cases,no_of_private_test_cases}).save();
        

        generateTestCaseFiles(public_tc,private_tc,ques._id);
        res.send(ques);
    }
    catch(error){
        res.status(500).json(error);
    }
    
});

module.exports = router;