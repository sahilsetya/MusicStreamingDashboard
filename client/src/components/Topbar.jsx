
import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Sparkles,
  X,
  Music,
  Pencil,
  Trash2,
  Check,
  CheckCheck,
} from "lucide-react";

import { songs, artists, playlists } from "../data/musicData";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user, logout } = useAuth();
  const { notifications, clearNotifications } = useNotifications();

  const navigate = useNavigate();

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

  function handleLogout() {
    setShowProfile(false);
    logout();
    navigate("/login", { replace: true });
  }

  const userName = user?.name || "Music Lover";
  const userRole = user?.role || "user";

  function getNotificationIcon(type) {
    if (type === "created") return <Music size={16} />;
    if (type === "updated") return <Pencil size={16} />;
    if (type === "deleted") return <Trash2 size={16} />;
    return <Bell size={16} />;
  }

  function getNotificationColor(type) {
    if (type === "created") return "text-green-400 bg-green-400/10";
    if (type === "updated") return "text-blue-400 bg-blue-400/10";
    if (type === "deleted") return "text-red-400 bg-red-400/10";
    return "text-purple-400 bg-purple-400/10";
  }

  return (
    <header className="relative z-40 flex items-center justify-between gap-6 border-b border-white/10 bg-[#0b0b0f] px-8 py-5 text-white">

      {/* Welcome */}
      <div className="shrink-0">
        <h2 className="text-2xl font-bold">
          Good evening 👋
        </h2>

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

                <p className="font-medium">
                  No results found
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Try another song, artist or album.
                </p>
              </div>
            ) : (
              <>
                {/* Songs */}
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

                {/* Artists */}
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

                {/* Playlists */}
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

        {/* Real-Time Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(false);
              setShowNotifications(!showNotifications);
            }}
            aria-label="Notifications"
            className="relative rounded-xl border border-white/10 bg-[#17171f] p-3 transition hover:bg-white/10"
          >
            <Bell size={20} />

            {/* Notification Badge */}
            {notifications.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1 text-[10px] font-bold text-white">
                {notifications.length > 99 ? "99+" : notifications.length}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#17171f] shadow-2xl sm:w-96">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <div>
                  <h3 className="font-semibold">
                    Notifications
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    {notifications.length} notifications
                  </p>
                </div>

                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="flex items-center gap-1 text-xs text-purple-400 transition hover:text-purple-300"
                  >
                    <CheckCheck size={14} />
                    Clear All
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto">

                {notifications.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <Bell
                      size={30}
                      className="mx-auto mb-3 text-gray-500"
                    />

                    <p className="text-sm font-medium">
                      No notifications yet
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      New song updates will appear here.
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex gap-3 border-b border-white/5 px-4 py-4 transition hover:bg-white/5"
                    >
                      {/* Icon */}
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${getNotificationColor(notification.type)}`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Message */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-200">
                          {notification.message}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {notification.timestamp
                            ? new Date(notification.timestamp).toLocaleTimeString()
                            : "Just now"}
                        </p>
                      </div>

                      <Check
                        size={15}
                        className="mt-1 shrink-0 text-green-400"
                      />
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 px-4 py-3 text-center">
                <p className="text-xs text-gray-500">
                  Live updates powered by Socket.IO
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Premium */}
        <button
          aria-label="Explore premium"
          className="hidden items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold transition hover:bg-purple-500 lg:flex"
        >
          <Sparkles size={17} />
          Premium
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(false);
              setShowProfile(!showProfile);
            }}
            className="flex items-center gap-3"
          >
            {/* User Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>

            {/* User Details */}
            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold">
                {userName}
              </p>

              <p className="text-xs capitalize text-gray-400">
                {userRole}
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-gray-400 md:block"
            />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-14 w-48 rounded-xl border border-white/10 bg-[#17171f] p-2 shadow-2xl">
              <p className="border-b border-white/10 px-3 py-2 text-sm font-semibold">
                {userName}
              </p>

              <p className="px-3 py-2 text-xs capitalize text-gray-400">
                Role: {userRole}
              </p>

              <button
                onClick={() => {
                  setShowProfile(false);
                  navigate("/admin");
                }}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Admin Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 transition hover:bg-white/10 hover:text-red-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
