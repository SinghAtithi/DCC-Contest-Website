const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const ImageKit = require("imagekit");
const uuid = require("uuid");
const { generateLoginToken } = require("../utils/generateToken.js");
const { verifyToken } = require("../middlewares/verifyToken.js");
const {
  generateVerificationToken,
} = require("../utils/generateVerificationToken.js");
const { EmailQueue } = require("../queue/EmailQueue/index.js");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { BASE_URL } = require("../utils/constants.js");

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      email,
      password,
      confirm_password,
      username,
      githubURL = "",
      linkedinURL = "",
      codeforcesURL = "",
      codechefURL = "",
      bio = "",
    } = req.body;
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
                    EmailQueue.add({
                      receiver: user.email,
                      message: {
                        subject: "DCC : Verify your account",
                        template: "confirmation",
                        context: {
                          username: user.name,
                          confirmation_link: `${BASE_URL}/confirmEmail/${verification_token}`,
                        },
                      },
                    })
                      .then(() => {
                        console.log("Added to email queue");
                        res.status(200).send({
                          message:
                            "Successfully registered. Please confirm your email before further process.",
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
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { loginId, password } = req.body;
    if (loginId) {
      if (password) {
        let user;
        if (
          loginId.includes("@") &&
          loginId.includes(".", loginId.indexOf("@"))
        ) {
          user = await User.findOne(
            { email: loginId },
            "username password role profile_pic confirmed_email"
          ).exec();
        } else {
          user = await User.findOne(
            { username: loginId },
            "username password role profile_pic confirmed_email"
          ).exec();
        }
        if (user) {
          if (user.confirmed_email) {
            const valid = await bcrypt.compare(password, user.password);

            if (valid) {
              const token = generateLoginToken(
                user._id,
                user.role,
                user.profile_pic,
                user.username
              );
              res.status(200).send({
                token: token,
                role: user.role,
                profile_pic: user.profile_pic,
                username: user.username,
              });
            } else {
              res.status(400).send({ error: "Incorrect Password." });
            }
          } else {
            res
              .status(400)
              .send({ error: "Please confirm your email before login." });
          }
        } else {
          res.status(400).send({ error: "Invalid User Name or email." });
        }
      } else {
        res.status(400).send({ error: "Password is compulsory." });
      }
    } else {
      res.status(400).send({ error: "username or email is compulsory." });
    }
  } catch (error) {
    res.status(500).send({ error: "Something went wrong." });
  }
});

router.get("/verifyToken", verifyToken, (req, res) => {
  // console.log(req.user);
  res
    .status(200)
    .send({ role: req.user.role, profile_pic: req.user.profile_pic });
});

router.get("/imagekitAuth", async (req, res) => {
  try {
    console.log("Yeah Reached here");
    var imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: "https://ik.imagekit.io/pqymxdgbi/Code-DCC",
    });

    const token = req.query.t || uuid.v4();
    const expiration =
      req.query.expire || parseInt(Date.now() / 1000) + 60 * 10; // Default expiration in 10 mins

    const signatureObj = imagekit.getAuthenticationParameters(
      token,
      expiration
    );

    res.status(200).send(signatureObj);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.post("/verifyEmail", async (req, res) => {
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

        }
        else {
          res.status(400).send({ error: "This link has already been used and your account has been verified." });
        }
      } else {
        res.status(400).send({ error: "User not found." });
      }
    } catch (error) {
      res.status(400).send({ error: "Invalid Token." });
    }
  } else {
    res.status(400).json({ error: "Invalid attempt to verify email." });
  }
});

router.post("/forgotPassword", async (req, res) => {
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
});

router.post("/forgotPasswordEmail", async (req, res) => {
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
});

router.post("/resendConfirmationEmail", async (req, res) => {
  const { email } = req.body;
  if (email) {
    if (email.includes("@") && email.includes(".", email.indexOf("@"))) {
      const user = await User.findOne({ email: email }, "username name confirmed_email").exec();
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
        }
        else {
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
});

module.exports = router;
