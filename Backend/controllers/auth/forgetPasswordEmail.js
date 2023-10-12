const { sendEmail } = require("../../email/sendEmail");
const User = require("../../models/user");
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
          console.log(user)
          if (user.confirmed_email) {
            var otp = Math.floor(100000 + Math.random() * 900000);

            user.OTP = otp;
            const OTP_validity = moment().add(5, "minutes");
            user.OTP_validity = OTP_validity;

            await user.save();

            try {
              const messageBody = {
                subject: "DCC : Reset Password",
                template: "reset_password",
                context: {
                  name: user.name,
                  username: user.username,
                  otp: otp,
                },
              }
              await sendEmail(email, messageBody);
              return res.status(200).send({
                message: "Successfully sent the email.",
              });
            }
            catch (err) {
              return res.status(401).json({
                error: "Could not send the email.",
              });
            }

            // EmailQueue.add({
            //   receiver: email,
            //   message: {
            //     subject: "DCC : Reset Password",
            //     template: "reset_password",
            //     context: {
            //       name: user.name,
            //       username: user.username,
            //       otp: otp,
            //     },
            //   },
            // })
            //   .then(() => {
            //     console.log("Added to email queue from role update");
            //     res.status(200).send({
            //       message: "Successfully sent the email.",
            //     });
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //     res.status(405).send({
            //       error:
            //         "Could not send the email. Please re-initiate the process of sending email.",
            //     });
            //   });

          } else {
            res.status(401).json({
              error: "Please confirm your email before any further operations.",
            });
          }
        } else {
          res
            .status(404)
            .json({ error: "You are not registered. Please register first." });
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
