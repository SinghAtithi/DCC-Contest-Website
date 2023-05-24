const express = require("express");
const {
  verifySuperAdmin,
  verifyGeneralUser,
} = require("../middlewares/verifyToken");
const updateRolesController = require("../controllers/user/updateRoles");
const searchUserController = require("../controllers/user/searchUser");
const updateUserController = require("../controllers/user/updateUser");
const getUserDataController = require("../controllers/user/getUserData");

const router = express.Router();

// Route to search for users
router.post("/search", searchUserController);

// Route to update roles of a user
router.post("/roles", verifySuperAdmin, updateRolesController);

// Route to update user details
router.put("/update", verifyGeneralUser, updateUserController);

// Route to get user details for settings page
router.get("/data",verifyGeneralUser, getUserDataController);

module.exports = router;
