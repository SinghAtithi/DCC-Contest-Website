const { FilesManager } = require('turbodepot-node');

const getVerdict = (resultFilePath,outputFilePath)=>{
    

    let filesManager = new FilesManager();
    return filesManager.isFileEqualTo(resultFilePath,outputFilePath)
    

};

module.exports = {getVerdict};