const moment = require("moment");
const Contest = require("../../models/contest");

async function getContestController(req, res) {
  try {
    const currDate = moment(new Date()).toString();
    const searchString = "contest_name contest_id start_time end_time";
    const upcoming = await Contest.find(
      { launched: true, is_draft: false, start_time: { $gt: currDate } },
      searchString + " registrations"
    ).exec();
    const ongoing = await Contest.find(
      {
        launched: true,
        is_draft: false,
        start_time: { $lte: currDate },
        end_time: { $gt: currDate },
      },
      searchString
    ).exec();
    const past = await Contest.find(
      { is_draft: false, launched: true, end_time: { $lte: currDate } },
      searchString + " ques_ids"
    ).exec();

    return res.status(200).json({ ongoing, upcoming, past });
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = getContestController;
