const jwt = require('jsonwebtoken');

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

module.exports = verifyGeneralUser;