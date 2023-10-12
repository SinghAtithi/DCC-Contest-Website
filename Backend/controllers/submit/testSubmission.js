const axios = require("axios");
const COMPILER_API = process.env.COMPILER_API;

const createTestSubmission = async (req, res) => {
  console.log(COMPILER_API);
  try {
    const { code, language: lang, ques_id, ques_name } = req.body;
    console.log(req.body);
    const { username } = req.user;

    const data = {
      code,
      lang,
      ques_name,
      username,
      ques_id, // This is mongodb id
      testing: true
    };

    console.log(data);

    const CompilerApi = `${COMPILER_API}/api/compileWithInput`;

    const compilerResponse = await axios.post(CompilerApi, data);

    console.log("compilerResponse", compilerResponse.data);

    res
      .status(200)
      .send({ submission_id: compilerResponse.data.submission_id });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = createTestSubmission;
