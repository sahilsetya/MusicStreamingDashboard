import { useMemo, useState } from "react";
import {
  Search,
  Music2,
  ListMusic,
  X,
  Disc3,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SongCard from "../components/SongCard";
import MusicPlayer from "../components/MusicPlayer";

import { songs } from "../data/musicData";

function Songs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Get unique genres
  const genres = useMemo(
    () => [
      "All",
      ...new Set(songs.map((song) => song.genre).filter(Boolean)),
    ],
    []
  );

  // Filter songs
  const filteredSongs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return songs.filter((song) => {
      const matchesSearch =
        (song.title || "").toLowerCase().includes(query) ||
        (song.artist || "").toLowerCase().includes(query) ||
        (song.album || "").toLowerCase().includes(query) ||
        (song.genre || "").toLowerCase().includes(query);

      const matchesGenre =
        selectedGenre === "All" || song.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
  };

  const hasFilters =
    searchQuery.trim() !== "" || selectedGenre !== "All";

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Topbar />

          <div className="space-y-8 px-5 py-8 pb-32 md:px-8">

            {/* Page Header */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400">
                  <Music2 size={30} />
                </div>

                <div>
                  <h1 className="text-3xl font-bold">
                    All Songs
                  </h1>
                  <p className="mt-1 text-sm text-gray-400">
                    Explore your music collection.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3">
                <Disc3 size={19} className="text-purple-400" />
                <span className="text-sm text-gray-300">
                  {songs.length} Total Tracks
                </span>
              </div>
            </section>

            {/* Search and Genre Filter */}
            <section className="flex flex-col gap-4 md:flex-row">

              {/* Search Bar */}
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3 transition focus-within:border-purple-500">
                <Search size={20} className="shrink-0 text-gray-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Find a song, artist or album..."
                  aria-label="Search songs"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="text-gray-400 transition hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Genre Filter */}
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3">
                <ListMusic
                  size={20}
                  className="shrink-0 text-purple-400"
                />

                <select
                  value={selectedGenre}
                  onChange={(event) =>
                    setSelectedGenre(event.target.value)
                  }
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

            {/* Library Heading */}
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
                  className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-purple-500 hover:text-purple-400"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              )}
            </section>

            {/* Songs Grid */}
            {filteredSongs.length > 0 ? (
              <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredSongs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                  />
                ))}
              </section>
            ) : (
              /* Empty State */
              <section className="rounded-2xl border border-white/10 bg-[#17171f] px-6 py-16 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                  <Music2
                    size={32}
                    className="text-purple-400"
                  />
                </div>

                <h3 className="text-xl font-semibold">
                  No songs found
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Try another search term or select a different genre.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-purple-500"
                >
                  Clear Filters
                </button>
              </section>
            )}

            {/* Footer */}
            <footer className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
              © 2026 SoundWave Music Dashboard. Made for music lovers.
            </footer>

          </div>
        </main>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
}

export default Songs;