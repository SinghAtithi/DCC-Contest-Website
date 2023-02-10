const express = require("express");
const Contest = require("../models/contest.js");
const router = express.Router();

router.post("/create", (req, res) => {
  const { contestName, contestId, ques_ids, start_time, end_time } = req.body;
  try {
    console.log(req.body);
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
