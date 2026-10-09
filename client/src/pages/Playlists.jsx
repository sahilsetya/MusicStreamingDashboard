import { useState } from "react";
import {
  ListMusic,
  Search,
  Music2,
  Play,
  Clock3,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MusicPlayer from "../components/MusicPlayer";

import { playlists } from "../data/musicData";

function Playlists() {
  const [search, setSearch] = useState("");

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0914] text-white">
      <Sidebar />

      <main className="ml-64 min-h-screen pb-32">
        <Topbar />

        <div className="p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm text-purple-400">
                YOUR PERSONAL COLLECTION
              </p>

              <h1 className="text-4xl font-bold">Playlists</h1>

              <p className="mt-2 text-gray-400">
                Your favourite vibes, all in one place.
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <ListMusic
                size={30}
                className="text-purple-400"
              />

              <div>
                <p className="text-2xl font-bold">
                  {playlists.length}
                </p>

                <p className="text-sm text-gray-400">
                  Total Playlists
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
            <Search size={20} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search playlists..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent py-4 text-white outline-none placeholder:text-gray-500"
            />
          </div>

          {/* Playlist Cards */}
          {filteredPlaylists.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#15111f] p-4 transition duration-300 hover:-translate-y-1 hover:border-purple-500/50"
                >
                  {/* Cover Image */}
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={playlist.image}
                      alt={playlist.name}
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      aria-label={`Play ${playlist.name}`}
                      onClick={() =>
                        alert(
                          "Audio playback is not connected yet."
                        )
                      }
                      className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white shadow-lg transition hover:scale-110 hover:bg-purple-400"
                    >
                      <Play
                        size={22}
                        fill="currentColor"
                      />
                    </button>
                  </div>

                  {/* Playlist Information */}
                  <h2 className="truncate text-lg font-bold">
                    {playlist.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Your music collection
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-4 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <Music2 size={16} />

                      {playlist.totalSongs ?? 0} Songs
                    </span>

                    <span className="flex items-center gap-1 text-purple-300">
                      <Clock3 size={15} />
                      Playlist
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 py-16 text-center">
              <ListMusic
                size={48}
                className="mx-auto mb-4 text-gray-500"
              />

              <h2 className="text-xl font-semibold">
                No Playlists Found
              </h2>

              <p className="mt-2 text-gray-400">
                Try searching with a different playlist name.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-lg bg-purple-600 px-5 py-2 hover:bg-purple-500"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
}

export default Playlists;