import { useMemo, useState } from "react";
import { Heart, Music2, Search } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MusicPlayer from "../components/MusicPlayer";
import SongCard from "../components/SongCard";

import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites } = useFavorites();
  const [search, setSearch] = useState("");

  const filteredFavorites = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return favorites;

    return favorites.filter((song) =>
      [song.title, song.artist, song.album, song.genre].some((value) =>
        String(value || "").toLowerCase().includes(query)
      )
    );
  }, [favorites, search]);

  return (
    <div className="min-h-screen bg-[#0b0914] text-white">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 pb-32">
          <Topbar />

          <div className="p-8">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500">
                <Heart size={30} fill="currentColor" />
              </div>

              <div>
                <p className="text-sm text-purple-400">
                  YOUR COLLECTION
                </p>

                <h1 className="text-3xl font-bold">
                  Favourite Songs
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                  {favorites.length} saved{" "}
                  {favorites.length === 1 ? "song" : "songs"}
                </p>
              </div>
            </div>

            {/* Favourite Stats */}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <Heart
                size={25}
                className="text-pink-400"
                fill="currentColor"
              />

              <div>
                <p className="text-2xl font-bold">
                  {favorites.length}
                </p>

                <p className="text-sm text-gray-400">
                  Total Favourites
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          {favorites.length > 0 && (
            <div className="mb-8 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
              <Search
                size={20}
                className="shrink-0 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search your favourite songs..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent py-4 text-white outline-none placeholder:text-gray-500"
              />
            </div>
          )}

          {/* Favourite Songs */}
          {filteredFavorites.length > 0 ? (
            <>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Your Favourite Tracks
                </h2>

                <span className="text-sm text-gray-400">
                  {filteredFavorites.length} songs
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {filteredFavorites.map((song, index) => (
                  <SongCard
                    key={song.id ?? index}
                    song={song}
                  />
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#15111f] px-6 py-16 text-center">
              {favorites.length === 0 ? (
                <Music2
                  size={48}
                  className="mb-4 text-gray-500"
                />
              ) : (
                <Search
                  size={48}
                  className="mb-4 text-gray-500"
                />
              )}

              <h2 className="text-xl font-semibold">
                {favorites.length === 0
                  ? "No Favourites Yet"
                  : "No Songs Found"}
              </h2>

              <p className="mt-2 max-w-sm text-sm text-gray-400">
                {favorites.length === 0
                  ? "Explore your dashboard and tap the heart icon on songs you love. They will appear here."
                  : "Try searching with a different song, artist or album."}
              </p>

              {favorites.length > 0 && (
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
      </div>

      <MusicPlayer />
    </div>
  );
}

export default Favorites;