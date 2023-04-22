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

const ExecuteQueue = new Queue("execute");



const compileCpp = async (filePath, outPath) => {
      // outPath = filePath.split(".")[0] + ".exe";
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

const getSubmission = async (submission_id) => {
      const submission = await Submission.findOne({
            _id: submission_id,
      }).exec();
      return submission;
}

const updateServerError = async (submission_id) => {
      const submission = await Submission.findOneAndUpdate(
            { _id: submission_id },
            {
                  verdict: "Server Error",
                  time: 0,
                  memory: 0,
            },
            { new: true }
      ).exec();
}

const getGenerateCodeFile = async (submission) => {
      const { codeFilePath, outPath } = await generateCodeFile(
            submission.language,
            submission.code,
            undefined,
            submission.username
      ); // language, code, input(if any), username.
      return { codeFilePath, outPath };
}

const getQuestion = async (question_id) => {
      const ques = await Question.findOne({
            _id: question_id,
      }).exec();
      return ques;
}

const handleInPath = async (ques, index, publicOrPrivate) => {
      const inPath = path.join(
            path.join(
                  path.join(
                        path.join(basePath(), "TestCases"),
                        `${ques._id}`
                  ),
                  publicOrPrivate
            ),
            `${index}_in.txt`
      );
      return inPath;
}

const handleOutPathCheck = async (ques, publicOrPrivate) => {
      const outPathCheck = path.join(
            path.join(
                  path.join(
                        path.join(basePath(), "TestCases"),
                        `${ques._id}`
                  ),
                  publicOrPrivate
            ),
            `${i}_out.txt`
      );
      return outPathCheck;
}

const handleExecuteCpp = async (codeFilePath, submission, inPath, ques) => {
      var resp = await executeCpp(
            codeFilePath,
            submission.username,
            inPath,
            ques.time_limit
      );
      return resp;
};

const handleResultFilePath = async (codeFilePath, ans, submission) => {
      const resultFilePath = await generateResultFile(
            codeFilePath,
            ans,
            submission.username,
            i
      );
      return resultFilePath;
}

const handleTestCases = async (testCaseLength, submission, ques, publicOrPrivate, codeFilePath) => {
      let timeTaken = 0;
      for (let i = 0; i < testCaseLength; i++) {
            const inPath = await handleInPath(ques, i, publicOrPrivate);
            const outPathCheck = await handleOutPathCheck(ques, i, publicOrPrivate);
            const resp = await handleExecuteCpp(submission, ques)
            const ans = resp.stdout;
            timeTaken = timeTaken + resp.difference;
            const resultFilePath = handleResultFilePath(codeFilePath, ans, submission);
      }
      return { timeTaken, resultFilePath, outPathCheck };
}

const handleAccepted = async (submission_id) => {
      await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Accepted", time_taken: average_time_taken },
            { new: true }
      );
      console.log("Yeah.. correct answer and updated too");
      done();
}

const handleWrongAnswer = async (submission_id) => {
      console.log("oops.. wrong answer");
      await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Wrong Answer" }
      ).exec();
}

const updateCompilationError = async (submission_id, codeFilePath, error) => {
      const searchString = codeFilePath + ": ";
      let err = error.stderr.split(searchString).join("");
      await Submission.findOneAndUpdate({ _id: submission_id },
            { verdict: "Compilation Error", error: err }).exec();
}

const updateErrorError = async (submission_id) => {
      Submission.findOneAndUpdate({ _id: submission_id }, { verdict: "Time Limit Exceeded" }).exec();
}

const updateCompilationError2 = async (error, submission_id) => {
      let err = error.err.code;
      await Submission.findOneAndUpdate({ _id: submission_id }, {
            verdict: "Compilation Error", error: err
      }).exec();
}


const handleErrorCatch = async (error, codeFilePath, submission_id, done) => {
      if (error.stderr) {
            await updateCompilationError(submission_id, codeFilePath, error)
            done();
      } else if (error.error) {
            await updateErrorError(submission_id);
            done();
      } else if (error.err) {
            await updateCompilationError2(error, submission_id);
            done();
      } else {
            await updateServerError(submission_id);
            done();
      }
}

const handleQueuedSubmission = async (job, done) => {
      const submission_id = job.data.submission_id;
      const contestRunning = job.data.contestRunning;
      const submission = await getSubmission(submission_id);
      const { codeFilePath, outPath } = await getGenerateCodeFile(submission)
      const ques = await getQuestion(submission.question_id);
      const n_pvt = ques.private_testcases.length;
      const n_public = ques.public_testcases.length;
      var error = false;
      var time_taken = 0;

      try {
            await compileCpp(codeFilePath, outPath);
            const { timeTakenPublic, resultFilePathPublic, outPathCheckPublic } = handleTestCases(n_public, submission, ques, "public");
            if (!getVerdict(resultFilePathPublic, outPathCheckPublic)) {
                  error = true;
                  return;
            }
            const { timeTakenPrivate, resultFilePathPrivate, outPathCheckPrivate } = handleTestCases(n_pvt, submission, ques, "private");
            if (!getVerdict(resultFilePathPrivate, outPathCheckPrivate)) {
                  error = true;
                  return;
            }
            const average_time_taken = (timeTakenPrivate + timeTakenPublic) / (n_public + n_pvt);
            deleteFile([codeFilePath]);
            if (!error) {
                  await handleAccepted(submission_id)
            } else {
                  await handleWrongAnswer(submission_id);
                  done();
            }
      } catch (error) {
            deleteFile([codeFilePath]);
            handleErrorCatch();
      }
}


ExecuteQueue.process(5, async (job, done) => {
      const submission_id = job.data.submission_id;
      const contestRunning = job.data.contestRunning;

      try {
            const submission = await getSubmission(submission_id);
            if (submission.verdict === "Queued") {
                  await handleQueuedSubmission(job, done);
            } else {
                  throw Error;
            }
      } catch (error) {
            console.log(error);
            await updateServerError(submission_id);
      }
});

ExecuteQueue.on("error", (error) => {
      console.log(error);
});

module.exports = { ExecuteQueue };