import { Play, Music2, MoreHorizontal } from "lucide-react";

function PlaylistCard({ playlist }) {
  return (
    <div className="group rounded-2xl border border-white/5 bg-[#17171f] p-4 transition duration-300 hover:-translate-y-1 hover:bg-[#20202a]">
      {/* Playlist Cover */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl">
        <img
          src={
            playlist.image ||
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400"
          }
          alt={playlist.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Play Button */}
        <button
          aria-label={`Play ${playlist.name}`}
          className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-purple-600 text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-purple-500"
        >
          <Play size={20} fill="currentColor" />
        </button>
      </div>

      {/* Playlist Information */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white">
            {playlist.name}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
            <Music2 size={15} />

            <span>
              {playlist.totalSongs ?? 0} songs
            </span>
          </div>
        </div>

        <button
          aria-label={`More options for ${playlist.name}`}
          className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}

export default PlaylistCard;