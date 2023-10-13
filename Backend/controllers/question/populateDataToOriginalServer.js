const axios = require("axios");
const Question21 = require("../../models/question21");
const Question = require("../../models/question");
const { json } = require("body-parser");

async function populateDataToOriginalServer() {
  try {
    //make an axios request to signIn
    console.log("populating data to original server\n");
    // console.log(`${process.env.COMPILER_API}/auth/login\n`,process.env.LOGIN_ID,process.env.PASSWORD);
    const apiUrl = `${process.env.COMPILER_API}/auth/login`;
    const postData = {
      loginId: process.env.LOGIN_ID,
      password: process.env.PASSWORD,
    };
    // console.log(apiUrl, postData);
    const resp = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type to JSON
      },
      body: JSON.stringify(postData), // Convert the data to JSON format
    });

    if (!resp.ok) {
      throw new Error("Network response was not ok");
    }

    // const response = await axios.post(
    //   `${process.env.COMPILER_API}/auth/login`,
    //   {
    //     loginId: process.env.LOGIN_ID,
    //     password: process.env.PASSWORD,
    //   }
    // );
    // console.log(response.status,"\n\n");
    const response = await resp.json();
    // if (response.status !== 200) {

    //   console.log("error in logging in");
    //   throw new Error("Error in logging in");
    // }
    console.log("logged in successfully");
    //make a post request to add the question to original server
    const token = response.token;
    const role = response.role;
    const profilePic = response.profile_pic;
    const username = response.username;

    //fetch data from the 21 days challenge server
    const day = new Date().getDate() - 12;
    //look for lean()
    const questions = await Question21.find({ day: day }).exec();

    // console.log(questions);
    //add the questions to the original server
    if (questions.length === 0) {
      console.log("no questions found");
      throw new Error("No questions found");
    }
    const question = questions[0];
    question.ques_id = question.ques_id.replace("21days", "CPZEN");

    const response2 = await axios.post(
      `${process.env.COMPILER_API}/question/create`,
      question,
      {
        headers: {
          token: `${token}`,
          role: `${role}`,
          profile_pic: `${profilePic}`,
          username: `${username}`,
        },
      }
    );
    if (response2.status !== 200) {
      throw new Error("Error in adding question");
    }
    console.log("pushed question to original server");
    return { status: 200, message: "Question added successfully" };
  } catch (err) {
    console.log("error in populateDataToOriginalServer\n", err.message);
    return { status: 400, message: err.message };
  }
}

module.exports = populateDataToOriginalServer;
