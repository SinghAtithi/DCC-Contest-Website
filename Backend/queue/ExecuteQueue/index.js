const Queue = require("bull");
const path = require("path");
const fs = require("fs");
const { basePath } = require("../../basePath.js");

const Question = require("../../models/question");
const Submission = require("../../models/submission");
const { generateCodeFile } = require("../../utils/generateCodeFile");
const { executeCpp } = require("../../utils/executeCpp");
const { generateResultFile } = require("../../utils/generateResultFile");
const { getVerdict } = require("../../utils/verdict");
const { deleteFile } = require("../../utils/deleteFiles");
const { exec } = require("child_process");
const {
  generateTestCaseFiles,
} = require("../../utils/generateTestCaseFiles.js");
const Contest = require("../../models/contest.js");
const User = require("../../models/user.js");

// Create a Queue object
const ExecuteQueue = new Queue("execute");

// Function to compile the code at path 'codeFilePath' and store the coumpiled output in 'compiledFilePath'
const compileCpp = async (codeFilePath, compiledFilePath) => {
  return new Promise((res, rej) => {
    exec(
      `g++ ${codeFilePath} -o ${compiledFilePath} -static`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          rej({ error, stderr });
        } else {
          res();
        }
      }
    );
  });
};

// This is the process every element in ExecuteQueue will do.
ExecuteQueue.process(5, async (job, done) => {
  const submission_id = job.data.submission_id;
  const contestRunning = job.data.contestRunning;
  const username = job.data.username;
  const contest_id = job.data.contest_id;
  const testing = job.data.testing;
  console.log("Contest Running - ", contestRunning);
  try {
    // Find the submission in the database
    const submission = await Submission.findOne({
      _id: submission_id,
    }).exec();

    // If submission is queued
    if (submission.verdict === "Queued") {
      // Generate the code file and the compiled file path
      const { codeFilePath, compiledFilePath, compiledFileName } =
        await generateCodeFile(
          submission.language,
          submission.code,
          submission.username
        );

      console.log("To compile");
      // Try to compile and then execute the file created and deliver the verdict
      try {
        // Get the question from databse
        console.log("Getting Question");
        const ques = await Question.findById(
          submission.ques_id,
          "ques_id time_limit public_test_cases private_test_cases"
        ).exec();
        console.log("Got the question");

        console.log("Checking for test cases");
        // If the testcaseDir doesnot exist, create it.
        const testCasesDir = path.join(basePath(), "TestCases");

        if (!fs.existsSync(testCasesDir)) {
          fs.mkdirSync(testCasesDir, { recursive: true });
        }

        const quesDir = path.join(testCasesDir, `${ques._id}`);
        if (!fs.existsSync(quesDir)) {
          console.log("Creating test case files");
          await generateTestCaseFiles(
            ques.public_test_cases,
            ques.private_test_cases,
            ques._id
          );
          console.log("Created test case files");
        }
        console.log("Checked for test cases");

        // Extract the no of public and private test cases
        const n_public = ques.public_test_cases.length;
        const n_pvt = ques.private_test_cases.length;

        // Some letiables to reegulate the flow of process
        let error = false;
        let time_taken = 0;

        console.log("Compiling");
        // Compile the code
        await compileCpp(codeFilePath, compiledFilePath).then(async () => {
          console.log("Code Compiled Successfully");
        });

        console.log("Checking public test cases");
        // Loop over public test cases
        for (let i = 0; i < n_public; i++) {
          // Path of the pre defined input file for this test case
          const inPath = path.join(
            path.join(
              path.join(path.join(basePath(), "TestCases"), `${ques._id}`),
              "public"
            ),
            `${i}_in.txt`
          );

          // Path of the pre defined output file for this test case
          const outputFilePath = path.join(
            path.join(
              path.join(path.join(basePath(), "TestCases"), `${ques._id}`),
              "public"
            ),
            `${i}_out.txt`
          );

          // Execute the code.
          let resp = await executeCpp(
            compiledFileName,
            submission.username,
            inPath,
            ques.time_limit
          );

          // Extract the output answer and time taken from the response of executeCpp.
          // Add the time difference to the time_taken.
          let ans = resp.stdout;
          time_taken = time_taken + resp.difference;

          // Create a file for the result obtained by the code which was executed.
          const resultFilePath = await generateResultFile(
            codeFilePath,
            ans,
            submission.username,
            i
          );

          // Check for verdict.
          // If verdict is ok, move with the next test case. Else set error to true and break the loop.
          if (!getVerdict(resultFilePath, outputFilePath)) {
            error = true;
            break;
          }
        }

        console.log("Checking private test cases");

        // Loop over the test cases, execute and give verdict
        // Loop only is there is no error from above
        for (let i = 0; !error && i < n_pvt; i++) {
          // Path of the pre defined input file for this test case
          const inPath = path.join(
            path.join(
              path.join(path.join(basePath(), "TestCases"), `${ques._id}`),
              "private"
            ),
            `${i}_in.txt`
          );

          // Path of the pre defined output file for this test case
          const outputFilePath = path.join(
            path.join(
              path.join(path.join(basePath(), "TestCases"), `${ques._id}`),
              "private"
            ),
            `${i}_out.txt`
          );

          // Execute the code.
          let resp = await executeCpp(
            compiledFileName,
            submission.username,
            inPath,
            ques.time_limit
          );

          // Extract the output answer and time taken from the response of executeCpp.
          // Add the time difference to the time_taken.
          let ans = resp.stdout;
          time_taken = time_taken + resp.difference;

          // Create a file for the result obtained by the code which was executed.
          const resultFilePath = await generateResultFile(
            codeFilePath,
            ans,
            submission.username,
            i
          );

          // Check for verdict.
          // If verdict is ok, move with the next test case. Else set error to true and break the loop.
          if (!getVerdict(resultFilePath, outputFilePath)) {
            error = true;
            break;
          }
        }

        // Find the average time taken in executing all the test cases.
        const average_time_taken = time_taken / (n_public + n_pvt);

        deleteFile([codeFilePath]);
        deleteFile([compiledFilePath]);

        // If there is no error and all test cases have been successfully executed
        if (!error) {
          // Update the database
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Accepted", time_taken: average_time_taken },
            { new: true }
          );

          // Update the solved array of user if question is not being testes
          if(!testing) await User.updateSolved(ques.ques_id, username);

          // If contest is running, update the results,
          if (contestRunning)
            await Contest.updateResult(contest_id, ques.ques_id, username);
          done();
        }
        // Else if there is some error
        else {
          // Update the database
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Wrong Answer" }
          ).exec();
          done();
        }
      } catch (error) {
        // If there is compilation error or promise is rejected
        deleteFile([codeFilePath]);

        let err;
        // If there is compilation error, the error is in stderr.
        if (error.stderr) {
          console.log("Compilation Error");

          // Prepare the error
          let torep = basePath();
          const escapedTorep = torep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const regexPattern = new RegExp(
            `${escapedTorep}[\\s\\S]*?\\.cpp:`,
            "g"
          );
          // Update the database
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            {
              verdict: "Compilation Error",
              error: error.stderr.replace(regexPattern, ""),
            }
          ).exec();
          done();
        }
        // if key error(custom error when promise is rejected) is present in the error,
        else if (error.error) {
          deleteFile([compiledFilePath]);
          let run_time = Number(error.difference);
          let verdict = "Time Limit Exceeded";

          if (run_time === 30) verdict = "May be Infinite Loop";

          // Update the database
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: verdict, time_taken: error.difference }
          ).exec();
          done();
        }
        // if there is some error after compilation such as in inputs, the error is in err.
        else if (error.err) {
          deleteFile([compiledFilePath]);
          err = error.err.code;
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Error in IO", error: err }
          ).exec();
          done();
        }
        // Some unknown error happended
        else {
          console.log("Error 1", error);
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Server Error" }
          );
          done();
        }
      }
    }
    // If submission has already been executed
    else {
      done();
    }
  } catch (error) {
    // If something else has gone wrong
    await Submission.findOneAndUpdate(
      { _id: submission_id },
      { verdict: "Server Error" }
    );
    done();
  }
});

// Once the job is completed, this will be triggered
ExecuteQueue.on("completed", (job) => {
  console.log(
    `BULL QUEUE - Completed job id # ${job.id} and submission_id #${job.data.submission_id}`
  );
});

module.exports = { ExecuteQueue };
