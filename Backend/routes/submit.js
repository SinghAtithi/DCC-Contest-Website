// submissionRouter.js

const express = require("express");
const { verifyGeneralUser } = require("../middlewares/verifyToken.js");
const createSubmission = require("../controllers/submissionController.js");
const router = express.Router();

router.post("/submit", verifyGeneralUser, createSubmission);

module.exports = router;
