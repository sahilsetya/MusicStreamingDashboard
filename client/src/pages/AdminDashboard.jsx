import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Music, X } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    artist: "",
    genre: "",
    album: "",
  });

  const API = "http://localhost:5000/api/songs";

  // Get Song ID safely
  const getSongId = (song) => {
    return song?._id || song?.id || song?.songId || null;
  };

  // Load Songs
  const fetchSongs = async () => {
    try {
      setLoading(true);

      const res = await fetch(API);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to load songs");
        return;
      }

      const songList = Array.isArray(data) ? data : data.songs || [];

      console.log("SONGS FROM DATABASE:", songList);

      setSongs(songList);
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Add Form
  const openAddForm = () => {
    setEditingId(null);

    setForm({
      title: "",
      artist: "",
      genre: "",
      album: "",
    });

    setShowForm(true);
  };

  // Edit Form
  const openEditForm = (song) => {
    const songId = getSongId(song);

    console.log("EDIT SONG:", song);
    console.log("SONG ID:", songId);

    if (!songId) {
      alert("Song ID missing. Check database response.");
      return;
    }

    setEditingId(String(songId));

    setForm({
      title: song.title || "",
      artist: song.artist || "",
      genre: song.genre || "",
      album: song.album || "",
    });

    setShowForm(true);
  };

  // Add / Update Song
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = API;
      let method = "POST";

      if (editingId) {
        if (editingId === "undefined" || editingId === "null") {
          alert("Invalid Song ID");
          return;
        }

        url = `${API}/${editingId}`;
        method = "PUT";
      }

      console.log("REQUEST METHOD:", method);
      console.log("REQUEST URL:", url);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Song operation failed");
        return;
      }

      alert(
        method === "PUT"
          ? "Song updated successfully!"
          : "Song added successfully!"
      );

      setShowForm(false);
      setEditingId(null);

      await fetchSongs();
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  // Delete Song
  const handleDelete = async (song) => {
    const songId = getSongId(song);

    console.log("DELETE SONG:", song);
    console.log("DELETE ID:", songId);

    if (!songId) {
      alert("Song ID missing");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this song?")) {
      return;
    }

    try {
      const res = await fetch(`${API}/${songId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete song");
        return;
      }

      alert("Song deleted successfully!");

      await fetchSongs();
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] p-6 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Admin Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Welcome, {user?.name}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg"
            >
              Back to Dashboard
            </button>

            <button
              onClick={openAddForm}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} />
              Add Song
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#15151d] border border-white/10 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <Music className="text-purple-400" size={28} />

            <div>
              <p className="text-gray-400">Total Songs</p>

              <h2 className="text-2xl font-bold text-white">
                {songs.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Song Form */}
        {showForm && (
          <div className="bg-[#15151d] border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-white">
                {editingId ? "Edit Song" : "Add New Song"}
              </h2>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >
              {["title", "artist", "genre", "album"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={form[field]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [field]: e.target.value,
                    })
                  }
                  required={field === "title" || field === "artist"}
                  className="bg-[#0b0b0f] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                />
              ))}

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
                >
                  {editingId ? "Update Song" : "Save Song"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Songs Table */}
        <div className="bg-[#15151d] border border-white/10 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">
              Manage Songs
            </h2>
          </div>

          {loading ? (
            <p className="text-gray-400 p-6">Loading songs...</p>
          ) : songs.length === 0 ? (
            <p className="text-gray-400 p-6">No songs available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-black/20 text-gray-400">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Artist</th>
                    <th className="p-4">Genre</th>
                    <th className="p-4">Album</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {songs.map((song, index) => {
                    const songId = getSongId(song);

                    return (
                      <tr
                        key={songId || index}
                        className="border-t border-white/5 text-white"
                      >
                        <td className="p-4">{song.title}</td>
                        <td className="p-4">{song.artist}</td>
                        <td className="p-4">{song.genre || "-"}</td>
                        <td className="p-4">{song.album || "-"}</td>

                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditForm(song)}
                              className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 p-2 rounded"
                              title="Edit Song"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              onClick={() => handleDelete(song)}
                              className="bg-red-600/20 text-red-400 hover:bg-red-600/30 p-2 rounded"
                              title="Delete Song"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}