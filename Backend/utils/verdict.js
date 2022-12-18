const { FilesManager } = require('turbodepot-node');

const getVerdict = (resultFilePath,outputFilePath)=>{
    

    let filesManager = new FilesManager();
    console.log(filesManager.isFileEqualTo(resultFilePath,outputFilePath));
    

};

module.exports = {getVerdict};