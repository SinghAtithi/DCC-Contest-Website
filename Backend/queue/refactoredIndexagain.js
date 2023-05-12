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

/**
 * Compiles a C++ file and saves the executable to the specified path.
 * @param {string} filePath - The path of the source code file to be compiled.
 * @param {string} outPath - The path where the compiled executable file will be saved.
 * @returns {Promise<void>} A promise that resolves when the compilation is complete.
 */
const compileCpp = async (filePath, outPath) => {
      // Debugging information: print the file paths
      console.log("filePath from index : ", filePath);
      console.log("outPath from index : ", outPath);

      // Return a promise that resolves when the compilation is complete
      return new Promise((resolve, reject) => {
            // Execute the g++ compiler command to compile the code and create the executable
            exec(`g++ ${filePath} -o ${outPath} -static`, (error, stdout, stderr) => {
                  // If there was an error or stderr output, reject the promise with an error object
                  if (error || stderr) {
                        reject({ error, stderr });
                  }
                  // Otherwise, resolve the promise with no value
                  else {
                        resolve();
                  }
            });
      });
};


/**
 * Finds a submission by its ID.
 * @param {string} submission_id - The ID of the submission to find.
 * @returns {Promise<object>} A promise that resolves to the found submission object.
 */
const getSubmission = async (submission_id) => {
      // Use the Mongoose findOne method to find a submission by its ID and return a promise that resolves to the found submission object
      return Submission.findOne({ _id: submission_id }).exec();
}

/**
 * Updates a submission with a server error verdict, and sets its time and memory to 0.
 * @param {string} submission_id - The ID of the submission to update.
 * @returns {Promise<object>} A promise that resolves to the updated submission object.
 */
const updateServerError = async (submission_id) => {
      // Use the Mongoose findOneAndUpdate method to update a submission's verdict, time, and memory, and return a promise that resolves to the updated submission object
      return Submission.findOneAndUpdate(
            { _id: submission_id },
            {
                  verdict: "Server Error",
                  time: 0,
                  memory: 0,
            },
            { new: true }
      ).exec();
}


/**
 * Generates a code file for a given submission and returns the file paths.
 * @param {object} submission - The submission object containing the language, code, and username.
 * @returns {Promise<object>} A promise that resolves to an object with the code file path and output file path.
 */
const getGenerateCodeFile = async (submission) => {
      const { codeFilePath, outPath } = await generateCodeFile(
            submission.language,
            submission.code,
            undefined,
            submission.username
      ); // generateCodeFile function takes the language, code, input(if any), and username.
      return { codeFilePath, outPath };
}

/**
 * Finds a question by its ID.
 * @param {string} question_id - The ID of the question to find.
 * @returns {Promise<object>} A promise that resolves to the found question object.
 */
const getQuestion = async (question_id) => {
      // Use the Mongoose findOne method to find a question by its ID and return a promise that resolves to the found question object
      return Question.findOne({ _id: question_id }).exec();
}

/**
 * Generates the file path for a test case input file.
 * @param {object} ques - The question object.
 * @param {number} index - The index of the test case.
 * @param {string} publicOrPrivate - Whether the test case is public or private.
 * @returns {Promise<string>} A promise that resolves to the file path for the test case input file.
 */
const handleInPath = async (ques, index, publicOrPrivate) => {
      // Use path.join to concatenate the base path, the "TestCases" directory, the question ID, the public or private directory, and the test case input file name
      const inPath = path.join(
            basePath(),
            "TestCases",
            ques._id,
            publicOrPrivate,
            `${index}_in.txt`
      );
      return inPath;
}

/**
 * Returns the path of the output file to be checked for correctness.
 * @param {Object} ques - The question object.
 * @param {String} publicOrPrivate - Indicates if the test case is public or private.
 * @param {Number} i - The index of the test case.
 * @returns {String} The path of the output file to be checked.
 */
