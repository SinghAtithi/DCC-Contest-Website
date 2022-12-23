/**
 * This function compares the result file with the correct output file.
 * @param resultFilePath the path of the result file
 * @param outputFilePath the path of the correct output file
 * @returns a boolean that represents the result of the comparison
 */

const { FilesManager } = require("turbodepot-node");

const getVerdict = (resultFilePath, outputFilePath) => {
  let filesManager = new FilesManager();
  let verdict = filesManager.isFileEqualTo(resultFilePath, outputFilePath);
  return verdict;
};

module.exports = { getVerdict };
