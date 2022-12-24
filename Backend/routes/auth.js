const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

const router = express.Router();

router.post('/register', async (req,res)=>{
    try{
        const {name,email,password,confirmPassword,userName,githubURL="",linkedinURL="",codeforcesURL="",codechefURL="",bio=""} = req.body;
        if(name){
            if(email){
                if(userName){
                    if(password){
                        if(confirmPassword){
                            if(password==confirmPassword){
                                const hashedPassword = await bcrypt.hash(password,10);
                                // console.log(hashedPassword);
                                const user = await new User({name,email,password:hashedPassword,userName,githubURL,linkedinURL,codeforcesURL,codechefURL,bio}).save();

                                res.status(200).json("Successfully registered. Please confirm your email before further process."); 

                            }
                            else{
                                res.status(400).send({ error: "Password and Confirm Password must match." });
                            }
                        }
                        else{
                            res.status(400).send({ error: "Password Confirmation is compulsory." });
                        }

                    }
                    else{
                        res.status(400).send({ error: "Password is compulsory." });
                    }
                }
                else{
                    res.status(400).send({ error: "UserName is compulsory." });
                }
                
            }
            else{
                res.status(400).send({ error: "Email is compulsory." });
            }
            
        }
        else{
            res.status(400).send({ error: "Name is compulsory." });
        }
        
    }
    catch(error){
        res.status(500).send({ error: error });
    }
});

router.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(email){
            if(password){
                const user = await User.findOne({email:email},'password').exec();

                if(user){
                    const valid = await bcrypt.compare(password,user.password);

                    if(valid){
                        res.status(200).send("Logged In");
                    }
                    else{
                        res.status(400).send({ error: "Incorrect Password." });
                    }
                }
                else{
                    res.status(400).send({ error: "Invalid User Name." });
                } 
            }
            else{
                res.status(400).send({ error: "Password is compulsory." });
            }
        }
        else{
            res.status(400).send({ error: "Username is compulsory." });
        }

    }
    catch(error){
        res.status(500).send({ error: error });
    }
})



module.exports = router;