const handleOutPathCheck = async (ques, publicOrPrivate, i) => {
      const outPathCheck = path.join(
            basePath(),
            "TestCases",
            ques._id.toString(),
            publicOrPrivate,
            `${i}_out.txt`
      );
      return outPathCheck;
};

/**
 * Executes the user's code for a given test case.
 * @param {String} codeFilePath - The path of the user's code file.
 * @param {Object} submission - The submission object.
 * @param {String} inPath - The path of the input file for the test case.
 * @param {Number} timeLimit - The time limit for the question.
 * @returns {Object} The result of executing the code.
 */
const handleExecuteCpp = async (codeFilePath, submission, inPath, timeLimit) => {
      const result = await executeCpp(codeFilePath, submission.username, inPath, timeLimit);
      return result;
};

/**
 * Generates the path of the result file for a given test case and saves the user's answer to it.
 * @param {String} codeFilePath - The path of the user's code file.
 * @param {String} ans - The user's answer for the test case.
 * @param {String} username - The username of the user who submitted the code.
 * @param {Number} i - The index of the test case.
 * @returns {String} The path of the result file.
 */
const handleResultFilePath = async (codeFilePath, ans, username, i) => {
      const resultFilePath = path.join(
            basePath(),
            "Results",
            username,
            `${path.basename(codeFilePath, path.extname(codeFilePath))}_${i}_result.txt`
      );
      await fs.writeFile(resultFilePath, ans, (err) => {
            if (err) {
                  console.log(err);
            }
      });
      return resultFilePath;
};

/**
 * handleTestCases - Function to handle test cases for a submission
 * @param {number} testCaseLength - The length of the test case
 * @param {Object} submission - The submission object
 * @param {Object} ques - The question object
 * @param {string} publicOrPrivate - Whether the test case is public or private
 * @param {string} codeFilePath - The file path of the submitted code
 * @returns {Object} - An object containing the time taken, result file path, and output path check
 */
const handleTestCases = async (testCaseLength, submission, ques, publicOrPrivate, codeFilePath) => {
      let timeTaken = 0;
      for (let i = 0; i < testCaseLength; i++) {
            const inPath = await handleInPath(ques, i, publicOrPrivate);
            const outPathCheck = await handleOutPathCheck(ques, i, publicOrPrivate);
            const resp = await handleExecuteCpp(submission, ques);
            const ans = resp.stdout;
            timeTaken = timeTaken + resp.difference;
            const resultFilePath = handleResultFilePath(codeFilePath, ans, submission);
      }
      return { timeTaken, resultFilePath, outPathCheck };
};

/**
 * handleAccepted - Function to handle submission with accepted verdict
 * @param {string} submission_id - The ID of the submission
 */
const handleAccepted = async (submission_id) => {
      await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Accepted", time_taken: average_time_taken },
            { new: true }
      );
      console.log("Yeah.. correct answer and updated too");
      done();
};

/**
 * handleWrongAnswer - Function to handle submission with wrong answer verdict
 * @param {string} submission_id - The ID of the submission
 */
const handleWrongAnswer = async (submission_id) => {
      console.log("oops.. wrong answer");
      await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Wrong Answer" }
      ).exec();
};


/**
 * updateCompilationError - Function to update the submission with a compilation error
 * @param {string} submission_id - The ID of the submission
 * @param {string} codeFilePath - The file path of the submitted code
 * @param {Object} error - The error object thrown by the try-catch block
 */
const updateCompilationError = async (submission_id, codeFilePath, error) => {
      const searchString = codeFilePath + ": ";
      let err = error.stderr.split(searchString).join("");
      await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Compilation Error", error: err }
      ).exec();
};

/**
 * updateErrorError - Function to update the submission with a time limit exceeded error
 * @param {string} submission_id - The ID of the submission
 */
const updateErrorError = async (submission_id) => {
      await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Time Limit Exceeded" }
      ).exec();
};

/**
 * updateCompilationError2 - Function to update the submission with a compilation error
 * @param {Object} error - The error object thrown by the try-catch block
 * @param {string} submission_id - The ID of the submission
 */
