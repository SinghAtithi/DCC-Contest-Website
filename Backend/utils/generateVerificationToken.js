const jwt = require("jsonwebtoken");

const generateVerificationToken = (id) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: id,
  };

  const token = jwt.sign(data, jwtSecretKey, { expiresIn: "20m" });

  return token;
};

module.exports = { generateVerificationToken };
