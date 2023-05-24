const jwt = require("jsonwebtoken");

const generateLoginToken = (id, role,profile_pic,username) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: id,
    role: role,
    profile_pic: profile_pic,
    username : username
  };

  const token = jwt.sign(data, jwtSecretKey, { expiresIn: '15d' });

  return token;
};

module.exports = { generateLoginToken }
