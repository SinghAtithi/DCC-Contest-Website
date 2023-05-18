const Question = require("../../models/question");
const User = require("../../models/user");


async function getCollaboratorsAndQuestionsController(req, res) {
  try {
    const collaborators = await User.find(
      { role: { $in: ["admin", "super_admin"] } },
      "username"
    ).exec();
    const ques_ids = await Question.find({ is_draft: false }, "ques_id").exec();

    res.status(200).send({ collaborators, ques_ids });
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = getCollaboratorsAndQuestionsController;
