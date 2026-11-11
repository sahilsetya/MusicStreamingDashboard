const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary Songs Database
let songs = [
    { id: 1, title: "Tum Hi Ho", artist: "Arijit Singh", genre: "Romantic" },
    { id: 2, title: "Blinding Lights", artist: "The Weeknd", genre: "Pop" },
    { id: 3, title: "Starboy", artist: "The Weeknd", genre: "R&B" }
];

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Music Streaming API is running!"
    });
});

// GET - All Songs
app.get("/api/songs", (req, res) => {
    res.status(200).json(songs);
});

// GET - Song By ID
app.get("/api/songs/:id", (req, res) => {
    const id = Number(req.params.id);

    const song = songs.find(item => item.id === id);

    if (!song) {
        return res.status(404).json({
            message: "Song not found"
        });
    }

    res.status(200).json(song);
});

// POST - Create New Song
app.post("/api/songs", (req, res) => {
    const { title, artist, genre } = req.body || {};

    if (!title || !artist || !genre) {
        return res.status(400).json({
            message: "Title, artist and genre are required"
        });
    }

    const newSong = {
        id: songs.length
            ? Math.max(...songs.map(item => item.id)) + 1
            : 1,
        title,
        artist,
        genre
    };

    songs.push(newSong);

    res.status(201).json({
        message: "Song created successfully",
        song: newSong
    });
});

// PUT - Update Song
app.put("/api/songs/:id", (req, res) => {
    const id = Number(req.params.id);

    const song = songs.find(item => item.id === id);

    if (!song) {
        return res.status(404).json({
            message: "Song not found"
        });
    }

    const { title, artist, genre } = req.body || {};

    if (title !== undefined) song.title = title;
    if (artist !== undefined) song.artist = artist;
    if (genre !== undefined) song.genre = genre;

    res.status(200).json({
        message: "Song updated successfully",
        song
    });
});

// DELETE - Remove Song
app.delete("/api/songs/:id", (req, res) => {
    const id = Number(req.params.id);

    const exists = songs.some(item => item.id === id);

    if (!exists) {
        return res.status(404).json({
            message: "Song not found"
        });
    }

    songs = songs.filter(item => item.id !== id);

    res.status(200).json({
        message: "Song deleted successfully"
    });
});

// Invalid Route Handling
app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Internal Server Error"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});