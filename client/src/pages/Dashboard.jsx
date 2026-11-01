import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Music2,
  Users,
  Headphones,
  TrendingUp,
  Play,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MusicPlayer from "../components/MusicPlayer";

import { songs, artists, playlists } from "../data/musicData";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0914] text-white">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 pb-32">
          <Topbar />

          <div className="p-8">

          {/* Welcome Banner */}
          <section className="mb-10 rounded-3xl bg-gradient-to-r from-purple-700 to-pink-600 p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-200">
              Welcome to SoundWave
            </p>

            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Feel the Music.
              <br />
              Live the Moment.
            </h1>

            <p className="mb-6 max-w-lg text-purple-100">
              Discover your favourite songs, explore new artists
              and enjoy music that matches your mood.
            </p>

            <button
              onClick={() => navigate("/songs")}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-purple-700 hover:bg-purple-100"
            >
              Explore Music <ArrowRight size={18} />
            </button>
          </section>

          {/* Statistics */}
          <section className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {[
              {
                title: "Total Songs",
                value: songs.length,
                icon: Music2,
              },
              {
                title: "Total Artists",
                value: artists.length,
                icon: Users,
              },
              {
                title: "Playlists",
                value: playlists.length,
                icon: Headphones,
              },
              {
                title: "Music Experience",
                value: "24/7",
                icon: TrendingUp,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#15111f] p-6"
                >
                  <Icon className="mb-4 text-purple-400" size={28} />

                  <h2 className="text-3xl font-bold">
                    {item.value}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Popular Songs */}
          <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400">TRENDING NOW</p>
                <h2 className="mt-1 text-2xl font-bold">
                  Popular Songs
                </h2>
              </div>

              <button
                onClick={() => navigate("/songs")}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {songs.slice(0, 4).map((song) => (
                <div
                  key={song.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#15111f] p-4 transition hover:border-purple-500/50"
                >
                  <img
                    src={song.image}
                    alt={song.title}
                    className="mb-4 aspect-square w-full rounded-xl object-cover"
                  />

                  <h3 className="truncate font-semibold">
                    {song.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {song.artist}
                  </p>

                  <button
                    onClick={() =>
                      alert("Demo interface: Audio playback is not connected yet.")
                    }
                    className="mt-4 flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm hover:bg-purple-500"
                  >
                    <Play size={15} fill="currentColor" />
                    Play
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Artists */}
          <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400">DISCOVER</p>
                <h2 className="mt-1 text-2xl font-bold">
                  Popular Artists
                </h2>
              </div>

              <button
                onClick={() => navigate("/artists")}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-5">
              {artists.slice(0, 5).map((artist) => (
                <div
                  key={artist.id}
                  className="rounded-2xl border border-white/10 bg-[#15111f] p-4 text-center"
                >
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="mx-auto mb-4 h-28 w-28 rounded-full object-cover"
                  />

                  <h3 className="font-semibold">{artist.name}</h3>

                  <p className="mt-1 text-xs text-gray-400">
                    {artist.followers}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Playlists */}
          <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400">MADE FOR YOU</p>
                <h2 className="mt-1 text-2xl font-bold">
                  Featured Playlists
                </h2>
              </div>

              <button
                onClick={() => navigate("/playlists")}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="rounded-2xl border border-white/10 bg-[#15111f] p-4"
                >
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="mb-4 aspect-square w-full rounded-xl object-cover"
                  />

                  <h3 className="font-semibold">{playlist.name}</h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {playlist.totalSongs} Songs
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-gray-500">
              © 2026 SoundWave. All rights reserved.
            </p>

            <p className="mt-2 text-xs text-gray-600">
              Your Music. Your Mood. Your World.
            </p>
          </footer>

          </div>
        </main>
      </div>

      <MusicPlayer />
    </div>
  );
}

export default Dashboard;