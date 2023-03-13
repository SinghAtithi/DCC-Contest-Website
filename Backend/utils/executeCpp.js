const { exec } = require("child_process");
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

    exec(`g++ ${filePath} -o ${outPath} -static`, (error, stdout, stderr) => {
      if (error || stderr) {
        rej({ error, stderr });
      }
      else {

        let start = new Date();
        exec(`cd UsersCodes && cd codeFiles && cd ${username}  && ${outFileName} < ${inPath}`, (err, std_out, std_err) => {
        let end = new Date();

        var to_delete = [];
        to_delete.push(outPath);
        deleteFile(to_delete);
        
        if (err || std_err) {
          rej({ err, std_err });
        }
        let dif = Math.abs(start - end) / 1000; // the time difference in seconds.
        
        if (dif > time_limit+2) {
          rej({ "error": "Time Limit Exceeded", difference: dif });
        }
        else {
          const response = {
            stdout: std_out,
            difference: dif,
          }
          res(response);
        }
      })

      }
    })
  });
};

module.exports = { executeCpp };
