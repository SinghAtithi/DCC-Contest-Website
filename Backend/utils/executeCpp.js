const { exec } = require("child_process");
const path = require("path");
const { basePath } = require("../basePath.js");
const fs = require("fs");

const dirCodeFiles = path.join(
  path.join(basePath(), "UsersCodes"),
  "codeFiles"
);

const executeCpp = async (filePath, id, inPath) => {
  const userDir = path.join(dirCodeFiles, `${id}`);
  const outFileName = `${path.basename(filePath).split(".")[0]}.out`;

  const outPath = path.join(userDir, outFileName);

  return new Promise((res, rej) => {
    exec(
      `g++ ${filePath} -o ${outPath} && cd UsersCodes && cd codeFiles && cd ${id} && ${outFileName} < ${inPath}`, // For windows it is ${outFileName} and for linux it is ./${outFileName}
      (error, stdout, stderr) => {
        if (error || stderr) {
          rej({ error, stderr });
        }

        res(stdout);
      }
    );
  });
};

module.exports = { executeCpp };
