const express = require("express");
const moment = require("moment");
const Question = require("../models/question");
const User = require("../models/user");
const Contest = require("../models/contest");
const Submission = require("../models/submission");
const { passby } = require("../middlewares/verifyToken");
const router = express.Router();


// ---------- FORMAT -------------

// question_stats = [no_unsolved, no_solved]
// contest_stats = [no_contest_attempted, no_contest_unattempted, no_contest_unregistered]
// contest_stats_line = [{contest_id = contest_id, rating = rating}],
// submission_data = [{
//     _id: "1",
//     ques_name: "Add two numbers",
//     time_stamp: "24/01/2001 08:05",
//     verdict: "Passed"
// }]
router.get("/:username", async (req, res) => {
  const username = req.params.username;
  if (username) {
    try {
      const to_send = {};
      const currDate = moment();

      // Get the user with username
      const user = await User.findOne(
        { username: username },
        "current_rating max_rating rating_array questions_solved total_contests profile_pic"
      ).exec();

      if (user) {

        //  Get a list of all questions available to solve
        const questions = await Question.find({
          is_draft: false,
          assigned: true,
          display_after: { $lt: currDate },
        }).exec();

        const no_solved = user.questions_solved.length;
        var total = questions.length;

        const no_unsolved = total - no_solved;

        var no_contest_attempted = 0;
        var no_contest_unattempted = 0;

        for (var i = 0; i < user.total_contests.length; i++) {
          var contest_obj = user.total_contests[i];
          if (contest_obj.status == "attempted") no_contest_attempted = no_contest_attempted + 1;
          else no_contest_unattempted = no_contest_unattempted + 1;
        }


        //  Get the total no. of contests launched
        const contest = await Contest.find({ is_draft: false, launched: true }, "contest_id").exec();
        var total_no_of_contest = 0;
        if (contest) total_no_of_contest = contest.length;

        var no_contest_unregistered = total_no_of_contest - no_contest_attempted - no_contest_unattempted;


        //  Get the submission list of the user in descending order of time stamp
        const submissions = await Submission.find({ username: username, display_after: { $lt: currDate } }, "ques_name time_stamp verdict").sort({ time_stamp: -1 }).limit(10).exec();

        to_send.profile_pic = user.profile_pic;
        to_send.current_rating = user.current_rating;
        to_send.max_rating = user.max_rating;
        to_send.contest_stats_line = user.rating_array;
        to_send.question_stats = [no_unsolved, no_solved];
        to_send.contest_stats = [no_contest_attempted, no_contest_unattempted, no_contest_unregistered];
        to_send.submission_data = submissions;


        res.status(200).json(to_send);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Something went wrong." });
    }
  }
  else {
    res.status(400).json({ error: "Username is required" });
  }
});

module.exports = router;
