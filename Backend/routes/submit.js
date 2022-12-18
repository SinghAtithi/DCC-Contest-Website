const express = require("express");
const path = require("path");

const { generateCodeFile } = require("../utils/generateCodeFile.js");
const { executeCpp }= require("../utils/executeCpp.js");
const Question = require("../models/question.js");
const { basePath } = require("../basePath.js");
const { generateResultFile } = require("../utils/generateResultFile.js");
const { getVerdict } = require("../utils/verdict.js");

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { lang = "cpp", code ,ques_id } = req.body;
  const id = 1; // user_id
  if (code === undefined) {
    return res.status(400).json({ error: "Empty code cannot be executed." });
  }
  
  const {codeFilePath,inPath} = await generateCodeFile(lang, code,undefined, 1, 1); // language, code, input(if any), user_id, attempt_no.
  
  try{
      const ques = await Question.findById(ques_id);
      var error = false;
      for(var i=0;i<ques.no_of_private_test_cases;i++){
        const inPath = path.join(path.join(path.join(path.join(basePath(),"TestCases"),`${ques_id}`),"private"),`${i}_in.txt`);
        var ans = await executeCpp(codeFilePath,1,inPath); // path of code file, user_id, path of input file

        const resultFilePath = await generateResultFile(codeFilePath,ans,id,i);

        const outPath = path.join(path.join(path.join(path.join(basePath(),"TestCases"),`${ques_id}`),"private"),`${i}_out.txt`);

        if(!getVerdict(resultFilePath,outPath)){
          error = true;
          break;
        }
      }
      
      if(!error){
        res.send({"message":"Passed"});
      }
      else{
        res.status(406).json({"error" : "Incorrect Output","message":"Failed"});
      }

  }catch(error){
    res.status(500).json({"error" : error.stderr});

  }
  
});

module.exports = router;
