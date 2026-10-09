import { useMemo, useState } from "react";
import { Disc3, Search, Music2, Play, Clock3 } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MusicPlayer from "../components/MusicPlayer";

import { songs } from "../data/musicData";

function Albums() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Albums ko songs ke data se automatically create karna
  const albums = useMemo(() => {
    const albumMap = new Map();

    songs.forEach((song) => {
      const albumName = song.album || "Unknown Album";

      if (!albumMap.has(albumName)) {
        albumMap.set(albumName, {
          name: albumName,
          artist: song.artist,
          image: song.image,
          genre: song.genre,
          songs: [],
        });
      }

      albumMap.get(albumName).songs.push(song);
    });

    return Array.from(albumMap.values());
  }, []);

  const genres = [
    "All",
    ...new Set(albums.map((album) => album.genre).filter(Boolean)),
  ];

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch =
      album.name.toLowerCase().includes(search.toLowerCase()) ||
      album.artist.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || album.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-[#0b0914] text-white">
      <Sidebar />

      <main className="ml-64 min-h-screen pb-32">
        <Topbar />

        <div className="p-8">
          {/* Page Heading */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm text-purple-400">
                YOUR MUSIC COLLECTION
              </p>

              <h1 className="text-4xl font-bold">Albums</h1>

              <p className="mt-2 text-gray-400">
                Explore albums and discover your next favourite sound.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <Disc3 size={25} className="text-purple-400" />

              <div>
                <p className="text-2xl font-bold">{albums.length}</p>
                <p className="text-sm text-gray-400">Total Albums</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
              <Search size={20} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search albums or artists..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent py-4 text-white outline-none placeholder:text-gray-500"
              />
            </div>

            <select
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#171321] px-5 py-4 text-white outline-none"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre === "All" ? "All Genres" : genre}
                </option>
              ))}
            </select>
          </div>

          {/* Album Grid */}
          {filteredAlbums.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAlbums.map((album) => (
                <div
                  key={album.name}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#15111f] p-4 transition duration-300 hover:-translate-y-1 hover:border-purple-500/50"
                >
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={album.image}
                      alt={album.name}
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      aria-label={`Play ${album.name}`}
                      className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white shadow-lg transition hover:scale-110 hover:bg-purple-400"
                      onClick={() => {
                        alert(
                          "Demo interface: actual audio playback is not connected yet."
                        );
                      }}
                    >
                      <Play size={22} fill="currentColor" />
                    </button>
                  </div>

                  <div className="mb-3">
                    <h2 className="truncate text-lg font-bold">
                      {album.name}
                    </h2>

                    <p className="mt-1 truncate text-sm text-gray-400">
                      {album.artist}
                    </p>
                  </div>

                  <div className="mb-4 flex items-center justify-between gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Music2 size={14} />
                      {album.songs.length}{" "}
                      {album.songs.length === 1 ? "Song" : "Songs"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock3 size={14} />
                      {album.genre || "Various"}
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <p className="text-xs text-purple-300">
                      {album.genre || "Music"} Collection
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 py-16 text-center">
              <Disc3
                size={48}
                className="mx-auto mb-4 text-gray-500"
              />

              <h2 className="text-xl font-semibold">No Albums Found</h2>

              <p className="mt-2 text-gray-400">
                Try another search term or select a different genre.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedGenre("All");
                }}
                className="mt-5 rounded-lg bg-purple-600 px-5 py-2 hover:bg-purple-500"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
}

export default Albums;