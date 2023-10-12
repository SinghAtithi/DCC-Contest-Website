const express = require("express");
const moment = require("moment");
const { verifyAdmin, passby } = require("../middlewares/verifyToken");
const Question = require("../models/question");
const Question21=require("../models/question21");
const Submission = require("../models/submission");
const User = require("../models/user");
const { generateTestCaseFiles } = require("../utils/generateTestCaseFiles.js");
const getAllSubmissionsController = require("../controllers/question/getAllSubmissions");
const router = express.Router();

// Get the list of ques_no,name and topics
router.get("/", passby, async (req, res) => {
  // If the user is logged in, passby will detect it and add the user to req.user from where we can get the username
  const user = req.user;
  try {
    // user is present means user is logged in. So we have to check the status of questions.
    let currUser = null;
    if (user) {
      currUser = await User.findOne(
        { username: user.username },
        "questions_solved"
      ).exec();
    }

    const currDate = moment().toString();
    const allQues = await Question.find(
      { display_after: { $lte: currDate }, assigned: true },
      "ques_id name topics"
    )
      .sort({ display_after: -1 })
      .lean(); // lean() converts it to plain javascript object so thay direct manipu;ation can be done.

    if (currUser) {
      const updatedAllQues = allQues.map((question) =>
        Object.assign({}, question, {
          status: currUser.questions_solved.includes(question.ques_id)
            ? true
            : false,
        })
      );
      res.status(200).json(updatedAllQues);
    } else res.status(200).json(allQues);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.post("/search", verifyAdmin, async (req, res) => {
  const user = req.user;
  try {
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

    let allQues = await Question.find(search_params).exec();
    const allQues21=await Question21.find(search_params).exec();
    allQues=allQues.concat(allQues21);

    res.status(200).send({ data: allQues });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.get("/getQuesNo",verifyAdmin,async (req, res) => {
  let allQues = await Question.find({ assigned: false }, "ques_no");
  const allQues21=await Question21.find({ assigned: false }, "ques_no");
  allQues=allQues.concat(allQues21);
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

  try {
    var public_tc = public_test_cases;
    var private_tc = private_test_cases;

    var isCPZEN = false;
    var is21days = false;

    //if ques_id is CPZEN_xyz then it is a CPZEN question
    if (ques_id.includes("CPZEN")) {
      isCPZEN = true;
    }
    if (ques_id.includes("21days")) 
    {
      is21days = true;
    }

    console.log(isCPZEN);

    var display_after = moment()
      .add(isCPZEN ? 0 : 1000, "days")
      .format("DD/MM/YYYY HH:mm")
      .toString();
    const author = await User.findOne({ _id: user.userId }, "username").exec();
    // const author = { username: "coder_ravan"}

    if (is21days)
    {
        // const tempQuestionId=ques_id.replace("21days","CPZEN");
        const day=parseInt(ques_id.split("_")[1],10);
        const ques = await new Question21({
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
          assigned: isCPZEN ? true : false,
          is_draft: is_draft,
          day:day,
        }).save();
        console.log("21 days question \n",ques);
    }
    else
    {
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
        assigned: isCPZEN ? true : false,
        is_draft: is_draft,
      }).save();
      generateTestCaseFiles(public_tc, private_tc, ques._id);
      console.log("normal question \n",ques);
    }
    res.status(200).json({ message: "Question created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/update", verifyAdmin, async (req, res) => {
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

  try {
    var public_tc = public_test_cases;
    var private_tc = private_test_cases;

    const filter = { ques_id: ques_id, author: user.username };
    const update = {
      name: name,
      description: description,
      constraints: constraints,
      input_format: input_format,
      output_format: output_format,
      time_limit: time_limit,
      public_test_cases: public_test_cases,
      private_test_cases: private_test_cases,
      topics: topics,
      is_draft: is_draft,
    };

    if (ques_id.includes("21days"))
    {
        const ques=await Question21.findOneAndUpdate(filter, update);
    }
    else
    {
      const ques = await Question.findOneAndUpdate(filter, update);
      generateTestCaseFiles(public_tc, private_tc, ques._id);
    }
    res.status(200).json({ message: "Question created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get question by ques_id
//not yet modified for 21 days challenge 
router.get("/:ques_id", (req, res) => {
  const currDate = moment().toString();
  try {
    Question.findOne(
      {
        ques_id: req.params.ques_id,
        display_after: { $lte: currDate },
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

// Get question by ques_id for test by admin
router.get("/test/:ques_id", verifyAdmin, (req, res) => {
  try {
    Question.findOne(
      {
        ques_id: req.params.ques_id,
        is_draft: false,
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

router.delete("/delete/:ques_id", verifyAdmin, async (req, res) => {
  const ques_id = req.params.ques_id;
  const user = req.user;

  try {
    const filter = {
      ques_id: ques_id,
      author: user.username,
    };

    let deleted=null;
    if (ques_id.includes("21days"))
    {
        deleted=await Question21.findOneAndDelete(filter);
    }
    else
    {
        deleted = await Question.findOneAndDelete(filter);
    }
    if (!deleted)
      res.status(500).send({ error: "Could not find the question to delete." });
    else res.status(200).send({ message: "Deleted Successfully." });
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
    res.status(200).json({
      verdict: submission.verdict,
      error: submission.error,
      time_taken: submission.time_taken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.get("/getAllSubmissions/:username", passby, getAllSubmissionsController); // passby is a function which adds user in req when token is valid. Else does nothing

module.exports = router;
