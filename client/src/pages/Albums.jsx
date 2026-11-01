import { useMemo, useState } from "react";
import {
  Disc3,
  Search,
  Music2,
  Play,
  Tag,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MusicPlayer from "../components/MusicPlayer";

import { songs } from "../data/musicData";

function Albums() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Automatically create albums from songs data
  const albums = useMemo(() => {
    const albumMap = new Map();

    songs.forEach((song) => {
      const albumName = song.album || "Unknown Album";
      const artistName = song.artist || "Unknown Artist";

      // Unique combination of album and artist
      const albumKey = `${albumName}-${artistName}`;

      if (!albumMap.has(albumKey)) {
        albumMap.set(albumKey, {
          id: albumKey,
          name: albumName,
          artist: artistName,
          image: song.image,
          genre: song.genre,
          songs: [],
        });
      }

      albumMap.get(albumKey).songs.push(song);
    });

    return Array.from(albumMap.values());
  }, []);

  // Automatically get available genres
  const genres = useMemo(() => {
    const allGenres = albums
      .map((album) => album.genre)
      .filter(Boolean);

    return ["All", ...new Set(allGenres)];
  }, [albums]);

  // Search and filter albums
  const filteredAlbums = useMemo(() => {
    return albums.filter((album) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        album.name.toLowerCase().includes(query) ||
        album.artist.toLowerCase().includes(query) ||
        (album.genre || "").toLowerCase().includes(query);

      const matchesGenre =
        selectedGenre === "All" ||
        album.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });
  }, [albums, search, selectedGenre]);

  const clearFilters = () => {
    setSearch("");
    setSelectedGenre("All");
  };

  const hasActiveFilters =
    search.trim() !== "" || selectedGenre !== "All";

  return (
    <div className="min-h-screen bg-[#0b0914] text-white">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Topbar />

          <div className="space-y-8 px-4 py-6 pb-32 sm:px-6 lg:px-8 lg:py-8">

            {/* Page Heading */}
            <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-medium tracking-wider text-purple-400">
                  YOUR MUSIC COLLECTION
                </p>

                <h1 className="text-3xl font-bold sm:text-4xl">
                  Albums
                </h1>

                <p className="mt-2 text-sm text-gray-400">
                  Explore albums and discover your next favourite sound.
                </p>
              </div>

              {/* Total Albums */}
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                <div className="rounded-xl bg-purple-600/20 p-3 text-purple-400">
                  <Disc3 size={27} />
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    {albums.length}
                  </p>

                  <p className="text-sm text-gray-400">
                    Total Albums
                  </p>
                </div>
              </div>
            </section>

            {/* Album Banner */}
            <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-purple-900/60 to-pink-900/40 p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <Disc3 size={32} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Explore Your Albums
                  </h2>

                  <p className="mt-2 text-sm text-gray-300">
                    Discover complete collections, artists and different musical genres.
                  </p>
                </div>
              </div>
            </section>

            {/* Search and Filter */}
            <section className="flex flex-col gap-4 md:flex-row">

              {/* Search */}
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#171321] px-4 transition focus-within:border-purple-500/60">
                <Search size={20} className="shrink-0 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search albums or artists..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search albums or artists"
                  className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-500"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-sm text-purple-400 hover:text-purple-300"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Genre Filter */}
              <select
                value={selectedGenre}
                onChange={(event) =>
                  setSelectedGenre(event.target.value)
                }
                aria-label="Filter albums by genre"
                className="rounded-xl border border-white/10 bg-[#171321] px-5 py-4 text-sm text-white outline-none focus:border-purple-500/60"
              >
                {genres.map((genre) => (
                  <option
                    key={genre}
                    value={genre}
                    className="bg-[#171321]"
                  >
                    {genre === "All" ? "All Genres" : genre}
                  </option>
                ))}
              </select>
            </section>

            {/* Album Section Heading */}
            <section className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">
                  Your Collection
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Showing {filteredAlbums.length} of {albums.length} albums
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-purple-400 transition hover:text-purple-300"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              )}
            </section>

            {/* Album Grid */}
            {filteredAlbums.length > 0 ? (
              <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredAlbums.map((album) => (
                  <article
                    key={album.id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#15111f] p-4 transition duration-300 hover:-translate-y-1 hover:border-purple-500/50"
                  >
                    {/* Album Artwork */}
                    <div className="relative mb-4 overflow-hidden rounded-xl bg-[#242033]">
                      {album.image ? (
                        <img
                          src={album.image}
                          alt={`${album.name} album artwork`}
                          loading="lazy"
                          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-52 items-center justify-center">
                          <Disc3
                            size={65}
                            className="text-purple-400"
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                      <button
                        type="button"
                        aria-label={`Playback demo for ${album.name}`}
                        title="Audio playback is not connected yet"
                        onClick={() =>
                          alert(
                            "Demo interface: actual audio playback is not connected yet."
                          )
                        }
                        className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white opacity-100 shadow-lg transition hover:scale-110 hover:bg-purple-400 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <Play size={22} fill="currentColor" />
                      </button>
                    </div>

                    {/* Album Details */}
                    <div className="mb-4">
                      <h3 className="truncate text-lg font-bold">
                        {album.name}
                      </h3>

                      <p className="mt-1 truncate text-sm text-gray-400">
                        {album.artist}
                      </p>
                    </div>

                    {/* Album Information */}
                    <div className="mb-4 flex items-center justify-between gap-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Music2 size={15} />
                        {album.songs.length}{" "}
                        {album.songs.length === 1 ? "Song" : "Songs"}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Tag size={14} />
                        {album.genre || "Various"}
                      </span>
                    </div>

                    {/* Album Footer */}
                    <div className="border-t border-white/10 pt-3">
                      <p className="text-xs font-medium text-purple-300">
                        {album.genre || "Music"} Collection
                      </p>
                    </div>
                  </article>
                ))}
              </section>
            ) : (
              /* Empty State */
              <section className="rounded-2xl border border-white/10 bg-[#171321] py-16 text-center">
                <Disc3
                  size={48}
                  className="mx-auto mb-4 text-gray-500"
                />

                <h2 className="text-xl font-semibold">
                  No Albums Found
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Try another search term or select a different genre.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium transition hover:bg-purple-500"
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

export default Albums;