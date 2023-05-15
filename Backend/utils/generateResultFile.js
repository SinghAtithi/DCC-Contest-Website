const path = require("path");
const fs = require("fs");
const { basePath } = require("../basePath.js");

// Generate the result file that contains the output of executed code.
const generateResultFile = async (codeFilePath, ans, username, id) => {
  // Directory where files will be temporarily stored.
  const dirCodeFiles = path.join(
    path.join(basePath(), "UsersCodes"),
    "codeFiles"
  );
  // No need to check if dirCodeFiles exists because previous operations will have already created the directory.

  // Inside the code directory, move to a directory in the name of user to store his codes.
  const userDir = path.join(dirCodeFiles, `${username}`);

  // Create the path of file in which output will be written
  const outTextFileName = `${
    path.basename(codeFilePath).split(".")[0]
  }_${id}_out.txt`;
  const outTextFilePath = path.join(userDir, outTextFileName);

  fs.writeFileSync(outTextFilePath, ans);

  // Return the result
  return outTextFilePath;
};

module.exports = { generateResultFile };
