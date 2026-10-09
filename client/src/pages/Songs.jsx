import { useState } from "react";
import { Search, Music2, ListMusic } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SongCard from "../components/SongCard";
import MusicPlayer from "../components/MusicPlayer";

import { songs } from "../data/musicData";

function Songs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = [
    "All",
    ...new Set(songs.map((song) => song.genre)),
  ];

  const filteredSongs = songs.filter((song) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query) ||
      song.genre.toLowerCase().includes(query);

    const matchesGenre =
      selectedGenre === "All" || song.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Topbar />

          <div className="space-y-8 px-8 py-8 pb-32">
            {/* Page Heading */}
            <section>
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
            </section>

            {/* Search */}
            <section className="flex flex-col gap-4 md:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3">
                <Search size={20} className="text-gray-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Find a song, artist or album..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3">
                <ListMusic size={20} className="text-purple-400" />

                <select
                  value={selectedGenre}
                  onChange={(event) =>
                    setSelectedGenre(event.target.value)
                  }
                  className="bg-transparent text-sm text-white outline-none"
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

            {/* Song Count */}
            <section className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Your Music Library
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  {filteredSongs.length}{" "}
                  {filteredSongs.length === 1 ? "song" : "songs"} found
                </p>
              </div>
            </section>

            {/* Songs Grid */}
            {filteredSongs.length > 0 ? (
              <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredSongs.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </section>
            ) : (
              <section className="rounded-2xl border border-white/10 bg-[#17171f] px-6 py-16 text-center">
                <Music2
                  size={44}
                  className="mx-auto mb-4 text-gray-500"
                />

                <h3 className="text-xl font-semibold">
                  No songs found
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Try another search term or select a different genre.
                </p>

                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre("All");
                  }}
                  className="mt-5 rounded-xl bg-purple-600 px-5 py-2 text-sm font-semibold transition hover:bg-purple-500"
                >
                  Clear Filters
                </button>
              </section>
            )}
          </div>
        </main>
      </div>

      <MusicPlayer />
    </div>
  );
}

export default Songs;