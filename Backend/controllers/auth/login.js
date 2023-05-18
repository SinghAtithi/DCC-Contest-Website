const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { generateLoginToken } = require("../../utils/generateToken");

async function loginController(req, res){
    try {
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
  }


module.exports = loginController;