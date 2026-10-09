import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";
import PlaylistCard from "../components/PlaylistCard";
import MusicPlayer from "../components/MusicPlayer";

import {
  ArrowRight,
  TrendingUp,
  Headphones,
  Music2,
  Users,
} from "lucide-react";

// Popular songs
const songs = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
  },
  {
    title: "Starboy",
    artist: "The Weeknd",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400",
  },
  {
    title: "Night Changes",
    artist: "One Direction",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
  },
];

// Popular artists
const artists = [
  {
    name: "The Weeknd",
    followers: "95M monthly listeners",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  },
  {
    name: "Taylor Swift",
    followers: "88M monthly listeners",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
  },
  {
    name: "Drake",
    followers: "76M monthly listeners",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
  },
  {
    name: "Dua Lipa",
    followers: "62M monthly listeners",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
  },
];

// Featured playlists
const playlists = [
  {
    name: "Daily Mix",
    totalSongs: 50,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
  },
  {
    name: "Chill Vibes",
    totalSongs: 32,
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400",
  },
  {
    name: "Workout Hits",
    totalSongs: 45,
    image:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400",
  },
  {
    name: "Late Night",
    totalSongs: 28,
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400",
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <Topbar />

          <div className="space-y-10 px-8 py-8 pb-32">
            {/* Welcome Banner */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-800 via-purple-600 to-pink-600 p-8 md:p-10">
              <div className="relative z-10 max-w-xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-100">
                  Your personal music space
                </p>

                <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
                  Music for every mood.
                  <br />
                  Vibes for every moment.
                </h1>

                <p className="mt-4 max-w-md text-sm leading-6 text-purple-100 md:text-base">
                  Explore your favourite tracks, discover new artists,
                  and create the perfect soundtrack for your day.
                </p>

                <button className="mt-6 flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-purple-700 transition hover:bg-purple-100">
                  Explore Music
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full border-[35px] border-white/10" />

              <div className="pointer-events-none absolute -bottom-28 right-20 h-64 w-64 rounded-full bg-pink-400/20 blur-3xl" />
            </section>

            {/* Statistics */}
            <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-[#17171f] p-5">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-purple-500/15 p-3 text-purple-400">
                    <Headphones size={23} />
                  </div>
                  <TrendingUp size={18} className="text-green-400" />
                </div>

                <p className="mt-5 text-sm text-gray-400">
                  Total Listening Time
                </p>
                <h2 className="mt-1 text-3xl font-bold">128 hrs</h2>
                <p className="mt-2 text-xs text-green-400">
                  +12% this month
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#17171f] p-5">
                <div className="rounded-xl bg-pink-500/15 p-3 text-pink-400 w-fit">
                  <Music2 size={23} />
                </div>

                <p className="mt-5 text-sm text-gray-400">
                  Songs Played
                </p>
                <h2 className="mt-1 text-3xl font-bold">1,284</h2>
                <p className="mt-2 text-xs text-green-400">
                  +8% this month
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#17171f] p-5">
                <div className="rounded-xl bg-blue-500/15 p-3 text-blue-400 w-fit">
                  <Users size={23} />
                </div>

                <p className="mt-5 text-sm text-gray-400">
                  Followed Artists
                </p>
                <h2 className="mt-1 text-3xl font-bold">56</h2>
                <p className="mt-2 text-xs text-green-400">
                  +4 new artists
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#17171f] p-5">
                <div className="rounded-xl bg-orange-500/15 p-3 text-orange-400 w-fit">
                  <TrendingUp size={23} />
                </div>

                <p className="mt-5 text-sm text-gray-400">
                  Favourite Genre
                </p>
                <h2 className="mt-1 text-3xl font-bold">Pop</h2>
                <p className="mt-2 text-xs text-gray-400">
                  Your most played genre
                </p>
              </div>
            </section>

            {/* Popular Songs */}
            <section>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Popular Songs</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Tracks you might love
                  </p>
                </div>

                <button className="flex items-center gap-2 text-sm text-purple-400 transition hover:text-purple-300">
                  View All <ArrowRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {songs.map((song) => (
                  <SongCard key={song.title} song={song} />
                ))}
              </div>
            </section>

            {/* Popular Artists */}
            <section>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Popular Artists</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Artists worth listening to
                  </p>
                </div>

                <button className="flex items-center gap-2 text-sm text-purple-400 transition hover:text-purple-300">
                  View All <ArrowRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {artists.map((artist) => (
                  <ArtistCard key={artist.name} artist={artist} />
                ))}
              </div>
            </section>

            {/* Featured Playlists */}
            <section>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Featured Playlists</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    The perfect soundtrack for you
                  </p>
                </div>

                <button className="flex items-center gap-2 text-sm text-purple-400 transition hover:text-purple-300">
                  View All <ArrowRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {playlists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.name}
                    playlist={playlist}
                  />
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
              © 2026 SoundWave Music Dashboard. Made for music lovers.
            </footer>
          </div>
        </main>
      </div>

      {/* Fixed Music Player */}
      <MusicPlayer />
    </div>
  );
}

export default Dashboard;