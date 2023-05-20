const express = require("express");
const { verifyAdmin } = require("../middlewares/verifyToken.js");
const updateELORatingsController = require("../controllers/updateRatings/updateELORatings.js");
const router = express.Router();

// Route to update ratings after the contest
// Route is "/updateRating"
router.post("/updateRating", verifyAdmin, updateELORatingsController);

module.exports = router;