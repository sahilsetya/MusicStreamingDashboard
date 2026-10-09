import { Play, BadgeCheck } from "lucide-react";

function ArtistCard({ artist }) {
  return (
    <div className="group rounded-2xl border border-white/5 bg-[#17171f] p-5 text-center transition duration-300 hover:-translate-y-1 hover:bg-[#20202a]">
      {/* Artist Image */}
      <div className="relative mx-auto mb-4 h-28 w-28">
        <img
          src={
            artist.image ||
            "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400"
          }
          alt={artist.name}
          className="h-full w-full rounded-full border-2 border-white/10 object-cover transition duration-300 group-hover:border-purple-500"
        />

        {/* Play Button */}
        <button
          aria-label={`Play ${artist.name}`}
          className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition hover:bg-purple-500"
        >
          <Play size={16} fill="currentColor" />
        </button>
      </div>

      {/* Artist Name */}
      <div className="flex items-center justify-center gap-1">
        <h3 className="truncate font-semibold text-white">
          {artist.name}
        </h3>

        {artist.verified && (
          <BadgeCheck
            size={17}
            className="shrink-0 text-purple-400"
          />
        )}
      </div>

      {/* Artist Information */}
      <p className="mt-2 text-sm text-gray-400">
        {artist.followers || "Popular Artist"}
      </p>

      <button className="mt-4 rounded-full border border-purple-500/50 px-5 py-2 text-sm font-medium text-purple-300 transition hover:bg-purple-600 hover:text-white">
        View Artist
      </button>
    </div>
  );
}

export default ArtistCard;