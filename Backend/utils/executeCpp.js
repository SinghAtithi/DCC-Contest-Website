const {exec} = require("child_process");
const path = require("path");
const { basePath } = require("../basePath.js");

const dirCodeFiles = path.join(path.join(basePath(), "usersCodes"), "codeFiles");


const executeCpp = (filePath,id)=>{
    const userDir = path.join(dirCodeFiles, `${id}`);
    // const ExecutableFilePath = path.join(userDir, `${path.basename(filePath).split('.')[0]}.exe`);
    const outFileName = `${path.basename(filePath).split('.')[0]}.out`
    const outPath = path.join(userDir,outFileName );

    return new Promise((res,rej)=>{
        exec(`g++ ${filePath} -o ${outPath} && cd usersCodes && cd codeFiles && cd ${id} && ${outFileName}` , // For windows it is ${outFileName} and for linux it is ./${outFileName}
            (error,stdout,stderr)=>{
                if(error || stderr){
                    rej({error,stderr});
                }
                res(stdout);
            }) ;
    })
}

module.exports = {executeCpp};