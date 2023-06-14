const express = require("express");
const {
  verifyAdmin,
  verifyGeneralUser,
} = require("../middlewares/verifyToken.js");
const getContestController = require("../controllers/contest/getContest.js");
const getCollaboratorsAndQuestionsController = require("../controllers/contest/getCollaboratorsAndQuestions.js");
const searchContestController = require("../controllers/contest/searchContest.js");
const createContestController = require("../controllers/contest/createContest.js");
const updateContestController = require("../controllers/contest/updateContest.js");
const deleteContestController = require("../controllers/contest/deleteContest.js");
const getAContestController = require("../controllers/contest/getAContest.js");
const getTimingsController = require("../controllers/contest/getTimings.js");
const launchContestController = require("../controllers/contest/launchContest.js");
const registerForContestController = require("../controllers/contest/registerForContest.js");
const getResultsController = require("../controllers/contest/getResults.js");
const { getContestStatisticsController } = require("../controllers/contest/getContestStatistics.jsx");

const router = express.Router();

// To get all the contest for the contest page.
router.get("/", getContestController);

// To get the probable collaborators and question ids for the create contest page
router.get("/collabAndQues", verifyAdmin, getCollaboratorsAndQuestionsController);

// To Search for contests by admin
router.post("/search", verifyAdmin, searchContestController);

// To create a new contest
router.post("/create", verifyAdmin, createContestController);

// To update a contest
router.post("/update", verifyAdmin, updateContestController);

// To delete a contest
router.delete("/delete/:contest_id", verifyAdmin, deleteContestController);

// To get a particular contest's ques_ids for the contest page
router.get("/:contest_id", verifyGeneralUser, getAContestController);

// To get timings and ques_ids of  particular contest only when contest is running
router.get("/timings/:contest_id", verifyGeneralUser, getTimingsController);

// TO launch or cancel a contest
router.put("/launch", verifyAdmin, launchContestController);

// To register for a contest
router.post("/register", verifyGeneralUser, registerForContestController);

// To get the results list
router.get("/results/:contest_id",getResultsController);

// To get the statistics of a contest
router.get("/statistics/:contest_id", verifyAdmin, getContestStatisticsController);

module.exports = router;
