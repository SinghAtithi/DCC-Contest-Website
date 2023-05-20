const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");

async function forgetPasswordController(req, res) {
  const { otp, email, password, confirm_password } = req.body;

  try {
    if (otp) {
      const user = await User.findOne({ email: email }, "OTP OTP_validity").exec();
      if (user) {
        if (password) {
          if (confirm_password) {
            const currDate = moment().utcOffset("+5:30");
            if (user.OTP == otp && currDate.isBefore(moment(user.OTP_validity))) {
              if (password === confirm_password) {
                const hashedPassword = await bcrypt.hash(
                  password,
                  Number(process.env.SECRET_PASSWORD_SALT_NUMBER)
                );

                const updatedUser = await User.findOneAndUpdate(
                  { _id: user._id },
                  { password: hashedPassword , OTP_validity:currDate},
                  { new: true }
                ).exec();
                res.status(200).send({ message: "Successfully Updated." });
              } else {
                res
                  .status(400)
                  .send({ error: "Password and Confirm Password must match." });
              }
            } else {
              res
                .status(401)
                .send({ error: "Incorrect OTP" });
            }
          } else {
            res.status(400).send({ error: "Confirm Password is compulsory." });
          }
        } else {
          res.status(400).send({ error: "Password is compulsory." });
        }
      } else {
        res.status(404).send({ error: "User not found." });
      }
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = forgetPasswordController;
