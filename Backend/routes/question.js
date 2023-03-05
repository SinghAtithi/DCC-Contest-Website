const express = require("express");
const moment = require("moment");
const Question = require("../models/question");
const { generateTestCaseFiles } = require("../utils/generateTestCaseFiles.js");
const router = express.Router();

// Get the list of ques_no,name and topics page by page as specified by query parameter
router.get("/", async (req, res) => {
  // const ques = await Question.find({});
  // // console.log(ques);
  // for(var i=0;i<ques.length;i++){
  //   var ques1 = await Question.findOneAndUpdate({ques_no:ques[i].ques_no},{assigned : false});
  //   // console.log(ques1);
  // }
  console.log("at route question /")
  const currDate = moment(new Date()).format("DD/MM/YYYY HH:mm").toString();
  const allQues = await Question.find(
    {assigned:true},
    // { displayAfter: { $lt: currDate }, assigned: true },
    "ques_no name topics"
  );
  res.status(200).json(allQues);
});

router.get("/getQuesNo", async (req, res) => {
  const allQues = await Question.find({ assigned: false }, "ques_no");
  res.status(200).json(allQues);
});

router.post("/createQuestion/create", async (req, res) => {
  const {
    name,
    description,
    constraints,
    input_format,
    output_format,
    time_limit,
    public_test_cases,
    private_test_cases,
    topics,
    problemID,
  } = req.body;
  try {
    var public_tc = public_test_cases;
    var private_tc = private_test_cases;
    var ques_no = problemID;

    var no_of_public_test_cases = public_tc.length;
    var no_of_private_test_cases = private_tc.length;

    var displayAfter = moment(new Date())
      .add(10, "days")
      .format("DD/MM/YYYY HH:mm")
      .toString();
    const ques = await new Question({
      name,
      description,
      constraints,
      input_format,
      output_format,
      time_limit,
      public_test_cases,
      private_test_cases,
      no_of_public_test_cases,
      no_of_private_test_cases,
      topics,
      ques_no,
      displayAfter,
    }).save();

    generateTestCaseFiles(public_tc, private_tc, ques._id);
    res.status(200).json("Question created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get question by ques_no
router.get("/:ques_no", (req, res) => {
  const currDate = moment(new Date()).format("DD/MM/YYYY HH:mm").toString();
  try {
    Question.findOne(
      {
        ques_no: req.params.ques_no,
        displayAfter: { $lt: currDate },
        assigned: true,
      },

      "ques_no name description constraints input_format output_format time_limit public_test_cases",
      (error, result) => {
        if (error) {
          res.status(404).json({ error: error });
        } else {
          if (result === null || result === undefined) {
            res.status(404).send({ error: "Not Found" });
          } else {
            console.log(result);
            res.status(200).json(result);
          }
        }
      }
    );
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

module.exports = router;
