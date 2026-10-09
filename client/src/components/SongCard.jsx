import { Play, MoreHorizontal, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

function SongCard({ song }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const liked = isFavorite(song.id);

  return (
    <div className="group min-w-0 rounded-2xl border border-white/5 bg-[#17171f] p-4 transition duration-300 hover:-translate-y-1 hover:bg-[#20202a]">
      {/* Album Cover */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl">
        <img
          src={
            song.image ||
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400"
          }
          alt={song.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <button
          aria-label={`Play ${song.title}`}
          className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-purple-600 text-white opacity-0 shadow-lg transition duration-300 hover:bg-purple-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Play size={20} fill="currentColor" />
        </button>
      </div>

      {/* Song Details */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white">
            {song.title}
          </h3>

          <p className="mt-1 truncate text-sm text-gray-400">
            {song.artist}
          </p>
        </div>

        {/* Favourite Button */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => toggleFavorite(song)}
            aria-label={
              liked
                ? `Remove ${song.title} from favourites`
                : `Add ${song.title} to favourites`
            }
            aria-pressed={liked}
            title={liked ? "Remove from favourites" : "Add to favourites"}
            className={`transition ${
              liked
                ? "text-pink-500"
                : "text-gray-500 hover:text-pink-500"
            }`}
          >
            <Heart
              size={19}
              fill={liked ? "currentColor" : "none"}
            />
          </button>

          <button
            aria-label={`More options for ${song.title}`}
            className="text-gray-500 transition hover:text-white"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SongCard;