const express = require("express");
const path = require("path");

const { generateCodeFile } = require("../utils/generateCodeFile.js");
const { executeCpp } = require("../utils/executeCpp.js");
const Question = require("../models/question.js");
const { basePath } = require("../basePath.js");
const { generateResultFile } = require("../utils/generateResultFile.js");
const { getVerdict } = require("../utils/verdict.js");
const { saveCodes } = require("../utils/save_codes.js");
const { deleteFile } = require("../utils/deleteFiles.js");

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { lang = "cpp", code, ques_no } = req.body;
  const user_id = 1; // To be defined later

  var to_delete = [];
  var failedTestCase;

  // If no code is sent
  if (code === undefined) {
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

      // Loop over the test cases, execute and give verdict
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

      // console.log("In try : ",to_delete);
      deleteFile(to_delete);

      if (!error) {
        res.status(200).json({ message: `Verdict : Passed \nTime Taken : ${resp.difference}` });
      } else {
        res.status(406).json({ error: `Verdict : Incorrect Output\n\nLast Failed Test Case :\n\tinput : ${failedTestCase.input}\n\toutput : ${failedTestCase.output}\n\tYour Output : ${ans}`});
      }
    } catch (error) {
        deleteFile(to_delete);

        let err;
        if(error.stderr){
          const searchString = to_delete[0]+":"
          err=error.stderr.split(searchString).join("");
        }

        res.status(508).json({ error: err });
    }
  } else {
    return res.status(505).send({ error: "Something Went Wrong. Please refresh the page and try again." });
  }
});

module.exports = router;
