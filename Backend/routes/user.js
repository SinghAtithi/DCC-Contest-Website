const express = require("express");
const { verifySuperAdmin } = require("../middlewares/verifyToken");
const updateRolesController = require("../controllers/user/updateRoles");
const searchUserController = require("../controllers/user/searchUser");

const router = express.Router();

// Route to search for users
router.post("/search", searchUserController);

// Route to update roles of a user
router.post("/roles", verifySuperAdmin, updateRolesController);

module.exports = router;
