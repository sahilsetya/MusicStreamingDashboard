import { useMemo, useState } from "react";
import {
  ListMusic,
  Search,
  Music2,
  Play,
  Clock3,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MusicPlayer from "../components/MusicPlayer";

import { playlists } from "../data/musicData";

function Playlists() {
  const [search, setSearch] = useState("");

  // Search playlists
  const filteredPlaylists = useMemo(() => {
    const query = search.trim().toLowerCase();

    return playlists.filter((playlist) =>
      (playlist.name || "").toLowerCase().includes(query)
    );
  }, [search]);

  // Total songs across all playlists
  const totalSongs = playlists.reduce(
    (total, playlist) => total + (Number(playlist.totalSongs) || 0),
    0
  );

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-[#0b0914] text-white">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Topbar />

          <div className="space-y-8 px-4 py-6 pb-32 sm:px-6 lg:px-8 lg:py-8">

            {/* Page Header */}
            <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-medium tracking-wider text-purple-400">
                  YOUR PERSONAL COLLECTION
                </p>

                <h1 className="text-3xl font-bold sm:text-4xl">
                  Playlists
                </h1>

                <p className="mt-2 text-sm text-gray-400">
                  Your favourite vibes, all in one place.
                </p>
              </div>

              {/* Playlist Statistics */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="rounded-xl bg-purple-600/20 p-3 text-purple-400">
                    <ListMusic size={25} />
                  </div>

                  <div>
                    <p className="text-2xl font-bold">
                      {playlists.length}
                    </p>

                    <p className="text-xs text-gray-400">
                      Total Playlists
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="rounded-xl bg-pink-600/20 p-3 text-pink-400">
                    <Music2 size={25} />
                  </div>

                  <div>
                    <p className="text-2xl font-bold">
                      {totalSongs}
                    </p>

                    <p className="text-xs text-gray-400">
                      Total Songs
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Playlist Banner */}
            <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-purple-900/60 to-pink-900/40 p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <ListMusic size={32} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Your Music, Your Mood
                  </h2>

                  <p className="mt-2 text-sm text-gray-300">
                    Explore your collections and find the perfect
                    playlist for every moment.
                  </p>
                </div>
              </div>
            </section>

            {/* Search Bar */}
            <section className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#171321] px-4 transition focus-within:border-purple-500/60">
              <Search
                size={20}
                className="shrink-0 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search playlists..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search playlists"
                className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-500"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-sm text-purple-400 transition hover:text-purple-300"
                >
                  Clear
                </button>
              )}
            </section>

            {/* Playlist Section Heading */}
            <section className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">
                  Your Playlists
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Showing {filteredPlaylists.length} of {playlists.length} playlists
                </p>
              </div>

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="flex items-center gap-2 text-sm text-purple-400 transition hover:text-purple-300"
                >
                  <X size={16} />
                  Clear Search
                </button>
              )}
            </section>

            {/* Playlist Grid */}
            {filteredPlaylists.length > 0 ? (
              <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredPlaylists.map((playlist) => (
                  <article
                    key={playlist.id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#15111f] p-4 transition duration-300 hover:-translate-y-1 hover:border-purple-500/50"
                  >
                    {/* Cover Image */}
                    <div className="relative mb-4 overflow-hidden rounded-xl bg-[#242033]">
                      {playlist.image ? (
                        <img
                          src={playlist.image}
                          alt={`${playlist.name} playlist cover`}
                          loading="lazy"
                          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-52 items-center justify-center">
                          <ListMusic
                            size={65}
                            className="text-purple-400"
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                      {/* Play Button */}
                      <button
                        type="button"
                        aria-label={`Playback demo for ${playlist.name}`}
                        title="Audio playback is not connected yet"
                        onClick={() =>
                          alert(
                            "Demo interface: actual audio playback is not connected yet."
                          )
                        }
                        className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white shadow-lg transition hover:scale-110 hover:bg-purple-400 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <Play
                          size={22}
                          fill="currentColor"
                        />
                      </button>
                    </div>

                    {/* Playlist Information */}
                    <div className="mb-4">
                      <h3 className="truncate text-lg font-bold">
                        {playlist.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-400">
                        Your music collection
                      </p>
                    </div>

                    {/* Playlist Details */}
                    <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-4 text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <Music2 size={16} />

                        {playlist.totalSongs ?? 0} Songs
                      </span>

                      <span className="flex items-center gap-1 text-purple-300">
                        <Clock3 size={15} />
                        Playlist
                      </span>
                    </div>
                  </article>
                ))}
              </section>
            ) : (
              /* Empty State */
              <section className="rounded-2xl border border-white/10 bg-[#171321] py-16 text-center">
                <ListMusic
                  size={48}
                  className="mx-auto mb-4 text-gray-500"
                />

                <h2 className="text-xl font-semibold">
                  No Playlists Found
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Try searching with a different playlist name.
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-5 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium transition hover:bg-purple-500"
                >
                  Clear Search
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

export default Playlists;