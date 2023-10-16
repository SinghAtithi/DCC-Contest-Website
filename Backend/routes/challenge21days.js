const express = require("express");
const Question21 = require("../models/question21");
const Question = require("../models/question.js");
const populateDataToOriginalServer = require("../controllers/question/populateDataToOriginalServer.js");
const router = express.Router();
const leaderBoard = require("../models/leaderBoard.js");
const user = require("../models/user.js");
const isDataMounted = new Array(22).fill(false);
const queBank = require("../utils/queBank");
const calculateCurrDays = require("../utils/calculateCurrDays.js");

router.get("/getQuestion", async (req, res) => {
  const requiredAttributes = ["name", "ques_id", "day"];
  try {
    const questions = await Question21.find().select(requiredAttributes).exec();
    const day = calculateCurrDays(); //day is 1-indexed
    questions.forEach((question) => {
      question.ques_id = question.ques_id.replace("21days", "CPZEN");
      if (question.day == day) {
        question.isToday = true;
      } else {
        question.isToday = false;
      }
    });
    console.log(questions);
    //{[name,ques_id,day,isToday]}
    if (isDataMounted[day] === false) {
      let dayToSearch = calculateCurrDays().toString();
      if (dayToSearch.length === 1) {
        dayToSearch = "0" + dayToSearch;
      }
      const isQuestionPresentInDB = await Question.findOne({
        ques_id: `CPZEN_${dayToSearch}`,
      }).exec();
      if (!isQuestionPresentInDB) {
        const resultMounted = await populateDataToOriginalServer();
        console.log("result from populated function ", resultMounted);
        if (resultMounted.status !== 200) {
          throw new Error("Error in mounting data");
        }
        console.log("data mounted");
      } else {
        console.log("server restarted but data already mounted");
      }
      isDataMounted[day] = true;
    }
    console.log("already mounted");
    //{status:200,questions:[{name,ques_id,day,isToday}]}
    // {status:200,body:{questions:[{name,ques_id,day,isToday}],message:"OKAY"}}
    res.status(200).json({ message: "OKAY", questions: questions });
  } catch (err) {
    //{status:500,message:err,questions:[{name,ques_id,day,isToday}]}
    console.log(err);
    res.status(500).json({ message: err, questions: [] });
    //questions=req.body.questions
  }
});

router.post("/userDetails", async (req, resp) => {
  //req.body.username
  //req.body.name
  const username = req.body.username;

  if (username == null) {
    resp.status(400).json({ message: "username or name not provided" });
    return;
  }
  try {
    console.log("hello hi");
    const userData = await user
      .find({ username: username }, "codeforcesURL name questions_solved")
      .exec();
    if (userData.length === 0) {
      //user not found
      resp.status(400).json({ message: "user not found" });
      return;
    }

    //update the search parameter
    let currentDayCalculated = calculateCurrDays().toString();
    if (currentDayCalculated.length === 1) {
      currentDayCalculated = "0" + currentDayCalculated;
    }
    const searchParameter = "CPZEN_" + currentDayCalculated;

    const currentData = await leaderBoard
      .findOne({ username: username })
      .exec();
    let scoreNow = currentData ? currentData.totalScore : 0;
    let heatMap = currentData ? currentData.heatMap : "0".repeat(22);
    const codeforcesURL = userData[0].codeforcesURL;
    const name = userData[0].name;

    // console.log("\n\n\n",userData[0].questions_solved);
    // console.log(currentData);
    if (
      heatMap[calculateCurrDays()] == "0" &&
      userData[0].questions_solved.includes(searchParameter)
    ) {
      const heatMapArray = heatMap.split("");
      heatMapArray[calculateCurrDays()] = "1";
      heatMap = heatMapArray.join("");
      scoreNow += 1;
    }
    // console.log(heatMap);
    // console.log(userData);
    const data = await leaderBoard
      .updateOne(
        { username: username },
        {
          $set: {
            totalScore: scoreNow,
            heatMap: heatMap,
            codeforcesURL: codeforcesURL,
            username: username,
            name: name,
          },
        },
        { upsert: true }
      )
      .exec();
    // console.log(data);
    resp.status(200).json({
      data: {
        headMap: heatMap,
        point: scoreNow,
        codeforcesURL: codeforcesURL,
      },
    });
  } catch (err) {
    console.log(err.message);
    resp.status(500).json({
      data: {
        headMap: "0".repeat(22),
        point: 0,
        codeforcesURL: "https://codeforces.com/profile",
      },
    });
  }
  //{status:200,body{data:{headMap:"101111100",point:0}}}
  //data=req.body.data
  //headMap=data.headMap
  //point=data.point
});

router.get("/leaderBoard", async (req, resp) => {
  //[{status:200,data:{username:"",name:"",point:"",codeForces:""}}]
  try {
    const leaderBoardData = await leaderBoard
      .find()
      .sort({ totalScore: -1 })
      .exec();
    resp.status(200).json({ data: leaderBoardData });
    //[{name,username,codeForces,totalScore,heatMap}]
  } catch (err) {
    resp.status(500).json({ data: {} });
  }
  //data=req.body.data
  //data=[{name,username,codeForces,totalScore,heatMap}]
  //ref=model of leaderBoard

  //`process.env.baseurl/21days/leaderBoard`
});

router.post("/topicCodeForces", async (req, res) => {
  try {
    const username = req.body.username;
    console.log(queBank);
    console.log(username);
    // const queBank = req.body.queBank;
    const today = new Date(); // Get the current date
    const startDate = new Date("2023-10-18"); // Start date for the challenge
    const curDay = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)); // Calculate the difference in days

    const codeforcesUrl = `https://codeforces.com/api/user.status?handle=${username}&from=1&count=500`;
    const response = await fetch(codeforcesUrl, { method: "GET" });
    const jsonObject = await response.json();
    const status = jsonObject.result;

    let binaryString = "0";

    for (let i = 0; i < curDay; i++) {
      const questionUrl = queBank[i];
      const contestId = questionUrl.match(/contest\/(\d+)/)[1];
      const code = questionUrl.slice(-1);

      let problemSolved = false;
      for (const submission of status) {
        if (submission.creationTimeSeconds < startDate.getTime() / 1000) break;
        if (
          submission.contestId == parseInt(contestId) &&
          submission.problem.index == code &&
          submission.verdict == "OK"
        ) {
          problemSolved = true;
          break;
        }
      }
      binaryString += problemSolved ? "1" : "0";
    }
    for (let i = curDay; i < 21; i++) binaryString += "0";
    console.log("\n\n\n\n hellolo- ", { binaryString, success: true }, "\n\n\n");
    res.status(200).send({ binaryString, success: true });
  } catch (err) {
    console.log("Error: " + err);
    res.status(400).send({ message: "Problem Status Failed", success: false });
  }
});

module.exports = router;
