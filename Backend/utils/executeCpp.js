const { exec } = require("child_process");
const path = require("path");
const { basePath } = require("../basePath.js");
const fs = require("fs");

const dirCodeFiles = path.join(
  path.join(basePath(), "UsersCodes"),
  "codeFiles"
);

const executeCpp = async (filePath, user_id, inPath, time_limit) => {
  const userDir = path.join(dirCodeFiles, `${user_id}`);
  const outFileName = `${path.basename(filePath).split(".")[0]}.out`;

  const outPath = path.join(userDir, outFileName);

  return new Promise((res, rej) => {
    let start = new Date();
    exec(
      `g++ ${filePath} -o ${outPath} && cd UsersCodes && cd codeFiles && cd ${user_id} && ${outFileName} < ${inPath}`, // For windows it is ${outFileName} and for linux it is ./${outFileName}
      (error, stdout, stderr) => {

        let end = new Date();
        if (error || stderr) {
          rej({ error, stderr });
        }
        let dif = Math.abs(start - end) / 1000; // the time difference in seconds.
        if(dif>time_limit){
          rej({"error":"Time Limit Exceeded"});
        }
        res(stdout);
      }
    );
  });
};

module.exports = { executeCpp };
