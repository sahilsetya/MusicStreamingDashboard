import { Heart, Music2 } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import SongCard from "../components/SongCard";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-[#0b0b0f] px-8 py-8 pb-32 text-white">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500">
          <Heart size={30} fill="currentColor" />
        </div>

        <div>
          <p className="text-sm text-gray-400">Your Collection</p>
          <h1 className="text-3xl font-bold">Favourite Songs</h1>
          <p className="mt-1 text-sm text-gray-400">
            {favorites.length} saved{" "}
            {favorites.length === 1 ? "song" : "songs"}
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#17171f] px-6 py-16 text-center">
          <Music2 size={48} className="mb-4 text-gray-500" />

          <h2 className="text-xl font-semibold">
            No favourites yet
          </h2>

          <p className="mt-2 max-w-sm text-sm text-gray-400">
            Explore your dashboard and tap the heart icon on songs
            you love. They will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {favorites.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;