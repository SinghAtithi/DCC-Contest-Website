const { exec } = require("child_process");
const path = require("path");
const { basePath } = require("../basePath.js");
const { deleteFile } = require("../utils/deleteFiles.js");

const fs = require("fs");

const dirCodeFiles = path.join(
  path.join(basePath(), "UsersCodes"),
  "codeFiles"
);

const executeCpp = async (filePath, user_id, inPath, time_limit) => {
  const userDir = path.join(dirCodeFiles, `${user_id}`);
  const outFileName = `${path.basename(filePath).split(".")[0]}.txt`;
  const outPath = path.join(userDir, outFileName);

  return new Promise((res, rej) => {

    // exec(
    //   `g++ ${filePath} -o ${outPath} && cd UsersCodes && cd codeFiles && cd ${user_id} && ${outFileName} < ${inPath}`, // For windows it is ${outFileName} and for linux it is ./${outFileName}
    //   (error, stdout, stderr) => {

    //     let end = new Date();
    //     if (error || stderr) {
    //       rej({ error, stderr });
    //     }
    //     let dif = Math.abs(start - end) / 1000; // the time difference in seconds.
    //     if(dif>time_limit+1){
    //       rej({"error":"Time Limit Exceeded"});
    //     }
    //     res(stdout);
    //   }
    // );

    exec(`g++ ${filePath} -o ${outPath} -static`, (error, stdout, stderr) => {
      if (error || stderr) {
        rej({ error, stderr });
      }
      else {
        // console.log(stdout);
        let start = new Date();
        // fs.writeFileSync(path.join(userDir, outFileName), "its working");
        exec(`cd UsersCodes && cd codeFiles && cd ${user_id}  && ${outFileName} < ${inPath}`, (err, std_out, std_err) => {
          let end = new Date();
          // console.log(err, std_err);

          var to_delete = [];
          to_delete.push(outPath);
          deleteFile(to_delete);

          if (err || std_err) {
            rej({ err, std_err });
          }
          let dif = Math.abs(start - end) / 1000; // the time difference in seconds.
          if (dif > time_limit) {
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
