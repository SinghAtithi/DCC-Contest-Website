const User = require("../../models/user");
const { EmailQueue } = require("../../queue/EmailQueue");
const { BASE_URL } = require("../../utils/constants");
const moment = require("moment");
async function forgetPasswordEmailController(req, res) {
  const { email } = req.body;
  try {
    if (email) {
      if (email.includes("@") && email.includes(".", email.indexOf("@"))) {
        const user = await User.findOne(
          { email: email },
          "username name confirmed_email"
        ).exec();
        if (user) {
          if (user.confirmed_email) {
            var otp = Math.floor(100000 + Math.random() * 900000);

            user.OTP = otp;
            const OTP_validity = moment().utcOffset("+5:30").add(2,"minutes");
            user.OTP_validity = OTP_validity;

            user.save();

            EmailQueue.add({
              receiver: email,
              message: {
                subject: "DCC : Reset Password",
                template: "reset_password",
                context: {
                  name: user.name,
                  username: user.username,
                  otp: otp,
                },
              },
            })
              .then(() => {
                console.log("Added to email queue");
                res.status(200).send({
                  message: "Successfully sent the email.",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(405).send({
                  error:
                    "Could not send the email. Please re-initiate the process of sending email.",
                });
              });
          } else {
            res.status(401).json({
              error: "Please confirm your email before any further operations.",
            });
          }
        } else {
          res.status(404).json({ error: "You are not registered. Please register first." });
        }
      } else {
        res.status(400).json({ error: "Please provide a valid email." });
      }
    } else {
      res.status(400).json({ error: "Email is required." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = forgetPasswordEmailController;
