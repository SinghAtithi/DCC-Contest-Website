// const { exec } = require("child_process");
// const path = require("path");
// const { basePath } = require("../basePath.js");
// const { deleteFile } = require("../utils/deleteFiles.js");

// const fs = require("fs");

// const dirCodeFiles = path.join(
//   path.join(basePath(), "UsersCodes"),
//   "codeFiles"
// );

// const executeCpp = async (filePath, username, inPath, time_limit) => {
//   const userDir = path.join(dirCodeFiles, `${username}`);
//   const outFileName = `${path.basename(filePath).split(".")[0]}.txt`;
//   const outPath = path.join(userDir, outFileName);

//   return new Promise((res, rej) => {

//     exec(`g++ ${filePath} -o ${outPath} -static`, (error, stdout, stderr) => {
//       if (error || stderr) {
//         rej({ error, stderr });
//       }
//       else {

//         let start = new Date();
//         // use ./ before ${outFileName} to run the file in the same directory in linux
//         exec(`cd UsersCodes && cd codeFiles && cd ${username}  && ./${outFileName} < ${inPath}`, (err, std_out, std_err) => {
//           let end = new Date();

//           var to_delete = [];
//           to_delete.push(outPath);
//           deleteFile(to_delete);

//           if (err || std_err) {
//             rej({ err, std_err });
//           }
//           let dif = Math.abs(start - end) / 1000; // the time difference in seconds.

//           if (dif > time_limit + 2) {
//             rej({ "error": "Time Limit Exceeded", difference: dif });
//           }
//           else {
//             const response = {
//               stdout: std_out,
//               difference: dif,
//             }
//             res(response);
//           }
//         })

//       }
//     })
//   });
// };

// module.exports = { executeCpp };

const { spawn } = require("child_process");
const path = require("path");
const { basePath } = require("../basePath.js");
const { deleteFile } = require("../utils/deleteFiles.js");

const fs = require("fs");

const dirCodeFiles = path.join(
  path.join(basePath(), "UsersCodes"),
  "codeFiles"
);

const executeCpp = async (filePath, username, inPath, time_limit) => {
  const userDir = path.join(dirCodeFiles, `${username}`);
  const outFileName = `${path.basename(filePath).split(".")[0]}.txt`;
  const outPath = path.join(userDir, outFileName);

  return new Promise((res, rej) => {
    const childProcess = spawn(`g++ ${filePath} -o ${outPath} -static`, {
      shell: true
    });

    childProcess.on("error", err => {
      rej({ error: err });
    });

    childProcess.on("exit", (code, signal) => {
      if (code !== 0) {
        rej({ error: "Compilation Failed" });
      } else {
        const start = new Date();
        const childProcess = spawn(`./${outFileName}`, {
          shell: true,
          cwd: path.join(dirCodeFiles, username),
          stdio: ["pipe", "pipe", "pipe"]
        });

        const timer = setTimeout(() => {
          childProcess.kill();
          rej({ error: "Time Limit Exceeded" });
        }, time_limit + 2000);

        childProcess.stdout.on("data", data => {
          clearTimeout(timer);
          const end = new Date();
          const dif = Math.abs(start - end) / 1000; // the time difference in seconds.
          const response = {
            stdout: data.toString(),
            difference: dif
          };
          deleteFile([outPath]);
          res(response);
        });

        childProcess.stderr.on("data", data => {
          clearTimeout(timer);
          rej({ error: data.toString() });
        });
      }
    });
  });
};

module.exports = { executeCpp };
