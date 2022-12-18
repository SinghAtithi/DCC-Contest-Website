const path = require("path");
const fs = require("fs");
const { basePath } = require("../basePath.js");

const generateResultFile = async (codeFilePath, ans, user_id, id) => {
  const dirCodeFiles = path.join(
    path.join(basePath(), "UsersCodes"),
    "codeFiles"
  );
  const userDir = path.join(dirCodeFiles, `${user_id}`); // id is the user id
  const outTextFileName = `${
    path.basename(codeFilePath).split(".")[0]
  }_${id}_out.txt`;
  const outTextFilePath = path.join(userDir, outTextFileName);

  await fs.writeFileSync(outTextFilePath, ans);

  return outTextFilePath;
};

module.exports = { generateResultFile };
