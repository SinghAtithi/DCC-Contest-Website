const jwt = require("jsonwebtoken");
const User = require("../../models/user");


async function verifyEmailController(req, res){
    const { token } = req.body;
    if (token) {
      try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne(
          { _id: verified.userId },
          "confirmed_email"
        ).exec();
        if (user) {
          if (!user.confirmed_email) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: user._id },
              { confirmed_email: true },
              { new: true }
            ).exec();
            res.status(200).send({ message: "Successfully Verified." });
          } else {
            res
              .status(403)
              .send({
                error:
                  "This link has already been used and your account has been verified.",
              });
          }
        } else {
          res.status(404).send({ error: "User not found." });
        }
      } catch (error) {
        res.status(400).send({ error: "Invalid Token." });
      }
    } else {
      res.status(400).json({ error: "Invalid attempt to verify email." });
    }
  }

  module.exports = verifyEmailController;