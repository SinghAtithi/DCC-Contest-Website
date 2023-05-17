const express = require("express");
const Contest = require("../models/contest.js");
const Question = require("../models/question.js");
const User = require("../models/user.js");
const router = express.Router();
const moment = require("moment");
const { verifyAdmin } = require("../middlewares/verifyToken.js");

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

router.get("/collabAndQues", verifyAdmin, async (req, res) => {
  const user = req.user;

  try {
    const collaborators = await User.find(
      { role: { $in: ["admin", "super_admin"] } },
      "username"
    ).exec();
    const ques_ids = await Question.find({ is_draft: false }, "ques_id").exec();

    res.status(200).send({ collaborators, ques_ids });
  } catch (err) {
    console.log("From /contest/collabAndQues", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Search for contests from admin view contest page
router.post("/search", verifyAdmin, async (req, res) => {
  const user = req.user;
  const {
    searchFilter,
    searchString,
    selectString = "contest_name contest_id start_time end_time ques_ids collaborators creator",
  } = req.body;
  try {
    let search_params = { creator: user.username };

    if (searchFilter == 0)
      search_params.contest_name = { $regex: searchString, $options: "i" };
    else if (searchFilter == 1)
      search_params.contest_id = { $regex: searchString, $options: "i" };
    else if (searchFilter == 2)
      search_params.is_draft =
        String(searchString).toLowerCase() === "true" ? true : false;

    console.log(search_params);
    const allContests = await Contest.find(search_params, selectString).exec();

    res.status(200).send({ data: allContests });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// To create a new contest
router.post("/create", verifyAdmin, async (req, res) => {
  const user = req.user;
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

// To update a contest
router.post("/update", verifyAdmin, async (req, res) => {
  const user = req.user;
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

    console.log(update);

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
router.delete("/delete/:contest_id", verifyAdmin, async (req, res) => {
  const user = req.user;
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

// Get a particular contest
router.get("/:contest_id", verifyAdmin, async (req, res) => {
  const { contest_id } = req.params;
  try {
    const contest = await Contest.findOne({ contest_id: contest_id });
    if (contest) {
      res.status(200).json(contest);
    } else {
      res.status(404).send("Contest not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Launch or cancel a contest
router.put("/launch", verifyAdmin, async (req, res) => {
  const user = req.user;
  const { type, contest_id } = req.body;

  try {
    const contest = await Contest.findOne(
      { contest_id: contest_id, creator: user.username },
      "start_time ques_ids launched is_draft end_time"
    );
    console.log(contest);
    if (contest) {
      if (type === "launch") {
        if (!contest.launched) {
          if (contest.ques_ids && contest.ques_ids.length !== 0) {
            const startMoment = moment(contest.start_time, "DD/MM/YYYY HH:mm");
            const now = moment();

            if (startMoment.isAfter(now)) {
              await Contest.findOneAndUpdate(
                { contest_id: contest_id, creator: user.username },
                { launched: true, is_draft: false }
              ).exec();
              res.status(200).send("Contest successfully launched");
            } else {
              res.status(400).send([
                {
                  error_field: "start_time",
                  error_message: `Start time of contest has been passed.`,
                },
              ]);
            }
          } else {
            res.status(400).send([
              {
                error_field: "ques_ids",
                error_message: `Contest with contest id ${contest_id} has no problems added.`,
              },
            ]);
          }
        } else {
          res.status(400).send([
            {
              error_field: "launched",
              error_message: `Contest with contest id ${contest_id} has already been launched.`,
            },
          ]);
        }
      }

      // To cancel contest
      else {
        if (contest.launched) {
          const endMoment = moment(contest.end_time, "DD/MM/YYYY HH:mm");
          const now = moment();

          if (endMoment.isAfter(now)) {
            await Contest.findOneAndUpdate(
              { contest_id: contest_id, creator: user.username },
              { launched: false, is_draft: true }
            ).exec();

            await contest.save();
            res.status(200).send("Contest successfully cancelled");
          } else {
            res.status(400).send([
              {
                error_field: "end_time",
                error_message: `Contest has already been completed.`,
              },
            ]);
          }
        } else {
          res.status(400).send([
            {
              error_field: "launched",
              error_message: `Contest with contest id ${contest_id} has not been launched.`,
            },
          ]);
        }
      }
    } else {
      res.status(400).send([
        {
          error_field: "contest_id",
          error_message: `Contest with contest id ${contest_id} not found.`,
        },
      ]);
    }
  } catch (err) {}
});

module.exports = router;
