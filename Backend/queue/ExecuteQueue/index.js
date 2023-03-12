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


// Create a Queue object
const ExecuteQueue = new Queue("execute");


// This is the process every element in ExecuteQueue will do.
// PENDING TASKS
// 1. On successfull submission(line 145) , update the points in result field of contest model
ExecuteQueue.process(async (job, done) => {
    try{
        const submission_id = job.data.submission_id;
        const submission = await Submission.findOne({_id : submission_id}).exec();
        if(submission.verdict==="Queued"){

            // Generate Code file for the code.
            const { codeFilePath, inPath } = await generateCodeFile(
            submission.language,
            submission.code,
            undefined,
            submission.username,
            ); // language, code, input(if any), username.


            // Try to execute the file created and deliver the verdict
            try {

                // For pre defined Private Test Cases
                const ques = await Question.findOne({ _id: submission.ques_id }).exec();

                const n_pvt = ques.private_test_cases.length;
                const n_public = ques.public_test_cases.length;

                var error = false;
                var time_taken = 0;


                // Loop over public test cases
                for (var i = 0; i < n_public; i++) {

                    // Path of the pre defined input file for this test case
                    const inPath = path.join(
                    path.join(
                        path.join(path.join(basePath(), "TestCases"), `${ques._id}`),
                        "public"
                    ),
                    `${i}_in.txt`
                    );

                    // Execute the code.
                    var resp = await executeCpp(
                        codeFilePath,
                        submission.username,
                        inPath,
                        ques.time_limit
                        ); // path of code file, username, path of input file, time_limit

                    ans = resp.stdout;
                    time_taken = time_taken + resp.difference;
                    
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
                        path.join(path.join(basePath(), "TestCases"), `${ques._id}`),
                        "public"
                    ),
                    `${i}_out.txt`
                    );

                    // Check for verdict
                    if (!getVerdict(resultFilePath, outPath)) {
                        error = true;
                        break;
                    }
                }


                // Loop over the test cases, execute and give verdict
                for (var i = 0; i < n_pvt; i++) {

                    // Path of the pre defined input file for this test case
                    const inPath = path.join(
                    path.join(
                        path.join(path.join(basePath(), "TestCases"), `${ques._id}`),
                        "private"
                    ),
                    `${i}_in.txt`
                    );

                    // Execute the code.
                    var resp = await executeCpp(
                        codeFilePath,
                        submission.username,
                        inPath,
                        ques.time_limit
                        ); // path of code file, username, path of input file, time_limit

                    ans = resp.stdout;
                    time_taken = time_taken + resp.difference;
                    
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
                        path.join(path.join(basePath(), "TestCases"), `${ques._id}`),
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

                const average_time_taken = time_taken/(n_public+ n_pvt);
                deleteFile([codeFilePath]);

                console.log("Ultimately at the end");
                if (!error) {
                    await Submission.findOneAndUpdate({_id:submission_id},{verdict:"Accepted",time_taken:average_time_taken},{new:true});
                    console.log("Yeah.. correct answer and updated too");

                } else {
                    console.log("oops.. wrong answer");
                    await Submission.findOneAndUpdate({_id:submission_id},{verdict:"Wrong Answer"}).exec();
                }
            } 
            catch (error) {
                deleteFile([codeFilePath]);

                let err;
                if (error.stderr) {
                    const searchString = to_delete[0] + ":"
                    err = error.stderr.split(searchString).join("");
                    await Submission.findOneAndUpdate({_id:submission_id},{verdict:"Compilation Error",error:err}).exec();
                }
                else if (error.error) {
                    await Submission.findOneAndUpdate({_id:submission_id},{verdict:"Time Limit Exceeded"}).exec();
                }
                else if (error.err) {
                    console.log(error.err);
                    err = error.err.code;
                    await Submission.findOneAndUpdate({_id:submission_id},{verdict:"Compilation Error",error:err}).exec();
                }
            }
        }
        else{
            console.log("in error of process")
            throw Error;
        }
    }
    catch(error){
        console.log(error);
    }finally{
        done();
    }
});

ExecuteQueue.on("completed", (job) => {
  console.log(`Completed job id # ${job.id} and submission_id #${job.data.submission_id}`);
});

module.exports = { ExecuteQueue };
