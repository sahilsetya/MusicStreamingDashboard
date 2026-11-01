

import { useState } from "react";
import {
  Clock3,
  Music2,
  Users,
  TrendingUp,
  Play,
  Headphones,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

const weeklyData = [
  { day: "Mon", hours: 3.2 },
  { day: "Tue", hours: 4.5 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 5.5 },
  { day: "Fri", hours: 4.1 },
  { day: "Sat", hours: 6.8 },
  { day: "Sun", hours: 5.2 },
];

const artists = [
  { name: "The Weeknd", songs: 42, color: "bg-purple-500", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100" },
  { name: "Drake", songs: 36, color: "bg-pink-500", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=100" },
  { name: "Travis Scott", songs: 29, color: "bg-violet-500", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=100" },
  { name: "Frank Ocean", songs: 24, color: "bg-fuchsia-500", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=100" },
];

const genres = [
  { name: "Hip Hop", percent: 40, color: "bg-purple-500" },
  { name: "R&B", percent: 28, color: "bg-pink-500" },
  { name: "Pop", percent: 18, color: "bg-violet-500" },
  { name: "Electronic", percent: 14, color: "bg-blue-500" },
];

const stats = [
  {
    title: "Listening Time",
    value: "128 hrs",
    change: "+12.5%",
    icon: Clock3,
    color: "text-purple-400",
    bg: "bg-purple-500/15",
  },
  {
    title: "Songs Played",
    value: "1,284",
    change: "+8.2%",
    icon: Music2,
    color: "text-pink-400",
    bg: "bg-pink-500/15",
  },
  {
    title: "Top Artists",
    value: "48",
    change: "+5.4%",
    icon: Users,
    color: "text-violet-400",
    bg: "bg-violet-500/15",
  },
  {
    title: "Average Daily",
    value: "4.2 hrs",
    change: "+10.1%",
    icon: Headphones,
    color: "text-blue-400",
    bg: "bg-blue-500/15",
  },
];

export default function Analytics() {
  const [period, setPeriod] = useState("Week");

  return (
    <div className="min-h-screen bg-[#0b0b10] p-5 text-white md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm text-purple-400">YOUR MUSIC INSIGHTS</p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Analytics
          </h1>
          <p className="mt-2 text-gray-400">
            Track your listening habits and discover your music taste.
          </p>
        </div>

        <button className="rounded-xl border border-white/10 bg-[#181820] px-5 py-3 text-sm text-gray-300 hover:border-purple-500">
          This Month
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-[#17171f] p-5 transition hover:-translate-y-1 hover:border-purple-500/50"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <Icon size={23} className={stat.color} />
                </div>

                <span className="flex items-center gap-1 text-xs text-green-400">
                  <TrendingUp size={14} />
                  {stat.change}
                </span>
              </div>

              <p className="text-sm text-gray-400">{stat.title}</p>
              <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>
            </div>
          );
        })}
      </div>

      {/* Weekly Activity */}
      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="rounded-2xl border border-white/10 bg-[#17171f] p-6 xl:col-span-2">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Listening Activity</h2>
              <p className="mt-1 text-sm text-gray-400">
                Your music listening hours
              </p>
            </div>

            <div className="flex rounded-xl bg-[#24242d] p-1">
              {["Week", "Month", "Year"].map((item) => (
                <button
                  key={item}
                  onClick={() => setPeriod(item)}
                  className={`rounded-lg px-4 py-2 text-xs transition ${
                    period === item
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex h-64 items-end justify-around gap-3 border-b border-white/10 pb-2">
            {weeklyData.map((item) => (
              <div
                key={item.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >
                <span className="text-xs text-gray-400">
                  {item.hours}h
                </span>

                <div
                  className="w-full max-w-12 rounded-t-xl bg-gradient-to-t from-purple-700 to-pink-500 transition-all duration-500 hover:brightness-125"
                  style={{ height: `${(item.hours / 7) * 75}%` }}
                />

                <span className="text-xs text-gray-400">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Distribution */}
        <div className="rounded-2xl border border-white/10 bg-[#17171f] p-6">
          <h2 className="text-xl font-semibold">Favourite Genres</h2>
          <p className="mt-1 text-sm text-gray-400">
            Your music preferences
          </p>

          <div className="my-8 flex justify-center">
            <div
              className="flex h-44 w-44 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#a855f7 0% 40%, #ec4899 40% 68%, #8b5cf6 68% 86%, #3b82f6 86% 100%)",
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-[#17171f]">
                <span className="text-2xl font-bold">100%</span>
                <span className="text-xs text-gray-400">Your taste</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {genres.map((genre) => (
              <div key={genre.name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-300">{genre.name}</span>
                  <span className="text-gray-400">{genre.percent}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${genre.color}`}
                    style={{ width: `${genre.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Artists */}
      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

        <div className="rounded-2xl border border-white/10 bg-[#17171f] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Top Artists</h2>
              <p className="mt-1 text-sm text-gray-400">
                Artists you listen to the most
              </p>
            </div>

            <button className="rounded-lg p-2 text-gray-400 hover:bg-white/10">
              <MoreHorizontal />
            </button>
          </div>

          <div className="space-y-5">
            {artists.map((artist, index) => (
              <div
                key={artist.name}
                className="flex items-center gap-4"
              >
                <span className="w-5 text-sm text-gray-500">
                  0{index + 1}
                </span>

                <img
                  src={artist.image}
                  alt={artist.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{artist.name}</h3>
                  <p className="text-xs text-gray-400">
                    {artist.songs} songs played
                  </p>
                </div>

                <ArrowUpRight size={18} className="text-purple-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Recently Played */}
        <div className="rounded-2xl border border-white/10 bg-[#17171f] p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Music Summary</h2>
            <p className="mt-1 text-sm text-gray-400">
              A quick look at your listening habits
            </p>
          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between rounded-xl bg-[#22222b] p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-500/20 p-3">
                  <Play className="text-purple-400" size={20} />
                </div>
                <div>
                  <p className="font-medium">Most Active Day</p>
                  <p className="text-xs text-gray-400">Your favourite day</p>
                </div>
              </div>
              <span className="font-semibold text-purple-400">Saturday</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#22222b] p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-pink-500/20 p-3">
                  <Clock3 className="text-pink-400" size={20} />
                </div>
                <div>
                  <p className="font-medium">Peak Listening Time</p>
                  <p className="text-xs text-gray-400">Most active hours</p>
                </div>
              </div>
              <span className="font-semibold text-pink-400">9 PM</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#22222b] p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-violet-500/20 p-3">
                  <Music2 className="text-violet-400" size={20} />
                </div>
                <div>
                  <p className="font-medium">Favourite Genre</p>
                  <p className="text-xs text-gray-400">Most played genre</p>
                </div>
              </div>
              <span className="font-semibold text-violet-400">Hip Hop</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#22222b] p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500/20 p-3">
                  <Headphones className="text-blue-400" size={20} />
                </div>
                <div>
                  <p className="font-medium">Daily Average</p>
                  <p className="text-xs text-gray-400">Listening duration</p>
                </div>
              </div>
              <span className="font-semibold text-blue-400">4.2 hrs</span>
            </div>

          </div>
        </div>
      </div>

      <p className="pb-6 text-center text-xs text-gray-600">
        SoundWave Analytics • Your music, your story.
      </p>

    </div>
  );
}