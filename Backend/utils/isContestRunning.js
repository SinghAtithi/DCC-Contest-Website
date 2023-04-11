const express = require("express");
const moment = require("moment");
const Contest = require("../models/contest")

// Check if a contest is running
const isContestRunning = async (contestId) => {
      try {
            const contest = await Contest.findById(contestId);
            if (!contest) {
                  // throw new Error("Contest not found");
                  return false;
            }
            else {

                  const currentTime = moment();
                  const contestStartTime = moment(contest.start_time);
                  const contestEndTime = moment(contest.end_time);

                  if (currentTime.isBetween(contestStartTime, contestEndTime)) {
                        return true;
                  } else {
                        return false;
                  }
            }
      } catch (error) {
            console.error(error);
            return false;
      }
};

module.exports = isContestRunning;