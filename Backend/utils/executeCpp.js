const { exec, spawn } = require("child_process");

// runCpp to run the compiled file in an input file.
const runCpp = async (compiledFileName, inputPath, time_limit, username) => {
  return new Promise((res, rej) => {
    let process;

    // use ./ before ${outFileName} to run the file in the same directory in linux
    process = exec(
      `cd UsersCodes && cd codeFiles && cd ${username} && start=$(date +%s%N); output=$(./${compiledFileName} < ${inputPath} 2>&1); end=$(date +%s%N); runtime=$(echo "scale=3; ($end - $start) / 1000000" | bc); echo "Execution time: $runtime" >&2; echo "$output";`(
        (options = { maxBuffer: 1024 * 1024 * 512 })
      ),
      (err, std_out, std_err) => {
        // If there is some error, reject the promise with the error
        if (err) {
          rej({ err });
        }

        // Find the time taken in running the code. The runtime is a part of std_err.
        // In milliseconds
        let timeTaken = extractExecutionTime(std_err);

        // If the time taken in running the code is not a number, this means user has used cerr in his code , which must be avoided.
        if (isNaN(timeTaken)) rej({ error: "Donot use cerr in your code." });
        else timeTaken = Number(timeTaken);

        // If time taken is more than the time limit, reject the promise with time limit exceeded error
        if (timeTaken > time_limit * 1000) {
          rej({ error: "Time Limit Exceeded", difference: timeTaken });
        }
        //  Create a response containing the output and time taken to run and then resolve the promise
        else {
          const response = {
            stdout: std_out.trim(),
            difference: timeTaken,
          };
          res(response);
        }
      }
    );

    // kill the process if it runs for more than 30 seconds
    setTimeout(() => {
      process.kill();
      rej({ error: "Time Limit Exceeded", difference: 15 });
    }, 15000);
  });
};

// Function that triggers runCpp and is invoked by the main process
const executeCpp = async (
  compiledFileName,
  username,
  inputPath,
  time_limit
) => {
  // Invoke runCpp and wait for the response
  const response = await runCpp(
    compiledFileName,
    inputPath,
    time_limit,
    username
  );
  return response;
};

// Function to extract execution time in milliseconds
function extractExecutionTime(output) {
  const timeRegex = /Execution time: ([0-9.]+)/;
  const matches = output.match(timeRegex);
  if (matches && matches.length >= 2) {
    return parseFloat(matches[1]);
  }
  return null;
}

module.exports = { executeCpp };
