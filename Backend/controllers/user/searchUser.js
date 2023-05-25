const User = require("../../models/user");

async function searchUserController(req, res) {
  const { searchFilter, searchString, selectString } = req.body;
  try {
    // if all three are present
    if (searchString && selectString) {
      searchParams = {};

      if (searchFilter == 0)
        searchParams.name = { $regex: searchString, $options: "i" };
      else if (searchFilter == 1)
        searchParams.username = { $regex: searchString, $options: "i" };
      else if (searchFilter == 2)
        searchParams.email = { $regex: searchString, $options: "i" };
      else return res.status(400).send({ error: "Invalid searchFilter." });

      const user = await User.find(searchParams, selectString).exec();
      return res.status(200).send(user);
    }
    // When either searchFilter or searchString or selectString is missing
    else return res.status(400).send({ error: "Missing required values." });
  } catch (error) {
    console.log("From searchUserController - ", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = searchUserController;
