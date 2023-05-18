const moment = require("moment");
const Contest = require("../../models/contest");
const Question = require("../../models/question");

async function createContestController(req, res) {
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
}

module.exports = createContestController;
