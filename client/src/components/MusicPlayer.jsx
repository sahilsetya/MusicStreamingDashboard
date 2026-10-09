import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Volume2,
  Heart,
  ListMusic,
} from "lucide-react";

import { useState } from "react";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(70);

  return (
    <footer className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between gap-6 border-t border-white/10 bg-[#111116]/95 px-6 py-4 text-white backdrop-blur-xl">

      {/* Song Information */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200"
          alt="Album cover"
          className="h-14 w-14 rounded-xl object-cover"
        />

        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold">
            Midnight Vibes
          </h4>

          <p className="truncate text-xs text-gray-400">
            The Weeknd
          </p>
        </div>

        <button
          aria-label="Like song"
          className="ml-2 hidden text-gray-400 transition hover:text-pink-500 sm:block"
        >
          <Heart size={19} />
        </button>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-1 flex-col items-center gap-2">
        <div className="flex items-center gap-5">
          <button
            aria-label="Shuffle"
            className="hidden text-gray-400 transition hover:text-purple-400 sm:block"
          >
            <Shuffle size={18} />
          </button>

          <button
            aria-label="Previous song"
            className="text-gray-300 transition hover:text-white"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>

          <button
            aria-label="Next song"
            className="text-gray-300 transition hover:text-white"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>

          <button
            aria-label="Repeat"
            className="hidden text-gray-400 transition hover:text-purple-400 sm:block"
          >
            <Repeat size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex w-full max-w-md items-center gap-3">
          <span className="text-xs text-gray-400">1:24</span>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(event) => setProgress(Number(event.target.value))}
            aria-label="Song progress"
            className="h-1 w-full cursor-pointer accent-purple-500"
          />

          <span className="text-xs text-gray-400">3:45</span>
        </div>
      </div>

      {/* Volume and Playlist */}
      <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
        <button
          aria-label="Open playlist"
          className="text-gray-400 transition hover:text-white"
        >
          <ListMusic size={20} />
        </button>

        <Volume2 size={20} className="text-gray-400" />

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Volume"
          className="w-24 cursor-pointer accent-purple-500"
        />
      </div>
    </footer>
  );
}

export default MusicPlayer;