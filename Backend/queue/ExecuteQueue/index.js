const Queue = require("bull");
const path = require("path");
const { basePath } = require("../../basePath.js");

const Question = require("../../models/question");
const Submission = require("../../models/submission");
const { generateCodeFile } = require("../../utils/generateCodeFile");
const { executeCpp } = require("../../utils/executeCpp");
const { generateResultFile } = require("../../utils/generateResultFile");
const { getVerdict } = require("../../utils/verdict");
const { deleteFile } = require("../../utils/deleteFiles");

const { exec } = require("child_process");


// Create a Queue object
const ExecuteQueue = new Queue("execute");

const compileCpp = async (filePath, outPath) => {
  console.log("filePath from index : ", filePath);
  console.log("outPath from index : ", outPath);
  return new Promise((res, rej) => {
    exec(`g++ ${filePath} -o ${outPath} -static`, (error, stdout, stderr) => {
      if (error || stderr) {
        rej({ error, stderr });
      } else {
        res();
      }
    });
  });
};

// This is the process every element in ExecuteQueue will do.
// PENDING TASKS
// 1. On successfull submission(line 145) , update the points in result field of contest model
ExecuteQueue.process(5, async (job, done) => {
  const submission_id = job.data.submission_id;
  const contestRunning = job.data.contestRunning;
  //console.log(submission_id);
  try {
    const submission = await Submission.findOne({
      _id: submission_id,
    }).exec();
    if (submission.verdict === "Queued") {
      // Generate Code file for the code.

      //console.log(1);
      const { codeFilePath, inPath } = await generateCodeFile(
        submission.language,
        submission.code,
        undefined,
        submission.username
      ); // language, code, input(if any), username.

      // Try to execute the file created and deliver the verdict
      try {
        // For pre defined Private Test Cases
        const ques = await Question.findOne({
          _id: submission.ques_id,
        }).exec();

        const n_pvt = ques.private_test_cases.length;
        const n_public = ques.public_test_cases.length;

        var error = false;
        var time_taken = 0;

        const outPath = path.join(
          path.join(
            path.join(
              path.join(basePath(), "TestCases"),
              `${ques._id}`
            ),
            "public"
          ),
          `${i}_out.txt`
        );
        //console.log("heeeee", outPath);
        await compileCpp(codeFilePath, outPath).then(async () => {
          //console.log("Code Compiled Successfully");
        });


        // Loop over public test cases
        for (var i = 0; i < n_public; i++) {
          // Path of the pre defined input file for this test case
          const inPath = path.join(
            path.join(
              path.join(
                path.join(basePath(), "TestCases"),
                `${ques._id}`
              ),
              "public"
            ),
            `${i}_in.txt`
          );

          //console.log(3);
          // Execute the code.
          var resp = await executeCpp(
            codeFilePath,
            submission.username,
            inPath,
            ques.time_limit
          ); // path of code file, username, path of input file, time_limit

          ans = resp.stdout;
          time_taken = time_taken + resp.difference;

          //console.log(4);
          // Create a file for the result obtained by the code which was executed.
          const resultFilePath = await generateResultFile(
            codeFilePath,
            ans,
            submission.username,
            i
          );

          // Path of the pre defined output file for this test case

          //console.log(5);
          // Check for verdict
          if (!getVerdict(resultFilePath, outPath)) {
            error = true;
            break;
          }
        }

        //console.log(6);
        // Loop over the test cases, execute and give verdict
        // Loop only is there is no error from above
        for (var i = 0; !error && i < n_pvt; i++) {
          // Path of the pre defined input file for this test case
          const inPath = path.join(
            path.join(
              path.join(
                path.join(basePath(), "TestCases"),
                `${ques._id}`
              ),
              "private"
            ),
            `${i}_in.txt`
          );

          //console.log(7);
          // Execute the code.
          var resp = await executeCpp(
            codeFilePath,
            submission.username,
            inPath,
            ques.time_limit
          ); // path of code file, username, path of input file, time_limit

          ans = resp.stdout;
          time_taken = time_taken + resp.difference;

          //console.log(8);
          // Create a file for the result obtained by the code which was executed.
          const resultFilePath = await generateResultFile(
            codeFilePath,
            ans,
            submission.username,
            i
          );

          // Path of the pre defined output file for this test case
          const outPath = path.join(
            path.join(
              path.join(
                path.join(basePath(), "TestCases"),
                `${ques._id}`
              ),
              "private"
            ),
            `${i}_out.txt`
          );

          //console.log(9);

          // Check for verdict
          if (!getVerdict(resultFilePath, outPath)) {
            error = true;
            break;
          }
        }

        const average_time_taken = time_taken / (n_public + n_pvt);
        //console.log(10);
        deleteFile([codeFilePath]);

        //console.log("Ultimately at the end");

        //console.log(11);
        if (!error) {
          //console.log(12);
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Accepted", time_taken: average_time_taken },
            { new: true }
          );
          //console.log("Yeah.. correct answer and updated too");
          done();
        } else {
          //console.log(13);
          //console.log("oops.. wrong answer");
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Wrong Answer" }
          ).exec();
          done();
        }
      } catch (error) {
        //console.log(14);
        deleteFile([codeFilePath]);
        //console.log(14.2);

        let err;
        if (error.stderr) {
          const searchString = codeFilePath + ": ";
          err = error.stderr.split(searchString).join("");
          //console.log(15);
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Compilation Error", error: err }
          ).exec();
          //console.log(16);
          done();
        } else if (error.error) {
          //console.log(17);
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Time Limit Exceeded" }
          ).exec();
          //console.log(18);
          done();
        } else if (error.err) {
          //console.log(19);
          //console.log(error.err);
          err = error.err.code;
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Compilation Error", error: err }
          ).exec();
          //console.log(20);
          done();
        } else {
          //console.log(error);
          await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Server Error" },
            { new: true }
          );
          done();
        }
      }
    } else {
      //console.log("in error of process");
      throw Error;
    }
  } catch (error) {
    //console.log(error);
    await Submission.findOneAndUpdate(
      { _id: submission_id },
      { verdict: "Server Error" },
      { new: true }
    );
    throw Error;
  }
});

ExecuteQueue.on("completed", (job) => {
  console.log(
    `Completed job id # ${job.id} and submission_id #${job.data.submission_id}`
  );
});

ExecuteQueue.on("error", (error) => {
  //console.log(error);
});

module.exports = { ExecuteQueue };
