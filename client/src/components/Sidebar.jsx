import {
  Home,
  Music2,
  Disc3,
  Mic2,
  ListMusic,
  Clock,
  BarChart3,
  Settings,
  Headphones,
  Heart,
  Ticket,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Songs", icon: Music2, path: "/songs" },
  { name: "Artists", icon: Mic2, path: "/artists" },
  { name: "Albums", icon: Disc3, path: "/albums" },
  { name: "Playlists", icon: ListMusic, path: "/playlists" },
  { name: "Favourites", icon: Heart, path: "/favorites" },
  { name: "History", icon: Clock, path: "/history" },
  { name: "Tours & Live Shows", icon: Ticket, path: "/tours" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
];

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#111116] px-5 py-6 text-white md:flex">
      {/* Logo */}
      <NavLink to="/" className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600">
          <Headphones size={25} />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-wide">SoundWave</h1>
          <p className="text-xs text-gray-400">Music Dashboard</p>
        </div>
      </NavLink>

      {/* Navigation */}
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
        Menu
      </p>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-white/10 pt-5">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-400 transition hover:bg-white/5 hover:text-white">
          <Settings size={20} />
          <span className="text-sm font-medium">Settings</span>
        </button>

        <div className="mt-5 rounded-xl bg-white/5 p-4">
          <p className="text-sm font-semibold">Premium Music</p>

          <p className="mt-1 text-xs leading-5 text-gray-400">
            Your music, your vibe. Enjoy every beat.
          </p>

          <button className="mt-3 w-full rounded-lg bg-purple-600 py-2 text-sm font-semibold transition hover:bg-purple-500">
            Explore Premium
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;