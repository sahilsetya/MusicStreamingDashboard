import { useState } from "react";
import { Search, Bell, ChevronDown, Sparkles, X } from "lucide-react";
import { songs, artists, playlists } from "../data/musicData";

function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const query = searchQuery.trim().toLowerCase();

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query) ||
      song.genre.toLowerCase().includes(query)
  );

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(query)
  );

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(query)
  );

  function handleSearch(event) {
    setSearchQuery(event.target.value);
    setShowNotifications(false);
    setShowProfile(false);
  }

  return (
    <header className="relative z-40 flex items-center justify-between gap-6 border-b border-white/10 bg-[#0b0b0f] px-8 py-5 text-white">
      {/* Welcome */}
      <div className="shrink-0">
        <h2 className="text-2xl font-bold">Good evening 👋</h2>
        <p className="mt-1 text-sm text-gray-400">
          Discover your next favourite track.
        </p>
      </div>

      {/* Search */}
      <div className="relative flex max-w-md flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#17171f] px-4 py-3">
        <Search size={20} className="shrink-0 text-gray-400" />

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search songs, artists, albums..."
          aria-label="Search music"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
            className="text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        )}

        {/* Search Results Dropdown */}
        {query && (
          <div className="absolute left-0 top-full mt-3 max-h-[420px] w-full min-w-[300px] overflow-y-auto rounded-2xl border border-white/10 bg-[#17171f] p-4 shadow-2xl">
            {filteredSongs.length === 0 &&
            filteredArtists.length === 0 &&
            filteredPlaylists.length === 0 ? (
              <div className="py-8 text-center">
                <Search className="mx-auto mb-3 text-gray-500" size={28} />
                <p className="font-medium">No results found</p>
                <p className="mt-1 text-sm text-gray-400">
                  Try another song, artist or album.
                </p>
              </div>
            ) : (
              <>
                {filteredSongs.length > 0 && (
                  <section className="mb-5">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400">
                      Songs
                    </h3>

                    <div className="space-y-3">
                      {filteredSongs.map((song) => (
                        <div
                          key={song.id}
                          className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/5"
                        >
                          <img
                            src={song.image}
                            alt=""
                            className="h-11 w-11 rounded-lg object-cover"
                          />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                              {song.title}
                            </p>
                            <p className="truncate text-xs text-gray-400">
                              {song.artist} · {song.album}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {filteredArtists.length > 0 && (
                  <section className="mb-5">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400">
                      Artists
                    </h3>

                    <div className="space-y-2">
                      {filteredArtists.map((artist) => (
                        <div
                          key={artist.id}
                          className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/5"
                        >
                          <img
                            src={artist.image}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium">
                            {artist.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {filteredPlaylists.length > 0 && (
                  <section>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-400">
                      Playlists
                    </h3>

                    {filteredPlaylists.map((playlist) => (
                      <div
                        key={playlist.id}
                        className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/5"
                      >
                        <img
                          src={playlist.image}
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {playlist.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {playlist.totalSongs} songs
                          </p>
                        </div>
                      </div>
                    ))}
                  </section>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex shrink-0 items-center gap-4">
        <button
          onClick={() => {
            setShowProfile(false);
            setShowNotifications(!showNotifications);
          }}
          aria-label="Notifications"
          className="relative rounded-xl border border-white/10 bg-[#17171f] p-3 transition hover:bg-white/10"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-purple-500" />
        </button>

        {showNotifications && (
          <div className="absolute right-24 top-20 w-64 rounded-xl border border-white/10 bg-[#17171f] p-4 shadow-2xl">
            <h3 className="font-semibold">Notifications</h3>
            <p className="mt-3 text-sm text-gray-400">
              Welcome to SoundWave! Discover new music today.
            </p>
          </div>
        )}

        <button
          aria-label="Explore premium"
          className="hidden items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold transition hover:bg-purple-500 lg:flex"
        >
          <Sparkles size={17} />
          Premium
        </button>

        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(false);
              setShowProfile(!showProfile);
            }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 font-bold">
              S
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold">Music Lover</p>
              <p className="text-xs text-gray-400">Free Account</p>
            </div>

            <ChevronDown size={16} className="hidden text-gray-400 md:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-14 w-48 rounded-xl border border-white/10 bg-[#17171f] p-2 shadow-2xl">
              <p className="border-b border-white/10 px-3 py-2 text-sm font-semibold">
                Music Lover
              </p>

              <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/10 hover:text-white">
                My Profile
              </button>

              <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/10 hover:text-white">
                Account Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;