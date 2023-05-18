const User = require("../../models/user");
const { EmailQueue } = require("../../queue/EmailQueue");
const { BASE_URL } = require("../../utils/constants");

async function forgetPasswordEmailController(req, res) {
  const { email } = req.body;
  if (email) {
    if (email.includes("@") && email.includes(".", email.indexOf("@"))) {
      const user = await User.findOne({ email: email }, "username name").exec();
      if (user) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
          time: Date(),
          email: email,
        };

        const verification_token = jwt.sign(data, jwtSecretKey, {
          expiresIn: "10m",
        });

        EmailQueue.add({
          receiver: email,
          message: {
            subject: "DCC : Reset Password",
            template: "reset_password",
            context: {
              name: user.name,
              username: user.username,
              confirmation_link: `${BASE_URL}/forgotPassword/${verification_token}`,
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
          .json({ error: "You are not registered. Please register first." });
      }
    } else {
      res.status(400).json({ error: "Please provide a valid email." });
    }
  } else {
    res.status(400).json({ error: "Email is required." });
  }
}

module.exports = forgetPasswordEmailController;
