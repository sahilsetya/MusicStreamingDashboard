
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Song = require("./models/Song");
const authRoutes = require("./routes/authRoutes");

const { protect, adminOnly } = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Music Streaming API is running!"
    });
});

app.get("/api/admin/dashboard", protect, adminOnly, (req, res) => {
    res.status(200).json({
        message: "Welcome Admin!",
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
});

app.get("/api/songs", async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch songs",
            error: error.message
        });
    }
});

app.get("/api/songs/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Song ID" });
        }

        const song = await Song.findById(req.params.id);

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch song",
            error: error.message
        });
    }
});

app.post("/api/songs", async (req, res) => {
    try {
        const { title, artist, genre } = req.body;

        if (
            typeof title !== "string" ||
            typeof artist !== "string" ||
            typeof genre !== "string" ||
            !title.trim() ||
            !artist.trim() ||
            !genre.trim()
        ) {
            return res.status(400).json({
                message: "Valid title, artist and genre are required"
            });
        }

        const newSong = await Song.create({
            title: title.trim(),
            artist: artist.trim(),
            genre: genre.trim()
        });

        res.status(201).json({
            message: "Song created successfully",
            song: newSong
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create song",
            error: error.message
        });
    }
});

app.put("/api/songs/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Song ID" });
        }

        const { title, artist, genre } = req.body;

        if (
            typeof title !== "string" ||
            typeof artist !== "string" ||
            typeof genre !== "string" ||
            !title.trim() ||
            !artist.trim() ||
            !genre.trim()
        ) {
            return res.status(400).json({
                message: "Valid title, artist and genre are required"
            });
        }

        const updatedSong = await Song.findByIdAndUpdate(
            req.params.id,
            {
                title: title.trim(),
                artist: artist.trim(),
                genre: genre.trim()
            },
            { new: true, runValidators: true }
        );

        if (!updatedSong) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json({
            message: "Song updated successfully",
            song: updatedSong
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update song",
            error: error.message
        });
    }
});

app.delete("/api/songs/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Song ID" });
        }

        const deletedSong = await Song.findByIdAndDelete(req.params.id);

        if (!deletedSong) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json({
            message: "Song deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete song",
            error: error.message
        });
    }
});

app.use((req, res) => {
    res.status(404).json({ message: "API route not found" });
});

mongoose
    .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 15000
    })
    .then(() => {
        console.log("MongoDB Connected Successfully");

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    });
