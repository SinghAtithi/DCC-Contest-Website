const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");



const router = express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body)
    try{
        const {name,email,password,confirmPassword,userName,githubURL="",linkedinURL="",codeforcesURL="",codechefURL="",bio=""} = req.body;
        if(name){
            if(email){
                if(email.includes("@") && email.includes(".",email.indexOf("@"))){
                    if(userName){
                        if(! userName.includes("@") && ! userName.includes(".")){
                            if(password){
                                if(confirmPassword){
                                    if(password==confirmPassword){
                                        const hashedPassword = await bcrypt.hash(password,Number(process.env.SECRET_PASSWORD_SALT_NUMBER));
                                        const user = await new User({ name, email, password: hashedPassword, userName, githubURL, linkedinURL, codeforcesURL, codechefURL, bio }).save();
                                        console.log(user)
    
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
                            res.status(400).send({ error: "USername cannot contain @ or ." });
                        }
                    }
                    else{
                        res.status(400).send({ error: "UserName is compulsory." });
                    }
                }
                else{
                    res.status(400).send({ error: "Provide a valid email." });
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
    catch (error) {
        console.log(error)
        res.status(500).send({ error: error });
    }
});

router.post("/login",async (req,res)=>{
    try{
        const {loginId,password} = req.body;
        if(loginId){
            if(password){
                let user;
                if(loginId.includes("@") && loginId.includes(".",loginId.indexOf("@"))){
                    user = await User.findOne({email:loginId},'password').exec();
                }
                else{
                    user = await User.findOne({userName:loginId},'password').exec();
                }

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
                    res.status(400).send({ error: "Invalid User Name or email." });
                } 
            }
            else{
                res.status(400).send({ error: "Password is compulsory." });
            }
        }
        else{
            res.status(400).send({ error: "Username or email is compulsory." });
        }

    }
    catch(error){
        res.status(500).send({ error: error });
    }
})



module.exports = router;