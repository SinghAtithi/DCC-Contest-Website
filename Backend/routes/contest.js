const express = require("express");
const Contest = require("../models/contest.js");
const Question = require("../models/question.js");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    Contest.find({}, (error, result) => {
      if (error) {
        res.status(404).json({ error: error });
      } else {
        console.log(result);
        if (result.length === 0) {
          res.status(404).send({ error: "No Contest" });
        } else {
          res.status(200).json(result);
        }
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/create", async (req, res) => {
  const { contestName, contestID, ques_ids, startTime, endTime } = req.body;
  try {
    console.log(req.body);
    const contest = await new Contest({
      contestName: contestName,
      contestId: contestID,
      ques_ids: ques_ids,
      startTime: startTime,
      endTime: endTime,
    }).save();

    for (var i = 0; i < ques_ids.length; i++) {
      await Question.findOneAndUpdate(
        { ques_id: ques_ids[0] },
        { displayAfter: startTime }
      );
    }

    res.status(200).send("Success");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
