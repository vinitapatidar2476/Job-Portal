const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
       return res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) return res.status(401).json({ message: "No token, authorization denied" });
};

const authorize = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Not authorized" });
    }
  };
};

module.exports = { protect, authorize };
