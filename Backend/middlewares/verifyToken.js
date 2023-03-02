const jwt = require('jsonwebtoken');
const User = require("../models/user")

const verifyGeneralUser = (req, res, next) => {
    const token = req.header("token");
    if (!token) return res.status(404).send({ error: "Token is Missing" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        console.log("Verified");
        next();
    }
    catch (error) {
        console.log("Could not Verify");
        res.status(400).send({ error: "Invalid Token" });
    }
}

const verifyAdmin = async (req, res, next) => {
    const token = req.header("token");
    if (!token) return res.status(404).send({ error: "Token is Missing" });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        const role = await User.findOne({ _id: verified.userId }, "role").exec();
        if (role == "endUser") {
            res.status(400).send({ error: "User is Unauthorized to perform this action, contact admins" });
        }
        console.log("Verified", verified);
        next();
    }
    catch (error) {
        console.log("Could not Verify");
        res.status(400).send({ error: "Invalid Token" });
    }
}

module.exports = { verifyGeneralUser, verifyAdmin };