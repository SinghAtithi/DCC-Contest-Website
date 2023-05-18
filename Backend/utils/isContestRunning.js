const express = require("express");
const moment = require("moment");
const Contest = require("../models/contest");
const { startSession } = require("mongoose");

// Check if a contest is running
const isContestRunning = async (contestId) => {
  try {
    const contest = await Contest.findOne(
      { contest_id: contestId },
      "start_time end_time ques_ids"
    );
    if (!contest) {
      return { verdict: false };
    } else {
      const currentTime = moment();
      const contestStartTime = moment(contest.start_time, "DD/MM/YYYY HH:mm");
      const contestEndTime = moment(contest.end_time, "DD/MM/YYYY HH:mm");

      if (currentTime.isBetween(contestStartTime, contestEndTime)) {
        return {
          verdict: true,
          start_time: contest.start_time,
          end_time: contest.end_time,
          ques_ids: contest.ques_ids,
        };
      } else {
        return { verdict: false };
      }
    }
  } catch (error) {
    return { verdict: false };
  }
};

module.exports = isContestRunning;
