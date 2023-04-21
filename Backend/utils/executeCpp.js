// // const { exec } = require("child_process");
// const path = require("path");
// const { basePath } = require("../basePath.js");
// const { deleteFile } = require("../utils/deleteFiles.js");

// const fs = require("fs");

// const dirCodeFiles = path.join(
//   path.join(basePath(), "UsersCodes"),
//   "codeFiles"
// );

// const executeCpp = async (filePath, username, inPath, time_limit) => {
//   console.log("time limit", time_limit)
//   const userDir = path.join(dirCodeFiles, `${username}`);
//   const outFileName = `${path.basename(filePath).split(".")[0]}.txt`;
//   const outPath = path.join(userDir, outFileName);

//   return new Promise((res, rej) => {
//     let process;

//     exec(`g++ ${filePath} -o ${outPath} -static`, (error, stdout, stderr) => {
//       if (error || stderr) {
//         rej({ error, stderr });
//       }
//       else {
//         let start = new Date();

//         // use ./ before ${outFileName} to run the file in the same directory in linux
//         process = exec(`cd UsersCodes && cd codeFiles && cd ${username} && ./${outFileName} < ${inPath}`, (err, std_out, std_err) => {
//           let end = new Date();

//           var to_delete = [];
//           to_delete.push(outPath);
//           deleteFile(to_delete);

//           if (err || std_err) {
//             rej({ err, std_err });
//           }
//           let dif = Math.abs(start - end) / 1000; // the time difference in seconds.

//           if (dif > time_limit + 2) {
//             process.kill(); // kill the process if it runs for more than 4 seconds
//             rej({ "error": "Time Limit Exceeded", difference: dif });
//           }
//           else {
//             const response = {
//               stdout: std_out,
//               difference: dif,
//             }
//             res(response);
//           }
//         });

//         // kill the process if it runs for more than 4 seconds
//         setTimeout(() => {
//           process.kill();
//           rej({ "error": "Time Limit Exceeded", difference: 4 });
//         }, time_limit * 1000 + 1500);
//       }
//     })
//   });
// };

// module.exports = { executeCpp };

const { exec } = require("child_process");
const path = require("path");
const { basePath } = require("../basePath.js");
const { deleteFile } = require("../utils/deleteFiles.js");
const fs = require("fs");

const dirCodeFiles = path.join(path.join(basePath(), "UsersCodes"), "codeFiles");

const compileCpp = async (filePath, outPath) => {
  console.log("filePath from executeCpp : ", filePath)
  console.log("outPath from executeCpp : ", outPath)
  outPath = filePath.split(".")[0] + ".exe";
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

const runCpp = async (outPath, inPath, time_limit, username, outFileName) => {
  return new Promise((res, rej) => {
    let process;
    let start = new Date();

    // use ./ before ${outFileName} to run the file in the same directory in linux
    process = exec(`cd UsersCodes && cd codeFiles && cd ${username} && ./${outFileName} < ${inPath}`, (err, std_out, std_err) => {
      let end = new Date();

      var to_delete = [];
      to_delete.push(outPath);
      deleteFile(to_delete);

      if (err || std_err) {
        rej({ err, std_err });
      }
      let dif = Math.abs(start - end) / 1000; // the time difference in seconds.

      if (dif > time_limit + 2) {
        process.kill(); // kill the process if it runs for more than 4 seconds
        rej({ "error": "Time Limit Exceeded", difference: dif });
      } else {
        const response = {
          stdout: std_out,
          difference: dif,
        };
        res(response);
      }
    });

    // kill the process if it runs for more than 4 seconds
    setTimeout(() => {
      process.kill();
      rej({ "error": "Time Limit Exceeded", difference: 4 });
    }, time_limit * 1000 + 1500);
  });
};

const executeCpp = async (filePath, username, inPath, time_limit) => {
  console.log("time limit", time_limit);
  const userDir = path.join(dirCodeFiles, `${username}`);
  const outFileName = `${path.basename(filePath).split(".")[0]}.txt`;
  const outPath = path.join(userDir, outFileName);

  // await compileCpp(filePath, outPath);
  const response = await runCpp(outPath, inPath, time_limit, username, outFileName);

  return response;
};

module.exports = { executeCpp };
