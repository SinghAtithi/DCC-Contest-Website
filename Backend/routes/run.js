const express = require("express");
const { generateCodeFile } = require("../utils/generateCodeFile.js");
const { executeCpp }= require("../utils/executeCpp.js");

const router = express.Router();

router.post("/run", async (req, res) => {
  const { lang = "cpp", code } = req.body;

  if (code === undefined) {
    return res.status(400).json({ error: "Empty Code Body" });
  }
  const path = await generateCodeFile(lang, code, 1, 1);
  try{
      const output = await executeCpp(path,1);
      res.send(output);

  }catch(error){
    res.status(500).json({"error" : error.stderr});

  }
  
});

module.exports = router;
