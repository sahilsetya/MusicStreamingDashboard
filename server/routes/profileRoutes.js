const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// Secure Profile API - IDOR Protection
router.get("/:id", protect, async (req, res) => {
    try {

        // Ownership verification
        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                message: "Access denied. You can only access your own profile."
            });
        }

        // Fetch authenticated user's profile
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.status(200).json({
            profile: user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;