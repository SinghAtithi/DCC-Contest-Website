const express = require("express");
const { verifyGeneralUser } = require("../middlewares/verifyToken.js");
const createSubmission = require("../controllers/submissionController.js");
const router = express.Router();

// Route to create the submission in database and add it to queue for execution
// Route is "/question/submit"
router.post("/submit", verifyGeneralUser, createSubmission);

module.exports = router;
