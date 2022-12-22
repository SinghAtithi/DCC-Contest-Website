const express = require("express");
const Code = require("../models/code.js");
const { saveCodes } = require("../utils/save_codes.js");

const router = express.Router();

// Get all the attempts of code
router.get("/:ques_no", (req, res) => {
  try {
    Code.findOne(
      { ques_no: req.params.ques_no },
      "codes language",
      (error, result) => {
        if (error) {
          res.status(404).send({ error: error });
        } else {
          if (result === null || result === undefined) {
            res.status(404).send({ error: "Not Found" });
          } else {
            res.status(200).send(result);
          }
        }
      }
    );
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

// Get the code by attempt_no
router.get("/:ques_no/:attempt_no", (req, res) => {
  try {
    const attempt_no = req.params.attempt_no;
    Code.findOne({ ques_no: req.params.ques_no }, (error, result) => {
      if (error) {
        res.status(404).send({ error: error });
      } else {
        if (result === null || result === undefined) {
          res.status(404).send({ error: "Not Found" });
        } else if (attempt_no < 0 || attempt_no >= result.codes.length)
          res.status(404).send({ error: "Wrong Attempt number" });
        else {
          res.status(200).json({
            codes: result.codes[attempt_no],
            language: result.language,
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

module.exports = router;
