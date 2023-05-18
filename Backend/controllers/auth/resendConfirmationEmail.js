const User = require("../../models/user");
const { EmailQueue } = require("../../queue/EmailQueue");
const { BASE_URL } = require("../../utils/constants");
const {
  generateVerificationToken,
} = require("../../utils/generateVerificationToken");

async function resendConfirmationEmailController(req, res) {
  const { email } = req.body;
  if (email) {
    if (email.includes("@") && email.includes(".", email.indexOf("@"))) {
      const user = await User.findOne(
        { email: email },
        "username name confirmed_email"
      ).exec();
      if (user) {
        if (!user.confirmed_email) {
          const verification_token = generateVerificationToken(user._id);

          EmailQueue.add({
            receiver: email,
            message: {
              subject: "DCC : Resent Confirmation Email",
              template: "confirmation",
              context: {
                username: user.username,
                confirmation_link: `${BASE_URL}/confirmEmail/${verification_token}`,
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
              res.status(400).send({
                error:
                  "Could not send the email. Please re-initiate the process of sending email.",
                seq: 0,
              });
            });
        } else {
          res
            .status(400)
            .json({ error: "Your email has already been verified." });
        }
      } else {
        res
          .status(400)
          .json({ error: "You are not registered. Please register first." });
      }
    } else {
      res.status(400).json({ error: "Please provide a valid email." });
    }
  } else {
    res.status(400).json({ error: "Email is required." });
  }
}

module.exports = resendConfirmationEmailController;
