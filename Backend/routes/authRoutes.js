const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// The frontend is sending requests to /signup and /login
router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;