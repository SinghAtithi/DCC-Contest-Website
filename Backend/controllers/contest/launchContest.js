const moment = require("moment");
const Contest = require("../../models/contest");

async function launchContestController(req, res) {
    const user = req.user;
    const { type, contest_id } = req.body;
  
    try {
      const contest = await Contest.findOne(
        { contest_id: contest_id, creator: user.username },
        "start_time ques_ids launched is_draft end_time"
      );
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
    } catch (err) {
      res.status(00).send([
        {
          error_field: "server",
          error_message: "Internal Server Error",
        },
      ]);
    }
  }


  module.exports = launchContestController;