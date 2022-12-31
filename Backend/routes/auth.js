const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password, confirmPassword, userName, githubURL = "", linkedinURL = "", codeforcesURL = "", codechefURL = "", bio = "" } = req.body;
        if (name) {
            if (email) {
                if (userName) {
                    if (password) {
                        if (confirmPassword) {
                            if (password == confirmPassword) {
                                const hashedPassword = await bcrypt.hash(password, 10);
                                // console.log(hashedPassword);
                                const user = await new User({ name, email, password: hashedPassword, userName, githubURL, linkedinURL, codeforcesURL, codechefURL, bio }).save();

                                console.log(user)

                                res.status(200).json("Successfully registered. Please confirm your email before further process.");

                            }
                            else {
                                res.status(400).send({ error: "Password and Confirm Password must match." });
                            }
                        }
                        else {
                            res.status(400).send({ error: "Password Confirmation is compulsory." });
                        }

                    }
                    else {
                        res.status(400).send({ error: "Password is compulsory." });
                    }
                }
                else {
                    res.status(400).send({ error: "UserName is compulsory." });
                }

            }
            else {
                res.status(400).send({ error: "Email is compulsory." });
            }

        }
        else {
            res.status(400).send({ error: "Name is compulsory." });
        }

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error: error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const jwtTocken = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY);
        if (email) {
            if (password) {
                const userByEmail = await User.findOne({ email: email }, 'password').exec();
                const userByUserName = await User.findOne({ userName: email }, 'password').exec();
                const user = userByEmail || userByUserName;
                if (user) {
                    const valid = await bcrypt.compare(password, user.password);

                    if (valid) {
                        console.log(user)
                        res.status(200).send(jwtTocken);
                    }
                    else {
                        res.status(400).send({ error: "Incorrect Password." });
                    }
                }
                else {
                    res.status(400).send({ error: "Invalid User Name." });
                }
            }
            else {
                res.status(400).send({ error: "Password is compulsory." });
            }
        }
        else {
            res.status(400).send({ error: "Username is compulsory." });
        }

    }
    catch (error) {
        res.status(500).send({ error: error });
    }
})



module.exports = router;