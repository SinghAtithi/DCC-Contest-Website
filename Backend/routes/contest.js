const express = require("express");
const Contest = require("../models/contest.js");
const Question = require("../models/question.js");
const router = express.Router();
const moment = require("moment");

// To get all the contest for the contests page.
router.get("/", async (req, res) => {
  try {
    Contest.find(
      { is_draft: false },
      "contest_name contest_id ques_ids start_time end_time",
      (error, result) => {
        if (error) {
          res.status(404).json({ error: error });
        } else {
          if (result.length === 0) {
            res.status(404).send({ error: "No Contest" });
          } else {
            res.status(200).json(result);
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

// To create a new contest
router.post("/create", async (req, res) => {
  const user = { username: "ritik_kaushal" };
  const {
    contest_name,
    contest_id,
    ques_ids,
    start_time,
    end_time,
    collaborators,
    is_draft,
  } = req.body;
  try {
    const startMoment = moment(start_time, "DD/MM/YYYY HH:mm");
    const endMoment = moment(end_time, "DD/MM/YYYY HH:mm");
    const now = moment();
    if (!startMoment.isSameOrAfter(now))
      return res.status(400).json([
        {
          error_field: "start_time",
          error_message: "Start time needs to be a future date",
        },
      ]);

    if (!endMoment.isAfter(startMoment))
      return res.status(400).json([
        {
          error_field: "start_time",
          error_message: "Start time cannot be after end time",
        },
      ]);

    await new Contest({
      contest_name: contest_name,
      contest_id: contest_id,
      ques_ids: ques_ids,
      start_time: start_time,
      end_time: end_time,
      creator: user.username,
      collaborators: collaborators,
      is_draft: is_draft,
    }).save();

    if (ques_ids) {
      for (var i = 0; i < ques_ids.length; i++) {
        await Question.findOneAndUpdate(
          { ques_no: ques_ids[i] },
          { display_after: start_time, assigned: true }
        );
      }
    }

    res.status(200).send("Contest created successfully.");
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).map((field) => ({
        error_field: field,
        error_message: err.errors[field].message,
      }));
      res.status(400).json(errors);
    } else if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message = `Duplicate ${field}: ${err.keyValue[field]}`;
      return res
        .status(400)
        .json([{ error_field: field, error_message: message }]);
    } else {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// To create a new contest
router.put("/update", async (req, res) => {
  const user = { username: "ritik_kaushal" };
  const {
    contest_id,
    ques_ids,
    start_time,
    end_time,
    collaborators,
    is_draft,
  } = req.body;

  try {
    const startMoment = moment(start_time, "DD/MM/YYYY HH:mm");
    const endMoment = moment(end_time, "DD/MM/YYYY HH:mm");
    const now = moment();

    if (!startMoment.isSameOrAfter(now))
      return res.status(400).json([
        {
          error_field: "start_time",
          error_message: "Start time needs to be a future date",
        },
      ]);

    if (!endMoment.isAfter(startMoment))
      return res.status(400).json([
        {
          error_field: "start_time",
          error_message: "Start time cannot be after end time",
        },
      ]);

    const filter = {
      contest_id: contest_id,
    };

    const update = {
      ques_ids: ques_ids,
      start_time: start_time,
      end_time: end_time,
      collaborators: collaborators,
      is_draft: is_draft,
    };

    const contest = await Contest.findOne(filter, "collaborators creator");
    if (contest) {
      if (
        contest.creator === user.username ||
        (contest.collaborators && contest.collaborators.includes(user.username))
      ) {
        await Contest.findOneAndUpdate(filter, update, { runValidators: true });

        if (ques_ids) {
          for (var i = 0; i < ques_ids.length; i++) {
            await Question.findOneAndUpdate(
              { ques_no: ques_ids[i] },
              { display_after: start_time, assigned: true }
            );
          }
        }
        res.status(200).send("Contest updated successfully.");
      } else res.status(400).send("Unauthorised to update.");
    } else res.status(400).send("Contest not found.");
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).map((field) => ({
        error_field: field,
        error_message: err.errors[field].message,
      }));
      res.status(400).json(errors);
    } else if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message = `Duplicate ${field}: ${err.keyValue[field]}`;
      return res
        .status(400)
        .json([{ error_field: field, error_message: message }]);
    } else if (err.name === "CastError") {
      return res.status(400).json([
        {
          error_field: err.path,
          error_message: err.reason.message,
        },
      ]);
    } else {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// To delete a contest
router.delete("/delete/:contest_id", async (req, res) => {
  const user = { username: "ritik_kaushal" };
  const { contest_id } = req.params;

  try {
    const filter = {
      contest_id: contest_id,
      creator: user.username,
    };

    const deleted = await Contest.findOneAndDelete(filter);

    if (!deleted)
      res.status(500).send({ error: "Could not find the contest to delete." });
    else res.status(200).send({ message: "Deleted Successfully." });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

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
