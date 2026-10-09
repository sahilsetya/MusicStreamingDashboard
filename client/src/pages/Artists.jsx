import { useState } from "react";
import { Search, Mic2, BadgeCheck, Users } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ArtistCard from "../components/ArtistCard";
import MusicPlayer from "../components/MusicPlayer";

import { artists } from "../data/musicData";

function Artists() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <Topbar />

          <div className="space-y-8 px-8 py-8 pb-32">
            {/* Page Heading */}
            <section className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400">
                <Mic2 size={30} />
              </div>

              <div>
                <h1 className="text-3xl font-bold">Artists</h1>
                <p className="mt-1 text-sm text-gray-400">
                  Discover the artists behind your favourite music.
                </p>
              </div>
            </section>

            {/* Artists Banner */}
            <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-purple-900/60 to-pink-900/40 p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <Users size={30} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Discover Artists
                  </h2>
                  <p className="mt-2 text-sm text-gray-300">
                    Find music from artists across different genres.
                  </p>
                </div>
              </div>
            </section>

            {/* Search Bar */}
            <section className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3">
              <Search size={20} className="text-gray-400" />

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
                  onClick={() => setSearchQuery("")}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Clear
                </button>
              )}
            </section>

            {/* Artist Count */}
            <section className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Popular Artists</h2>
                <p className="mt-1 text-sm text-gray-400">
                  {filteredArtists.length} artists found
                </p>
              </div>

              <BadgeCheck size={23} className="text-purple-400" />
            </section>

            {/* Artists Grid */}
            {filteredArtists.length > 0 ? (
              <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
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
                  Try searching for another artist.
                </p>
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
