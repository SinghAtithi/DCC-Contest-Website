const express = require("express");
const Question21 = require("../models/question21");
const populateDataToOriginalServer = require("../controllers/question/populateDataToOriginalServer.js");
const router = express.Router();
const leaderBoard = require("../models/leaderBoard.js");
const user = require("../models/user.js");
const isDataMounted = new Array(22).fill(false);

router.get("/getQuestion", async (req, res) => {
  const requiredAttributes = ["name", "ques_id","day"];
  try {
    const questions = await Question21.find().select(requiredAttributes).exec();
    const day = new Date().getDate() - 11; //day is 1-indexed
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
      const resultMounted = await populateDataToOriginalServer();
      console.log("result from populated function ",resultMounted);
      if (resultMounted.status !== 200) {
        throw new Error("Error in mounting data");
      }
      isDataMounted[day] = true;
      console.log("data mounted");
    }
    console.log("already mounted")
    //{status:200,questions:[{name,ques_id,day,isToday}]}
    // {status:200,body:{questions:[{name,ques_id,day,isToday}],message:"OKAY"}}
    res.status(200).json({ message: "OKAY", questions: questions });
  } catch (err) {
    //{status:500,message:err,questions:[{name,ques_id,day,isToday}]}
    console.log(err);
    res.status(500).json({ message: err, questions: [] });
  }
});

router.post("/userDetails", async (req, resp) => {
  //req.body.userName
  //req.body.name
  const name = req.body.name;
  const userName = req.body.userName;

  if (name == null || userName == null) {
    resp.status(400).json({ message: "userName or name not provided" });
    return;
  }
  try {
    const userData = await user
      .find({ userName: userName }, { codeforcesURL, questions_solved })
      .exec();

    if (userData.length === 0) {
      //user not found
      resp.status(400).json({ message: "user not found" });
      return;
    }

    const searchParameter = "CPZEN_" + (new Date().getDate() - 11).toString();

    const currentData = await leaderBoard
      .findOne({ userName: userName })
      .exec();
    let scoreNow = currentData ? currentData.totalScore : 0;
    let heatMap = currentData ? currentData.heatMap : "0".repeat(22);
    const codeForcesURL = userData[0].codeforcesURL;

    if (userData[0].questions_solved.includes(searchParameter)) {
      const heatMapArray = heatMap.split("");
      heatMapArray[new Date().getDate() - 11] = "1";
      heatMap = heatMapArray.join("");
      scoreNow += 1;
    }
    const data = await leaderBoard
      .updateOne(
        { userName: userName },
        {
          $set: {
            totalScore: scoreNow,
            heatMap: heatMap,
            codeforcesURL: codeForcesURL,
            userName: userName,
            name: name,
          },
        },
        { upsert: true }
      )
      .exec();

    resp.status(200).json({ data: { headMap: heatMap, point: scoreNow } });
  } catch (err) {
    resp.status(500).json({ data: { headMap: "0".repeat(22), point: 0 } });
  }
  //{status:200,body{data:{headMap:"101111100",point:0}}}
});

router.get("/leaderBoard", async (req, resp) => {
  //[{status:200,data:{userName:"",name:"",point:"",codeForces:""}}]
  try {
    const leaderBoardData = await leaderBoard
      .find()
      .sort({ totalScore: -1 })
      .exec();
    resp.status(200).json({ data: leaderBoardData });
    //[{name,userName,codeForces,totalScore}]
  } catch (err) {
    resp.status(500).json({ data: {} });
  }
});

module.exports = router;
