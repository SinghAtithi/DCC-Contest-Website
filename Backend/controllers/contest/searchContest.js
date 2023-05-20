const Contest = require("../../models/contest");

async function searchContestController (req, res){
    const user = req.user;
    const {
      searchFilter,
      searchString,
      selectString = "contest_name contest_id start_time end_time ques_ids collaborators creator",
    } = req.body;
    try {
      let search_params = { $or: [
        { creator: user.username },
        { collaborators: { $in: [user.username] } }
      ] };
  
      if (searchFilter == 0)
        search_params.contest_name = { $regex: searchString, $options: "i" };
      else if (searchFilter == 1)
        search_params.contest_id = { $regex: searchString, $options: "i" };
      else if (searchFilter == 2)
        search_params.is_draft =
          String(searchString).toLowerCase() === "true" ? true : false;

      const allContests = await Contest.find(search_params, selectString).exec();
  
      res.status(200).send({ data: allContests });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  module.exports = searchContestController;