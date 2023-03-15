const express = require("express");
const moment = require("moment");
const { verifyAdmin } = require("../middlewares/verifyToken");
const Question = require("../models/question");
const Submission = require("../models/submission");
const User = require("../models/user");
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
  console.log("at route question /");
  const currDate = moment(new Date()).format("DD/MM/YYYY HH:mm").toString();
  const allQues = await Question.find(
    { assigned: true },
    // { displayAfter: { $lt: currDate }, assigned: true },
    "ques_no name topics"
  );
  res.status(200).json(allQues);
});

router.post("/search", verifyAdmin, async (req, res) => {
  const user = req.user;
  const author = await User.findOne({ _id: user.userId }, "username").exec();
  const { searchFilter, searchString } = req.body;

  let search_params = { author: author.username };
  if (searchFilter == 0)
    search_params.ques_id = { $regex: searchString, $options: "i" };
  else if (searchFilter == 1)
    search_params.contest_id = { $regex: searchString, $options: "i" };
  else if (searchFilter == 2)
    search_params.name = { $regex: searchString, $options: "i" };
  else if (searchFilter == 3) search_params.display_after = searchString;
  else if (searchFilter == 4)
    search_params.assigned =
      String(searchString).toLowerCase() === "true" ? true : false;
  if (searchFilter == 5)
    search_params.is_draft =
      String(searchString).toLowerCase() === "true" ? true : false;

  console.log(search_params);

  const allQues = await Question.find(search_params).exec();
  console.log(allQues);
  res.status(200).send({ data: allQues });
});

router.get("/getQuesNo", async (req, res) => {
  const allQues = await Question.find({ assigned: false }, "ques_no");
  res.status(200).json(allQues);
});

router.post("/create", verifyAdmin, async (req, res) => {
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
    ques_id,
    is_draft,
  } = req.body;
  const user = req.user;
  console.log(user);
  try {
    var public_tc = public_test_cases;
    var private_tc = private_test_cases;

    var display_after = moment(new Date())
      .add(1000, "days")
      .format("DD/MM/YYYY HH:mm")
      .toString();
    const author = await User.findOne({ _id: user.userId }, "username").exec();

    const ques = await new Question({
      name: name,
      description: description,
      constraints: constraints,
      input_format: input_format,
      output_format: output_format,
      time_limit: time_limit,
      public_test_cases: public_test_cases,
      private_test_cases: private_test_cases,
      topics: topics,
      ques_id: ques_id,
      display_after: display_after,
      author: author.username,
      is_draft: is_draft,
    }).save();

    generateTestCaseFiles(public_tc, private_tc, ques._id);
    res.status(200).json({ message: "Question created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get question by ques_id
router.get("/:ques_id", (req, res) => {
  const currDate = moment(new Date()).format("DD/MM/YYYY HH:mm").toString();
  try {
    Question.findOne(
      {
        ques_id: req.params.ques_id,
        display_after: { $lt: currDate },
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

router.get("/getSubmission/:id", async (req, res) => {
  try {
    const submission = await Submission.findOne(
      { _id: req.params.id },
      "verdict error time_taken"
    ).exec();
    res
      .status(200)
      .json({
        verdict: submission.verdict,
        error: submission.error,
        time_taken: submission.time_taken,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
