// Imports
const express = require("express");
const {
  verifyToken,
  verifyGeneralUser,
} = require("../middlewares/verifyToken.js");
const router = express.Router();

const registerController = require("../controllers/auth/register.js");
const loginController = require("../controllers/auth/login.js");
const verifyTokenController = require("../controllers/auth/verifyToken.js");
const imageKitController = require("../controllers/auth/imageKit.js");
const verifyEmailController = require("../controllers/auth/verifyEmail.js");
const forgetPasswordController = require("../controllers/auth/forgetPassword.js");
const forgetPasswordEmailController = require("../controllers/auth/forgetPasswordEmail.js");
const resendConfirmationEmailController = require("../controllers/auth/resendConfirmationEmail.js");

// Route to register a new user
router.post("/register", registerController);

// Route to login a user
router.post("/login", loginController);

// Route to verify a token (e.g., for authentication)
router.get("/verifyToken", verifyToken, verifyTokenController);

// Route to authenticate a user for ImageKit integration
router.get("/imagekitAuth", verifyGeneralUser, imageKitController);

// Route to verify an email
router.post("/verifyEmail", verifyEmailController);

// Route to handle forgot password requests
router.post("/forgotPassword", forgetPasswordController);

// Route to send forgot password email
router.post("/forgotPasswordEmail", forgetPasswordEmailController);

// Route to resend confirmation email
router.post("/resendConfirmationEmail", resendConfirmationEmailController);

module.exports = router;
