import { useMemo, useState } from "react";
import {
  History as HistoryIcon,
  Search,
  Music2,
  Play,
  Clock,
  CalendarDays,
  Trash2,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MusicPlayer from "../components/MusicPlayer";

import { songs } from "../data/musicData";

function History() {
  const [search, setSearch] = useState("");

  const [history, setHistory] = useState(() =>
    songs.map((song, index) => ({
      ...song,
      historyId: `${song.id}-${index}`,
      playedAt: [
        "Just now",
        "10 minutes ago",
        "30 minutes ago",
        "1 hour ago",
        "Yesterday",
      ][index % 5],
    }))
  );

  const filteredHistory = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return history;

    return history.filter((song) =>
      [song.title, song.artist, song.album, song.genre].some((value) =>
        String(value || "").toLowerCase().includes(query)
      )
    );
  }, [history, search]);

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your listening history?"
    );

    if (confirmed) {
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0914] text-white">
      <Sidebar />

      <main className="ml-64 min-h-screen pb-32">
        <Topbar />

        <div className="p-8">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm text-purple-400">
                YOUR LISTENING ACTIVITY
              </p>

              <h1 className="text-4xl font-bold">
                Listening History
              </h1>

              <p className="mt-2 text-gray-400">
                Revisit the songs you've been listening to.
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <HistoryIcon
                size={30}
                className="text-purple-400"
              />

              <div>
                <p className="text-2xl font-bold">
                  {history.length}
                </p>

                <p className="text-sm text-gray-400">
                  Recently Played
                </p>
              </div>
            </div>
          </div>

          {/* Search and Clear */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
              <Search
                size={20}
                className="shrink-0 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search songs, artists or albums..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent py-4 text-white outline-none placeholder:text-gray-500"
              />
            </div>

            <button
              type="button"
              onClick={clearHistory}
              disabled={history.length === 0}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-5 py-3 text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 size={18} />
              Clear History
            </button>
          </div>

          {/* History Count */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Recently Played
            </h2>

            <p className="text-sm text-gray-400">
              {filteredHistory.length} songs
            </p>
          </div>

          {/* History List */}
          {filteredHistory.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#15111f]">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_auto] border-b border-white/10 px-5 py-4 text-sm text-gray-400 sm:grid-cols-[1fr_150px_120px]">
                <span>SONG</span>

                <span className="hidden sm:block">
                  ALBUM
                </span>

                <span className="text-right">
                  PLAYED
                </span>
              </div>

              {/* Songs */}
              <div className="divide-y divide-white/5">
                {filteredHistory.map((song) => (
                  <div
                    key={song.historyId}
                    className="grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-4 transition hover:bg-white/5 sm:grid-cols-[1fr_150px_120px]"
                  >
                    {/* Song Information */}
                    <div className="flex min-w-0 items-center gap-3">
                      {song.image ? (
                        <img
                          src={song.image}
                          alt={song.title || "Song artwork"}
                          className="h-12 w-12 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-500/20">
                          <Music2 className="text-purple-400" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {song.title || "Unknown Song"}
                        </p>

                        <p className="truncate text-sm text-gray-400">
                          {song.artist || "Unknown Artist"}
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-label={`Play ${song.title || "song"}`}
                        onClick={() =>
                          alert(
                            "Demo interface: audio playback is not connected yet."
                          )
                        }
                        className="ml-auto rounded-full p-2 text-purple-400 transition hover:bg-purple-500/10"
                      >
                        <Play size={18} />
                      </button>
                    </div>

                    {/* Album */}
                    <div className="hidden min-w-0 items-center gap-2 text-sm text-gray-400 sm:flex">
                      <Music2
                        size={16}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        {song.album || "Unknown Album"}
                      </span>
                    </div>

                    {/* Played Time */}
                    <div className="flex flex-col items-end gap-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {song.playedAt}
                      </span>

                      <span className="flex items-center gap-1 sm:hidden">
                        <CalendarDays size={12} />
                        {song.genre || "Music"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border border-white/10 bg-white/5 py-16 text-center">
              <HistoryIcon
                size={48}
                className="mx-auto mb-4 text-gray-500"
              />

              <h2 className="text-xl font-semibold">
                {history.length === 0
                  ? "No Listening History"
                  : "No Songs Found"}
              </h2>

              <p className="mt-2 text-gray-400">
                {history.length === 0
                  ? "Your listening history is currently empty."
                  : "Try searching with a different song or artist."}
              </p>

              {history.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-5 rounded-lg bg-purple-600 px-5 py-2 transition hover:bg-purple-500"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
}

export default History;