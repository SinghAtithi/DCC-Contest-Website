const User = require("../../models/user");
const { generateLoginToken } = require("../../utils/generateToken");

async function updateUserController(req, res) {
  const user = req.user;
  const { update_field, new_value } = req.body;
  try {
    // if both are present
    console.log(update_field, new_value);
    if (update_field && new_value) {
      const update_field_list = [
        "name",
        "githubURL",
        "linkedinURL",
        "codeforcesURL",
        "codechefURL",
        "bio",
        "profile_pic",
      ];
    //   if it a avalid update_field
      if (update_field_list.includes(update_field)) {
        const updatedUser = await User.findOneAndUpdate(
          { username: user.username },
          { [update_field]: new_value } , {new:true}
        ).exec();

        const token = generateLoginToken(updatedUser._id, updatedUser.role, updatedUser.profile_pic, updatedUser.username);
        return res.status(200).send({ message: "Successfully Updated." , token:token});
      } else return res.status(400).send({ error: "Invalid update_field" });
    }
    // When either update_field or new_value is missing
    else return res.status(400).send({ error: "Missing required values." });
  } catch (error) {
    console.log("From updateUserController - ", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = updateUserController;
