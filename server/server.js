require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const Song = require("./models/Song");

const authRoutes = require("./routes/authRoutes");
const { protect, adminOnly } = require("./middleware/authMiddleware");

const app = express();
const server = http.createServer(app);

const profileRoutes = require("./routes/profileRoutes");

const PORT = process.env.PORT || 5000;

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.use("/api/profiles", profileRoutes);

// Make io available in routes
app.set("io", io);

// Socket Connection
io.on("connection", (socket) => {
  console.log("Socket Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket Disconnected:", socket.id);
  });
});

// Express Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Music Streaming API is running!",
  });
});

// Auth Routes
app.use("/api/auth", authRoutes);

// GET All Songs
app.get("/api/songs", async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });

    res.status(200).json(songs);
  } catch (error) {
    console.error("Get Songs Error:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
});

// GET Single Song
app.get("/api/songs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Song ID",
      });
    }

    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE Song (Admin Only)
app.post("/api/songs", protect, adminOnly, async (req, res) => {
  try {
    const song = await Song.create(req.body);

    // Real-time notification
    io.emit("song:created", {
      message: `New song added: ${song.title}`,
      songId: song._id,
      title: song.title,
      timestamp: new Date(),
    });

    console.log("Song Created:", song.title);
    console.log("Notification Sent: song:created");

    res.status(201).json({
      message: "Song created successfully",
      song,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// UPDATE Song (Admin Only)
app.put("/api/songs/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Song ID",
      });
    }

    const song = await Song.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    // Real-time notification
    io.emit("song:updated", {
      message: `Song updated: ${song.title}`,
      songId: song._id,
      title: song.title,
      timestamp: new Date(),
    });

    console.log("Song Updated:", song.title);
    console.log("Notification Sent: song:updated");

    res.status(200).json({
      message: "Song updated successfully",
      song,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE Song (Admin Only)
app.delete("/api/songs/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Song ID",
      });
    }

    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    // Real-time notification
    io.emit("song:deleted", {
      message: `Song deleted: ${song.title}`,
      songId: song._id,
      title: song.title,
      timestamp: new Date(),
    });

    console.log("Song Deleted:", song.title);
    console.log("Notification Sent: song:deleted");

    res.status(200).json({
      message: "Song deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// Admin Route
app.get("/api/admin", protect, adminOnly, (req, res) => {
  res.status(200).json({
    message: "Welcome Admin!",
    user: req.user,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

// Start Server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  });
