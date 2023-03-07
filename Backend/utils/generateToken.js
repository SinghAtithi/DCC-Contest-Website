const jwt = require("jsonwebtoken");

const generateLoginToken = (id, role,profile_pic) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: id,
    role: role,
    profile_pic: profile_pic
  };

  const token = jwt.sign(data, jwtSecretKey, { expiresIn: '20m' });

  return token;
};

module.exports = { generateLoginToken }
