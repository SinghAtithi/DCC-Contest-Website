const express = require("express");
const router = express.Router();

const getAllContests = require("./getAllContests");
const createContest = require("./createContest");
const updateContest = require("./updateContest");
const getContestById = require("./getContestById");
const deleteContest = require("./deleteContest");


router.use("/", getAllContests);
router.use("/create", createContest);
router.use("/update", updateContest);
router.use("/", getContestById);
router.use("/delete", deleteContest);

module.exports = router;