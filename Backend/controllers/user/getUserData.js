const User = require("../../models/user");

async function getUserDataController(req, res) {
  const user = req.user;
  try {

    const curruser = await User.findOne({username: user.username},"name email githubURL linkedinURL codeforcesURL codechefURL bio").exec();
    return res.status(200).send(curruser);
  } catch (error) {
    console.log("From getUserDataController - ", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = getUserDataController;