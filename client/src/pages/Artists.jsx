import { useMemo, useState } from "react";
import {
  Search,
  Mic2,
  BadgeCheck,
  Users,
  SlidersHorizontal,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ArtistCard from "../components/ArtistCard";
import MusicPlayer from "../components/MusicPlayer";

import { artists } from "../data/musicData";

function Artists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Get available genres from artist data
  const availableGenres = useMemo(() => {
    const genres = artists.flatMap((artist) => {
      if (Array.isArray(artist.genres)) {
        return artist.genres;
      }

      if (artist.genre) {
        return [artist.genre];
      }

      return [];
    });

    return ["All", ...new Set(genres.filter(Boolean))];
  }, []);

  // Search and filter artists
  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const name = artist.name?.toLowerCase() || "";
      const genre = artist.genre?.toLowerCase() || "";
      const artistGenres = Array.isArray(artist.genres)
        ? artist.genres.join(" ").toLowerCase()
        : "";

      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        name.includes(query) ||
        genre.includes(query) ||
        artistGenres.includes(query);

      const matchesGenre =
        selectedGenre === "All" ||
        artist.genre === selectedGenre ||
        artist.genres?.includes(selectedGenre);

      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedGenre !== "All";

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Topbar />

          <div className="space-y-8 px-4 py-6 pb-32 sm:px-6 lg:px-8 lg:py-8">

            {/* Page Heading */}
            <section className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400">
                <Mic2 size={30} />
              </div>

              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  Artists
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                  Discover the artists behind your favourite music.
                </p>
              </div>
            </section>

            {/* Artists Banner */}
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-purple-900/60 to-pink-900/40 p-6 md:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Users size={32} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Discover Artists
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                    Explore your favourite artists and discover new
                    music from different genres and musical styles.
                  </p>
                </div>
              </div>
            </section>

            {/* Search Bar */}
            <section className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3 transition focus-within:border-purple-500/60">
              <Search size={20} className="shrink-0 text-gray-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search artists..."
                aria-label="Search artists"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-sm text-purple-400 transition hover:text-purple-300"
                >
                  Clear
                </button>
              )}
            </section>

            {/* Genre Filters */}
            {availableGenres.length > 1 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                  <SlidersHorizontal size={16} />
                  Filter by genre
                </div>

                <div className="flex flex-wrap gap-2">
                  {availableGenres.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => setSelectedGenre(genre)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        selectedGenre === genre
                          ? "bg-purple-600 text-white"
                          : "border border-white/10 bg-[#17171f] text-gray-400 hover:border-purple-500/50 hover:text-white"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Artist Count */}
            <section className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">
                  Popular Artists
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Showing {filteredArtists.length} of {artists.length} artists
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-purple-600/10 px-3 py-2 text-purple-400">
                <BadgeCheck size={20} />
                <span className="text-sm font-medium">
                  Featured Artists
                </span>
              </div>
            </section>

            {/* Artists Grid */}
            {filteredArtists.length > 0 ? (
              <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredArtists.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                  />
                ))}
              </section>
            ) : (
              <section className="rounded-2xl border border-white/10 bg-[#17171f] px-6 py-16 text-center">
                <Mic2
                  size={42}
                  className="mx-auto mb-4 text-gray-500"
                />

                <h3 className="text-xl font-semibold">
                  No artists found
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Try another artist name or change your filters.
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium transition hover:bg-purple-500"
                  >
                    <X size={16} />
                    Clear Filters
                  </button>
                )}
              </section>
            )}
          </div>
        </main>
      </div>

      <MusicPlayer />
    </div>
  );
}

export default Artists;