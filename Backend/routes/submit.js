const express = require("express");
const path = require("path");

const { generateCodeFile } = require("../utils/generateCodeFile.js");
const { executeCpp } = require("../utils/executeCpp.js");
const Question = require("../models/question.js");
const { basePath } = require("../basePath.js");
const { generateResultFile } = require("../utils/generateResultFile.js");
const { getVerdict } = require("../utils/verdict.js");

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { lang = "cpp", code, ques_id } = req.body;
  const user_id = 1;
  const attempt_no = 1;

  // If no code is sent
  if (code === undefined) {
    return res.status(400).json({ error: "Empty code cannot be executed." });
  }

  // Generate Code file for the code that is received.
  const { codeFilePath, inPath } = await generateCodeFile(
    lang,
    code,
    undefined,
    user_id,
    attempt_no
  ); // language, code, input(if any), user_id, attempt_no.
  
  // Try to execute the file created and deliver the verdict
  try {

    // For pre defined Private Test Cases
    const ques = await Question.findById(ques_id);
    var error = false;
    for (var i = 0; i < ques.no_of_private_test_cases; i++) {
      const inPath = path.join(
        path.join(
          path.join(path.join(basePath(), "TestCases"), `${ques_id}`),
          "private"
        ),
        `${i}_in.txt`
      );
      var ans = await executeCpp(codeFilePath, user_id, inPath,ques.time_limit); // path of code file, user_id, path of input file, time_limit
      ans = ans.replace(/(\r)/gm, ""); // Windows by default adds \r before every \n. This was causing an issue with file comparison. So removed all \r from output.
       
      // Create a file for the result obtained by the code which was executed.
      const resultFilePath = await generateResultFile(codeFilePath, ans, user_id, i);

      // Path of the pre defined output file for this test case
      const outPath = path.join(
        path.join(
          path.join(path.join(basePath(), "TestCases"), `${ques_id}`),
          "private"
        ),
        `${i}_out.txt`
      );

      // Check for verdict
      if (!getVerdict(resultFilePath, outPath)) {
        error = true;
        break;
      }
    }

    if (!error) {
      res.send({ message: "Passed" });
    } else {
      res.status(406).json({ error: "Incorrect Output", message: "Failed" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
