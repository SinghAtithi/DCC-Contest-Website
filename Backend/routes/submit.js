const express = require("express");
const {
  verifyGeneralUser,
  verifyAdmin,
} = require("../middlewares/verifyToken.js");
const createSubmission = require("../controllers/submit/submissionController.js");
const createTestSubmission = require("../controllers/submit/testSubmission.js");
const router = express.Router();

// Route to create the submission in database and add it to queue for execution
// Route is "/question/submit"
router.post("/submit", verifyGeneralUser, createSubmission);

// Route to test a ques by admin
router.post("/submit/test", verifyAdmin, createTestSubmission);

module.exports = router;
