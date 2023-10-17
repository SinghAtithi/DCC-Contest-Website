const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { generateVerificationToken } = require("../../utils/generateVerificationToken");
// const { EmailQueue } = require("../../queue/EmailQueue");
const { BASE_URL } = require("../../utils/constants");
const { sendEmail } = require("../../email/sendEmail");


async function registerController(req, res) {
  try {
    const {
      name,
      email,
      password,
      confirm_password,
      user_name,
      githubURL = "",
      linkedinURL = "",
      codeforcesURL = "",
      codechefURL = "",
      bio = "",
    } = req.body;
    const username = user_name;
    if (name) {
      if (email) {
        if (email.includes("@") && email.includes(".", email.indexOf("@"))) {
          if (username) {
            if (!username.includes("@") && !username.includes(".")) {
              if (password) {
                if (confirm_password) {
                  if (password == confirm_password) {
                    const hashedPassword = await bcrypt.hash(
                      password,
                      Number(process.env.SECRET_PASSWORD_SALT_NUMBER)
                    );
                    const profile_pic = `https://ui-avatars.com/api/?name=${name}&size=128&background=random`;
                    const user = await new User({
                      name: name,
                      email: email,
                      password: hashedPassword,
                      username: username,
                      githubURL: githubURL,
                      linkedinURL: linkedinURL,
                      codeforcesURL: codeforcesURL,
                      codechefURL: codechefURL,
                      bio: bio,
                      profile_pic: profile_pic,
                    }).save();
                    console.log(user);

                    const verification_token = generateVerificationToken(
                      user._id
                    );

                    try {
                      const messageBody = {
                        subject: "DCC : Verify your account",
                        template: "confirmation",
                        context: {
                          username: user.name,
                          confirmation_link: `${BASE_URL}/confirmEmail/${verification_token}`,
                        },
                      }
                      // await sendEmail(email, messageBody);
                      return res.status(200).send({
                        message: "Successfully registered. Please confirm your email before further process.",
                      });
                    }
                    catch (err) {
                      return res.status(401).json({
                        error: "Could not send the email.",
                      });
                    }

                    // EmailQueue.add({
                    //   receiver: user.email,
                    //   message: {
                    //     subject: "DCC : Verify your account",
                    //     template: "confirmation",
                    //     context: {
                    //       username: user.name,
                    //       confirmation_link: `${BASE_URL}/confirmEmail/${verification_token}`,
                    //     },
                    //   },
                    // })
                    //   .then(() => {
                    //     console.log("Added to email queue");
                    //     res.status(200).send({
                    //       message:
                    //         "Successfully registered. Please confirm your email before further process.",
                    //     });
                    //   })
                    //   .catch((err) => {
                    //     console.log(err);
                    //     res.status(400).send({
                    //       error:
                    //         "Could not send the email. Please re-initiate the process of sending email.",
                    //       seq: 0,
                    //     });
                    //   });

                  } else {
                    res.status(400).send({
                      error: "Password and Confirm Password must match.",
                      seq: 4,
                    });
                  }
                } else {
                  res.status(400).send({
                    error: "Password Confirmation is compulsory.",
                    seq: 4,
                  });
                }
              } else {
                res
                  .status(400)
                  .send({ error: "Password is compulsory.", seq: 3 });
              }
            } else {
              res
                .status(400)
                .send({ error: "username cannot contain @ or .", seq: 2 });
            }
          } else {
            res.status(400).send({ error: "username is compulsory.", seq: 2 });
          }
        } else {
          res.status(400).send({ error: "Provide a valid email.", seq: 1 });
        }
      } else {
        res.status(400).send({ error: "Email is compulsory.", seq: 1 });
      }
    } else {
      res.status(400).send({ error: "Name is compulsory.", seq: 0 });
    }
  } catch (err) {
    console.log(err);
    let error = "Something went wrong.",
      seq = 0;
    if (err.code == 11000) {
      key = Object.keys(err.keyPattern);
      if (key[0] == "email") {
        error = "This email is already taken. Please use a different one.";
        seq = 1;
      } else if (key[0] == "username") {
        error = "This username is already taken. Please use a different one.";
        seq = 2;
      }
    }
    res.status(500).send({ error: error, seq: seq });
  }
};


module.exports = registerController;