const moment = require("moment");
const Contest = require("../../models/contest");
const Question = require("../../models/question");

async function updateContestController(req, res) {
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
              { ques_id: ques_ids[i].ques_id },
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
}

module.exports = updateContestController;
