const Question21 = require("../../models/question21");
const Question = require("../../models/question");
const { json } = require("body-parser");

async function populateDataToOriginalServer() 
{
    try 
    {
        //make an axios request to signIn
        const response=await axios.post(process.env.LOGIN_URL,{
            loginId: process.env.LOGIN_ID,
            password:process.env.PASSWORD,
        });

        if(response.status!==200)
        {
            throw new Error("Error in logging in");
        }

        //make a post request to add the question to original server 
        const token=response.token;
        const role = response.role;
        const profilePic = response.profile_pic;
        const username = response.username;

        //fetch data from the 21 days challenge server
        const day = new Date().getDate() - 13;
        //look for lean()
        const questions=await Question21.find({day:day}).exec();
        //add the questions to the original server
        if (questions.length === 0) 
        {
            throw new Error("No questions found");
        }
        const question=questions[0];
        question.ques_id = question.ques_id.replace("21days", "CPZEN");

        const response2=await axios.post(process.env.ADD_QUESTION_URL,question,{
            headers:{
                token: `${token}`,
                role: `${role}`,
                profile_pic: `${profilePic}`,
                username: `${username}`,
            },
        });
        
        if (response2.status !== 200) 
        {
            throw new Error("Error in adding question");
        }
        return json({ status:200,message:"Question added successfully"})
        
    }
    catch (err) 
    {

        return json({ status:400,message:err.message})
    }
}

module.exports=populateDataToOriginalServer;