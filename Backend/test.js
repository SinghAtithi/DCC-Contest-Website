const crypto = require('crypto');
const fs = require('fs');


const resultFileBuffer = fs.readFileSync(resultFilePath);
const outputFileBuffer = fs.readFileSync(outputFilePath);

const resultHashSum = crypto.createHash('sha256');
resultHashSum.update(resultFileBuffer);
const resultHex = resultHashSum.digest('hex');
console.log("here");

const outputHashSum = crypto.createHash('sha256');
outputHashSum.update(outputFileBuffer);
const outputHex = outputHashSum.digest('hex');

console.log(resultHex,outputHex);

// const getVerdict = (resultFilePath,outputFilePath)=>{
//     // console.log(resultFilePath,outputFilePath);
    

    

// };

// module.exports = {getVerdict};