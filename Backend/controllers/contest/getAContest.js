// Route is - /contest/:contest_id

const moment = require("moment");
const Contest = require("../../models/contest");

async function getAContestController(req, res) {
  const { username } = req.user;
  const { contest_id } = req.params;
  try {
    const contest = await Contest.findOne(
      { contest_id: contest_id ,  registrations: { $in: [username] }},
      {
        start_time: 1,
        end_time: 1,
        ques_ids: 1,
        launched: 1,
        contest_name: 1,
        result: {
          $elemMatch: { username: username },
        },
      }
    );

    if (contest && contest.launched) {
      const currentTime = moment();
      const contestStartTime = moment(contest.start_time, "DD/MM/YYYY HH:mm");
      const contestEndTime = moment(contest.end_time, "DD/MM/YYYY HH:mm");

      let solved = [];
      if(contest.result.length!==0) solved = contest.result[0].solved;

      if (currentTime.isBetween(contestStartTime, contestEndTime)) {
        res
          .status(200)
          .send({
            end_time: contest.end_time,
            ques_ids: contest.ques_ids,
            contest_name: contest.contest_name,
            solved: solved,
          });
      } else {
        if(currentTime.isAfter(contestEndTime)) res.status(403).send("Forbidden : Contest has ended");
        else res.status(403).send("Forbidden : Contest not started");
      }
    } else {
      res.status(404).send("Contest not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getAContestController;
