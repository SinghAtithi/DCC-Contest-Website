const express = require("express");
const moment = require("moment");
const { ExecuteQueue } = require("../queue/ExecuteQueue/index.js");
const Submission = require("../models/submission.js");
const { verifyGeneralUser } = require("../middlewares/verifyToken.js");
const User = require("../models/user.js");

const router = express.Router();

<<<<<<< HEAD
router.post("/submit", async (req, res) => {
  // console.log("I entered");
  const { lang = "cpp", code = "", ques_no = '63a586b4ef49fd84fb5a1e94' } = req.body;
  const user_id = 1; // To be defined later
  console.log(code);
  var to_delete = [];
  var failedTestCase;

  // If no code is sent
  if (code.trim() === "") {
    res.status(400).json({ error: "Empty code cannot be executed." });
  }

  // Save the code to the database
  const response = await saveCodes(ques_no, user_id, code, lang);

  if (response.status_code == 200) {
    const attempt_no = response.details.codes.length;

    // Generate Code file for the code that is received.
    const { codeFilePath, inPath } = await generateCodeFile(
      lang,
      code,
      undefined,
      user_id,
      attempt_no
    ); // language, code, input(if any), user_id, attempt_no.

    to_delete.push(codeFilePath);
    // Try to execute the file created and deliver the verdict
    try {
      // For pre defined Private Test Cases
      const ques = await Question.findOne({ ques_no: ques_no }).exec();
      var error = false;

      var time_taken = 0;
      // Loop over the test cases, execute and give verdict
      for (var j = 0; j < 20; j++) {
        for (var i = 0; i < ques.no_of_private_test_cases; i++) {
          // Path of the pre defined input file for this test case
          const inPath = path.join(
            path.join(
              path.join(path.join(basePath(), "TestCases"), `${ques._id}`),
              "private"
            ),
            `${i}_in.txt`
          );
          var resp = await executeCpp(
            codeFilePath,
            user_id,
            inPath,
            ques.time_limit
          ); // path of code file, user_id, path of input file, time_limit

          ans = resp.stdout;
          console.log(j, i, resp.difference);
          console.log("print nai hua")
          // not printed
          time_taken = time_taken + resp.difference;
          // ans = ans.replace(/(\r)/gm, ""); // Windows by default adds \r before every \n. This was causing an issue with file comparison. So removed all \r from output.
          // Create a file for the result obtained by the code which was executed.
          const resultFilePath = await generateResultFile(
            codeFilePath,
            ans,
            user_id,
            i
          );

          to_delete.push(resultFilePath);

          // Path of the pre defined output file for this test case
          const outPath = path.join(
            path.join(
              path.join(path.join(basePath(), "TestCases"), `${ques._id}`),
              "private"
            ),
            `${i}_out.txt`
          );

          // Check for verdict
          if (!getVerdict(resultFilePath, outPath)) {
            error = true;
            failedTestCase = ques.private_test_cases[i];
            break;
          }
        }
      }

      // console.log("In try : ",to_delete);
      // deleteFile(to_delete);
      console.log("Loop ended");
      if (!error) {
        console.log("Sent 200");
        res.status(200).json({ message: `Verdict : Passed \nTotal Time Taken : ${time_taken} seconds` });
      } else {
        console.log("Sent 406")
        res.status(406).json({ error: `Verdict : Incorrect Output\n\nLast Failed Test Case :\ninput : ${failedTestCase.input}\noutput : ${failedTestCase.output}\nYour Output : ${ans}` });
      }
    } catch (error) {
      // deleteFile(to_delete);
      // console.log(error)
      console.log("inerror");
      let err;
      if (error.stderr) {
        const searchString = to_delete[0] + ":"
        err = error.stderr.split(searchString).join("");
=======


router.post("/submit", verifyGeneralUser, async (req, res) => {
  try {
    // Get user_id from token
    const user_id = req.user.userId;
    console.log(user_id);
    const user = await User.findOne({ _id: user_id }, "username").exec();
    if (user) {
      // Get the code and the question no
      const { lang = "cpp", code, ques_id } = req.body;

      // If no code is sent
      if (code === undefined) {
        res.status(400).json({
          error_code: "ECCBE",
          error: "Empty code cannot be executed.",
        });
      } else {
        const currDate = moment(new Date())
          .format("DD/MM/YYYY HH:mm")
          .toString();

        // Save the code in the database
        const submission = await new Submission({
          ques_id: ques_id,
          username: user.username,
          language: lang,
          code: code,
          time_stamp: currDate,
        }).save();

        // Add this to the queue
        ExecuteQueue.add({ submission_id: submission._id })
          .then(() => {
            console.log("Successfully added to the queue");
            res
              .status(200)
              .send({
                message: "Successfully added to the queue",
                submission_id: submission._id,
              });
          })
          .catch((err) => {
            console.log("From first catch ", err);
            res.status(400).json({
              error_code: "SWR",
              error: "Something went wrong. Please try again.",
            });
          });
>>>>>>> 18b6529d893b849ae7add31ec2c02964876c2419
      }
    } else {
      res.status(404).json({ error_code: "UNF", error: "User not found." });
    }
  } catch (error) {
    console.log("From last catch ", error);
    res.status(400).json({
      error_code: "SWR",
      error: "Something went wrong. Please try again.",
    });
  }
});

module.exports = router;
