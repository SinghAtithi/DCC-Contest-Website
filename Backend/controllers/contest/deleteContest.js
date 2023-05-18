const Contest = require("../../models/contest");


async function deleteContestController(req, res){
    const user = req.user;
    const { contest_id } = req.params;
  
    try {
      const filter = {
        contest_id: contest_id,
        creator: user.username,
      };
  
      const deleted = await Contest.findOneAndDelete(filter);
  
      if (!deleted)
        res.status(500).send({ error: "Could not find the contest to delete." });
      else res.status(200).send({ message: "Deleted Successfully." });
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  module.exports = deleteContestController;