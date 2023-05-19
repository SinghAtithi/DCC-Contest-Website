const Submission = require("../../models/submission");
const moment = require("moment");

async function getAllSubmissionsController(req, res) {
  const user = req.user;
  const { username } = req.params;

  console.log("user :", user);
  console.log("username :", username);

  try {
    if (user && user.username === username) {
      // The token and query params is of same user. Give all submissions without checking display_after
      const submissions = await Submission.find(
        { username: username },
        "ques_id ques_name verdict time_stamp time_taken code error"
      )
        .sort({ time_stamp: -1 })
        .exec();
      res.status(200).send(submissions);
    } else {
      // either token is invalid or is of different user as comapred to req.params
      if (username) {
        const currTime = moment(new Date()).utcOffset("+5:30");
        const submissions = await Submission.find(
          { username: username, display_after: { $lt: currTime } },
          "ques_id ques_name verdict time_stamp time_taken code error"
        )
          .sort({ time_stamp: -1 })
          .exec();
        res.status(200).send(submissions);
      } else {
        res.status(404).send("Username is required.");
      }
    }
  } catch (error) {
    console.log("In catch");
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = getAllSubmissionsController;
