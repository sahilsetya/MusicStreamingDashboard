const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get current logged-in user
router.get("/me", protect, async (req, res) => {
    res.status(200).json({
        user: req.user
    });
});

module.exports = router;