const express = require("express");
const Question21 = require("../models/question21");
const populateDataToOriginalServer=require("../controllers/question/populateDataToOriginalServer.js");
const router = express.Router();

const isDataMounted=new Array(22).fill(false);


router.get("/getQuestion", async (req, res) => {
  const requiredAttributes = [name, ques_id, day];
  try {
    const questions = await Question21.find().select(requiredAttributes).exec();
    const day = new Date().getDate() - 13;//day is 1-indexed
    questions.forEach((question) => {
      question.ques_id = question.ques_id.replace("21days", "CPZEN");
      if (question.day == day) {
        question.isToday = true;
      } else {
        question.isToday = false;
      }
    });
    //{[name,ques_id,day,isToday]}
    if (isDataMounted[day] === false) 
    {
      const resultMounted=await populateDataToOriginalServer();
      if (resultMounted.status !== 200)
      {
        throw new Error("Error in mounting data");
      }
      isDataMounted[day] = true;
    }
    res.status(200).json({ questions: questions });
  } catch (err) {
    res.status(500).json({ message: err, questions: [] });
  }
});
