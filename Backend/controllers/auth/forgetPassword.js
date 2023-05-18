const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function forgetPasswordController(req, res){
    const { token, password, confirm_password } = req.body;
    if (token) {
      try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ email: verified.email }).exec();
        if (user) {
          if (password) {
            if (confirm_password) {
              if (password === confirm_password) {
                const hashedPassword = await bcrypt.hash(
                  password,
                  Number(process.env.SECRET_PASSWORD_SALT_NUMBER)
                );
  
                const updatedUser = await User.findOneAndUpdate(
                  { _id: user._id },
                  { password: hashedPassword },
                  { new: true }
                ).exec();
                res.status(200).send({ message: "Successfully Updated." });
              } else {
                res
                  .status(400)
                  .send({ error: "Password and Confirm Password must match." });
              }
            } else {
              res.status(400).send({ error: "Confirm Password is compulsory." });
            }
          } else {
            res.status(400).send({ error: "Password is compulsory." });
          }
        } else {
          res.status(400).send({ error: "User not found." });
        }
      } catch (error) {
        res.status(400).send({ error: "Invalid Token." });
      }
    } else {
      res.status(400).json({ error: "Invalid attempt to reset password." });
    }
}

module.exports = forgetPasswordController;