const express = require("express");
const router = express.Router();

const Contest = require("../../models/contest");


router.get("/:contestId", async (req, res) => {
      const { contestId } = req.params;
      console.log(contestId);
      try {
            const contest = await Contest.findOne({ contestId: contestId });
            if (contest) {
                  res.status(200).json(contest);
            } else {
                  res.status(404).send("Contest not found");
            }
      } catch (error) {
            res.status(500).json(error);
      }
});

module.exports = router;