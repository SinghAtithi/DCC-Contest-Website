const express = require("express");
const path = require("path");

const { generateCodeFile } = require("../utils/generateCodeFile.js");
const { executeCpp }= require("../utils/executeCpp.js");
const Question = require("../models/question.js");
const { basePath } = require("../basePath.js");
const { generateResultFile } = require("../utils/generateResultFile.js");
const { getVerdict } = require("../utils/verdict.js");

const router = express.Router();

router.post("/run", async (req, res) => {
  const { lang = "cpp", code, input ,custom_input,ques_id } = req.body;
  const id = 1; // user_id
  if (code === undefined) {
    return res.status(400).json({ error: "Empty code cannot be executed." });
  }
  if (custom_input === false && input === undefined) {
    return res.status(400).json({ error: "Input is required." });
  }
  const {codeFilePath,inPath} = await generateCodeFile(lang, code,input, 1, 1); // language, code, input(if any), user_id, attempt_no.
  
  try{
      var output = [];
      if(!(input === undefined)){
        var ans = await executeCpp(codeFilePath,1,inPath); // path of code file, user_id, path of input file
        output.push(ans);
      }
      
      const ques = await Question.findById(ques_id);

      for(var i=0;i<ques.no_of_public_test_cases;i++){
        const inPath = path.join(path.join(path.join(path.join(basePath(),"TestCases"),`${ques_id}`),"public"),`${i}_in.txt`);
        var ans = await executeCpp(codeFilePath,1,inPath); // path of code file, user_id, path of input file

        const resultFilePath = await generateResultFile(codeFilePath,ans,id,i);

        const outPath = path.join(path.join(path.join(path.join(basePath(),"TestCases"),`${ques_id}`),"public"),`${i}_out.txt`);
        console.log(resultFilePath);
        console.log(outPath);
        getVerdict(resultFilePath,outPath);


        output.push(ans);
      }
      
      res.send(output);

  }catch(error){
    res.status(500).json({"error" : error.stderr});

  }
  
});

module.exports = router;
