const User = require("../../models/user");
const { EmailQueue } = require("../../queue/EmailQueue");

async function updateRolesController(req, res) {
  // Get the username and new role from the body of the request
  const { username, new_role } = req.body;
  try {
    // if both username and new role are present
    if (username && new_role) {
      // roles array contain the valid roles
      const roles = ["end_user", "admin", "super_admin"];

      // If the new role is valid
      if (roles.includes(new_role)) {
        // Get the user whose role has to be updated
        const currUser = await User.findOne(
          { username: username },
          "email name role"
        ).exec();

        // If the user exists
        if (currUser) {
          // Update the role
          await User.findOneAndUpdate(
            { username: username },
            { role: new_role }
          ).exec();

          return res
            .status(200)
            .send({ message: "Successfully updated the role." });
        }
        // When username is not in the database
        else return res.status(404).send({ error: "User not found." });
      }
      // When new role is invalid
      else return res.status(400).send({ error: "Invalid Roles" });
    }
    // When either username or new role or both are missing
    else return res.status(400).send({ error: "Missing required values." });
  } catch (error) {
    // Catch any additional error
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = updateRolesController;
