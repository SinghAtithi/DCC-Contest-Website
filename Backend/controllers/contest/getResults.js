const Contest = require("../../models/contest");

async function getResultsController(req, res) {
  const { contest_id } = req.params;

  try {
    const contest = await Contest.findOne({contest_id : contest_id, draft:false, launched:true},"contest_name result ques_ids").sort({ "result.points": -1 });

    if (contest) {
      res.status(200).json({ contest: contest });
    } else {
      res.status(404).send("Contest Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = getResultsController;
