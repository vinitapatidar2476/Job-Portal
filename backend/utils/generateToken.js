const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "secret-12345", {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
