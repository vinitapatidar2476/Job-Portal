const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../Controllers/AuthController");

router.post("/userRegister", registerUser);
router.post("/login", loginUser);

module.exports = router;
