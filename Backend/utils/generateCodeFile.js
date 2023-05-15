const path = require("path");
const fs = require("fs");
const date = require("date-and-time");
const { basePath } = require("../basePath.js");

// Function to generate the file for the code that is received and also create a path to store the compiled code.
const generateCodeFile = async (lang, content, username) => {

  // Directory where files will be temporarily stored.
  const dirCodeFiles = path.join(
    path.join(basePath(), "UsersCodes"),
    "codeFiles"
  );

  // if the directory where files will be temporarily stored, doesnot exist, create it.
  if (!fs.existsSync(dirCodeFiles)) {
    fs.mkdirSync(dirCodeFiles, { recursive: true });
  }

  // Inside the code directory, create a directory in the name of user to store his codes.
  const userDir = path.join(dirCodeFiles, `${username}`);
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }

  // Create the path of file in which source code will be written
  var now = new Date();
  now = date.format(now, "DD_MM_YYYY__HH_mm_ss");

  const codeFileName = `${username}_${now.toString()}.${lang}`;
  const codeFilePath = path.join(userDir, codeFileName);
  fs.writeFileSync(codeFilePath, content);


  // Create the path of file in which compiled data will be stored.
  const compiledFileName = `${codeFileName.split(".")[0]}.out`;
  const compiledFilePath = path.join(userDir, compiledFileName);

  // Return the result
  return { codeFilePath, compiledFileName, compiledFilePath };
};

module.exports = { generateCodeFile };
