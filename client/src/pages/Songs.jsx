import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Disc3,
  ListMusic,
  LoaderCircle,
  Music2,
  Plus,
  RefreshCw,
  Search,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SongCard from "../components/SongCard";
import MusicPlayer from "../components/MusicPlayer";

const API_URL = "http://localhost:5000/api/songs";

const EMPTY_FORM = {
  title: "",
  artist: "",
  genre: "",
};

// API request helper
async function requestApi(url, options = {}) {
  const response = await fetch(url, options);

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed (${response.status})`);
  }

  return data;
}

// Fetch songs from MongoDB
async function fetchSongs() {
  const data = await requestApi(API_URL);

  if (!Array.isArray(data)) {
    throw new Error("Songs API response must be a list.");
  }

  return data;
}

// Get MongoDB Song ID
const getSongId = (song) => song?._id || song?.id || song?.songId || null;

// Get Authorization Header
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

function Songs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [formValues, setFormValues] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [deletingSongId, setDeletingSongId] = useState(null);

  // Load Songs
  const loadSongs = useCallback(async () => {
    try {
      const data = await fetchSongs();

      setSongs(data);
      setError("");

      return true;
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load songs."
      );

      return false;
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial Songs Fetch
  useEffect(() => {
    let isCurrent = true;

    fetchSongs()
      .then((data) => {
        if (isCurrent) {
          setSongs(data);
          setError("");
        }
      })
      .catch((requestError) => {
        if (isCurrent) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load songs."
          );
        }
      })
      .finally(() => {
        if (isCurrent) {
          setLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  // Refresh Songs
  const refreshSongs = async () => {
    setRefreshing(true);
    setError("");

    return await loadSongs();
  };

  // Genre List
  const genres = useMemo(() => {
    return [
      "All",
      ...new Set(songs.map((song) => song.genre).filter(Boolean)),
    ];
  }, [songs]);

  // Search and Genre Filter
  const filteredSongs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return songs.filter((song) => {
      const matchesSearch = [
        song.title,
        song.artist,
        song.album,
        song.genre,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      );

      const matchesGenre =
        selectedGenre === "All" || song.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });
  }, [songs, searchQuery, selectedGenre]);

  // Clear Filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
  };

  const hasFilters =
    searchQuery.trim() !== "" || selectedGenre !== "All";

  // Open Add Song Form
  const openCreateForm = () => {
    setEditingSong(null);
    setFormValues(EMPTY_FORM);
    setFormError("");
    setIsFormOpen(true);
  };

  // Open Edit Song Form
  const openEditForm = (song) => {
    const songId = getSongId(song);

    console.log("EDIT SONG:", song);
    console.log("SONG ID:", songId);

    if (!songId) {
      alert("Song ID missing! Check database response.");
      return;
    }

    setEditingSong({
      ...song,
      id: String(songId),
    });

    setFormValues({
      title: song.title || "",
      artist: song.artist || "",
      genre: song.genre || "",
    });

    setFormError("");
    setIsFormOpen(true);
  };

  // Close Form
  const closeForm = () => {
    if (isSaving) return;

    setIsFormOpen(false);
    setEditingSong(null);
    setFormError("");
  };

  // Add or Update Song
  const handleSubmit = async (event) => {
    event.preventDefault();

    const songData = {
      title: formValues.title.trim(),
      artist: formValues.artist.trim(),
      genre: formValues.genre.trim(),
    };

    if (!songData.title || !songData.artist || !songData.genre) {
      setFormError("Title, artist and genre are required.");
      return;
    }

    const songId = editingSong ? getSongId(editingSong) : null;

    if (editingSong && !songId) {
      setFormError("Invalid or missing Song ID.");
      console.error("Editing song:", editingSong);
      return;
    }

    setIsSaving(true);
    setFormError("");
    setError("");

    try {
      const url = editingSong
        ? `${API_URL}/${encodeURIComponent(songId)}`
        : API_URL;

      const method = editingSong ? "PUT" : "POST";

      console.log("REQUEST METHOD:", method);
      console.log("REQUEST URL:", url);

      const result = await requestApi(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(songData),
      });

      console.log("SONG RESPONSE:", result);

      setIsFormOpen(false);
      setEditingSong(null);
      setFormValues(EMPTY_FORM);

      await loadSongs();
    } catch (requestError) {
      setFormError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to save song."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Song
  const handleDelete = async (song) => {
    const songId = getSongId(song);

    if (!songId) {
      alert("Song ID missing!");
      console.error("Song:", song);
      return;
    }

    if (!window.confirm(`Delete "${song.title}"?`)) {
      return;
    }

    setDeletingSongId(String(songId));
    setError("");

    try {
      await requestApi(`${API_URL}/${encodeURIComponent(songId)}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeaders(),
        },
      });

      await loadSongs();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to delete song."
      );
    } finally {
      setDeletingSongId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Topbar />

          <div className="space-y-8 px-5 py-8 pb-32 md:px-8">

            {/* Header */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400">
                  <Music2 size={30} />
                </div>

                <div>
                  <h1 className="text-3xl font-bold">All Songs</h1>
                  <p className="mt-1 text-sm text-gray-400">
                    Explore your music collection.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3">
                  <Disc3 size={19} className="text-purple-400" />
                  <span className="text-sm text-gray-300">
                    {songs.length} Total Tracks
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => void refreshSongs()}
                  disabled={loading || refreshing}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3 text-sm text-gray-300 transition hover:border-purple-500 hover:text-white disabled:opacity-60"
                >
                  <RefreshCw
                    size={17}
                    className={refreshing ? "animate-spin" : ""}
                  />
                  Refresh
                </button>

                <button
                  type="button"
                  onClick={openCreateForm}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
                >
                  <Plus size={18} />
                  Add Song
                </button>
              </div>
            </section>

            {/* Error */}
            {error && (
              <section
                role="alert"
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                <span>{error}</span>

                <button
                  type="button"
                  onClick={() => void refreshSongs()}
                  disabled={refreshing}
                  className="font-semibold underline underline-offset-2"
                >
                  Try again
                </button>
              </section>
            )}

            {/* Search and Genre */}
            <section className="flex flex-col gap-4 md:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3 focus-within:border-purple-500">
                <Search size={20} className="shrink-0 text-gray-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Find a song, artist or album..."
                  aria-label="Search songs"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3">
                <ListMusic size={20} className="shrink-0 text-purple-400" />

                <select
                  value={selectedGenre}
                  onChange={(event) => setSelectedGenre(event.target.value)}
                  aria-label="Filter by genre"
                  className="w-full cursor-pointer bg-transparent text-sm text-white outline-none"
                >
                  {genres.map((genre) => (
                    <option
                      key={genre}
                      value={genre}
                      className="bg-[#17171f]"
                    >
                      {genre === "All" ? "All Genres" : genre}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            {/* Song Library */}
            <section className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Your Music Library
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Showing {filteredSongs.length} of {songs.length} songs
                </p>
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:border-purple-500 hover:text-purple-400"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              )}
            </section>

            {/* Loading */}
            {loading ? (
              <section
                role="status"
                className="rounded-2xl border border-white/10 bg-[#17171f] px-6 py-16 text-center text-gray-300"
              >
                <LoaderCircle
                  size={30}
                  className="mx-auto mb-3 animate-spin text-purple-400"
                />
                Loading songs...
              </section>
            ) : filteredSongs.length > 0 ? (
              <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredSongs.map((song) => {
                  const songId = getSongId(song);

                  return (
                    <div key={songId || song.title}>
                      <SongCard
                        song={{
                          ...song,
                          id: songId,
                        }}
                        onEdit={() => openEditForm(song)}
                        onDelete={() => handleDelete(song)}
                      />

                      {deletingSongId === String(songId) && (
                        <p
                          role="status"
                          className="mt-2 text-center text-xs text-gray-400"
                        >
                          Deleting...
                        </p>
                      )}
                    </div>
                  );
                })}
              </section>
            ) : (
              <section className="rounded-2xl border border-white/10 bg-[#17171f] px-6 py-16 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                  <Music2 size={32} className="text-purple-400" />
                </div>

                <h3 className="text-xl font-semibold">
                  {songs.length === 0
                    ? "No songs yet"
                    : "No songs found"}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {songs.length === 0
                    ? "Add a song to start building your music library."
                    : "Try another search term or select a different genre."}
                </p>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold hover:bg-purple-500"
                  >
                    Clear Filters
                  </button>
                )}
              </section>
            )}

            <footer className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
              © 2026 SoundWave Music Dashboard. Made for music lovers.
            </footer>
          </div>
        </main>
      </div>

      <MusicPlayer />

      {/* Add/Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="song-form-title"
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#17171f] p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id="song-form-title" className="text-xl font-bold">
                  {editingSong ? "Edit Song" : "Add Song"}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Enter the song details below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={isSaving}
                aria-label="Close form"
                className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                ["title", "Title"],
                ["artist", "Artist"],
                ["genre", "Genre"],
              ].map(([field, label]) => (
                <label
                  key={field}
                  className="block space-y-2"
                >
                  <span className="text-sm font-medium text-gray-300">
                    {label}
                  </span>

                  <input
                    type="text"
                    required
                    value={formValues[field]}
                    onChange={(event) =>
                      setFormValues((current) => ({
                        ...current,
                        [field]: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#0b0b0f] px-4 py-3 text-white outline-none focus:border-purple-500"
                  />
                </label>
              ))}

              {formError && (
                <p role="alert" className="text-sm text-red-300">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={isSaving}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold hover:bg-purple-500 disabled:opacity-60"
                >
                  {isSaving && (
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />
                  )}

                  {isSaving
                    ? "Saving..."
                    : editingSong
                      ? "Save Changes"
                      : "Add Song"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default Songs;