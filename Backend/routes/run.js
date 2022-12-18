const express = require("express");
const { generateCodeFile } = require("../utils/generateCodeFile.js");
const { executeCpp }= require("../utils/executeCpp.js");

const router = express.Router();

router.post("/run", async (req, res) => {
  const { lang = "cpp", code, input } = req.body;

  if (code === undefined) {
    return res.status(400).json({ error: "Empty code cannot be executed." });
  }
  if (input === undefined) {
    return res.status(400).json({ error: "Input is required." });
  }
  const {codeFilePath,inPath} = await generateCodeFile(lang, code,input, 1, 1);
  try{
      const output = await executeCpp(codeFilePath,1,inPath);
      
      res.send(output);

  }catch(error){
    res.status(500).json({"error" : error.stderr});

  }
  
});

module.exports = router;
