
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Temporary Songs Database
let songs = [
    {
        id: 1,
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        genre: "Romantic"
    },
    {
        id: 2,
        title: "Blinding Lights",
        artist: "The Weeknd",
        genre: "Pop"
    },
    {
        id: 3,
        title: "Starboy",
        artist: "The Weeknd",
        genre: "R&B"
    }
];

// HOME ROUTE
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Music Streaming API is running!"
    });
});

// GET ALL SONGS
app.get("/api/songs", (req, res) => {
    res.status(200).json(songs);
});

// GET SONG BY ID
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

// CREATE NEW SONG
app.post("/api/songs", (req, res) => {
    const { title, artist, genre } = req.body;

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

// UPDATE SONG
app.put("/api/songs/:id", (req, res) => {
    const id = Number(req.params.id);

    const song = songs.find(item => item.id === id);

    if (!song) {
        return res.status(404).json({
            message: "Song not found"
        });
    }

    const { title, artist, genre } = req.body;

    if (title !== undefined) song.title = title;
    if (artist !== undefined) song.artist = artist;
    if (genre !== undefined) song.genre = genre;

    res.status(200).json({
        message: "Song updated successfully",
        song
    });
});

// DELETE SONG
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

// INVALID ROUTE
app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});

// START SERVER
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
