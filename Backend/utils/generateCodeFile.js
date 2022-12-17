const path = require("path");
const fs = require("fs");
const date = require("date-and-time");
const { basePath } = require("../basePath.js");

const dirCodeFiles = path.join(path.join(basePath(), "usersCodes"), "codeFiles");

if (!fs.existsSync(dirCodeFiles)) {
  fs.mkdirSync(dirCodeFiles, { recursive: true });
}

const generateCodeFile = async (lang, content, id, attempt) => {
  const userDir = path.join(dirCodeFiles, `${id}`);
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }
  var now = new Date();
  now = date.format(now, "DD_MM_YYYY__HH_mm_ss");

  const codeFileName = `${id}_${now.toString()}_${attempt}.${lang}`;
  const codeFilePath = path.join(userDir, codeFileName);

  await fs.writeFileSync(codeFilePath, content);
  return codeFilePath;
};

module.exports = {generateCodeFile};