const updateCompilationError2 = async (error, submission_id) => {
      let err = error.err.code;
      await Submission.findOneAndUpdate(
            { _id: submission_id },
            { verdict: "Compilation Error", error: err }
      ).exec();
};



/**
 * handleErrorCatch - Function to handle errors in a try-catch block for submissions
 * @param {Object} error - The error object thrown by the try-catch block
 * @param {string} codeFilePath - The file path of the submitted code
 * @param {string} submission_id - The ID of the submission
 * @param {function} done - Callback function to signal completion of the error handling
 */
const handleErrorCatch = async (error, codeFilePath, submission_id, done) => {
      if (error.stderr) {
            await updateCompilationError(submission_id, codeFilePath, error);
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
};


/**
 * Handle a queued submission
 * @param {Object} job - The job to process
 * @param {function} done - The function to call when the job is finished
 */
const handleQueuedSubmission = async (job, done) => {
      // Retrieve the submission_id and contestRunning values from the job data
      const submission_id = job.data.submission_id;
      const contestRunning = job.data.contestRunning;

      // Retrieve the submission from the submission_id
      const submission = await getSubmission(submission_id);

      // Generate the code file for the submission
      const { codeFilePath, outPath } = await getGenerateCodeFile(submission)

      // Retrieve the question from the submission's question_id
      const ques = await getQuestion(submission.question_id);

      // Get the number of private and public testcases for the question
      const n_pvt = ques.private_testcases.length;
      const n_public = ques.public_testcases.length;

      // Initialize error and time_taken variables
      var error = false;
      var time_taken = 0;

      try {
            // Compile the code file
            await compileCpp(codeFilePath, outPath);

            // Handle the public testcases
            const { timeTakenPublic, resultFilePathPublic, outPathCheckPublic } = handleTestCases(n_public, submission, ques, "public");
            if (!getVerdict(resultFilePathPublic, outPathCheckPublic)) {
                  error = true;
                  return;
            }

            // Handle the private testcases
            const { timeTakenPrivate, resultFilePathPrivate, outPathCheckPrivate } = handleTestCases(n_pvt, submission, ques, "private");
            if (!getVerdict(resultFilePathPrivate, outPathCheckPrivate)) {
                  error = true;
                  return;
            }

            // Calculate the average time taken for all testcases
            const average_time_taken = (timeTakenPrivate + timeTakenPublic) / (n_public + n_pvt);

            // Delete the code file
            deleteFile([codeFilePath]);

            // If there are no errors, handle the submission as accepted
            if (!error) {
                  await handleAccepted(submission_id)
            } else {
                  // If there are errors, handle the submission as wrong answer
                  await handleWrongAnswer(submission_id);
                  done();
            }
      } catch (error) {
            // If there are any errors, delete the code file and handle the error
            deleteFile([codeFilePath]);
            handleErrorCatch();
      }
}


/**
 * Executes a job from a queue
 * @param {number} limit - The number of jobs to process at a time
 * @param {function} worker - The function to run for each job
 */
ExecuteQueue.process(5, async (job, done) => {
      // Retrieve the submission_id and contestRunning values from the job data
      const submission_id = job.data.submission_id;
      const contestRunning = job.data.contestRunning;

      try {
            // Retrieve the submission from the submission_id
            const submission = await getSubmission(submission_id);

            // If the submission's verdict is "Queued", handle it
            if (submission.verdict === "Queued") {
                  await handleQueuedSubmission(job, done);
            } else {
                  throw Error;
            }
      } catch (error) {
            // Log the error and update the server with the server error for the submission
            console.log(error);
            await updateServerError(submission_id);
      }
});


/**
 * Handle errors thrown by the ExecuteQueue
 * @param {Error} error - The error thrown by the ExecuteQueue
 */
ExecuteQueue.on("error", (error) => {
      // Log the error
      console.log(error);
});

// Export the ExecuteQueue object
module.exports = { ExecuteQueue };
