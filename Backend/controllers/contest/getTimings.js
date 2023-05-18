const Contest = require("../../models/contest");
const moment = require("moment");
async function getTimingsController(req, res) {
  const { username } = req.user;
  const { contest_id } = req.params;
  try {
    const contest = await Contest.findOne(
      { contest_id: contest_id, registrations: { $in: [username] } },
      {
        start_time: 1,
        end_time: 1,
        ques_ids: 1,
        launched: 1,
        contest_name: 1,
      }
    );

    
    if (contest && contest.launched) {
      const currentTime = moment();
      const contestStartTime = moment(contest.start_time, "DD/MM/YYYY HH:mm");
      const contestEndTime = moment(contest.end_time, "DD/MM/YYYY HH:mm");

      if (currentTime.isBetween(contestStartTime, contestEndTime)) {
        res.status(200).json({
          start_time: contest.start_time,
          end_time: contest.end_time,
          ques_ids: contest.ques_ids,
        });
      }
      else{
        res.status(403).send("Contest is not running");
      }
      
    } else {
      res.status(404).send("Contest not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = getTimingsController;
