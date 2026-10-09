import { useState } from "react";
import {
  MapPin,
  CalendarDays,
  Clock,
  Ticket,
  Music2,
  Search,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MusicPlayer from "../components/MusicPlayer";

const tours = [
  {
    id: 1,
    name: "Rap Night Live",
    artist: "Underground Kings",
    date: "25 October 2026",
    time: "7:00 PM",
    location: "Mumbai, Maharashtra",
    venue: "Phoenix Arena",
    genre: "Hip-Hop",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900",
    description:
      "Experience an unforgettable night of hip-hop, rap battles and live performances.",
  },
  {
    id: 2,
    name: "Indie Music Festival",
    artist: "The Indie Collective",
    date: "2 November 2026",
    time: "5:30 PM",
    location: "Pune, Maharashtra",
    venue: "Riverside Grounds",
    genre: "Indie",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900",
    description:
      "Discover emerging artists and enjoy a night full of independent music.",
  },
  {
    id: 3,
    name: "Electronic Dreams",
    artist: "DJ Nova",
    date: "10 November 2026",
    time: "8:00 PM",
    location: "Goa, India",
    venue: "Sunset Beach Arena",
    genre: "Electronic",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900",
    description:
      "Enjoy electronic beats, immersive lights and an energetic DJ experience.",
  },
  {
    id: 4,
    name: "Unplugged Sessions",
    artist: "Acoustic Stories",
    date: "15 November 2026",
    time: "6:00 PM",
    location: "Delhi, India",
    venue: "The Music Lounge",
    genre: "Acoustic",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900",
    description:
      "Experience soulful vocals and acoustic performances in an intimate setting.",
  },
  {
    id: 5,
    name: "Rock Revolution",
    artist: "The Midnight Crew",
    date: "22 November 2026",
    time: "7:30 PM",
    location: "Bengaluru, Karnataka",
    venue: "LiveWire Stadium",
    genre: "Rock",
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=900",
    description:
      "Get ready for powerful guitars, live drums and a night of rock music.",
  },
  {
    id: 6,
    name: "R&B Soul Night",
    artist: "Velvet Sounds",
    date: "30 November 2026",
    time: "6:30 PM",
    location: "Hyderabad, Telangana",
    venue: "Rhythm Hall",
    genre: "R&B",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900",
    description:
      "Relax with smooth R&B melodies, soulful vocals and live music.",
  },
];

function Tours() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [registered, setRegistered] = useState([]);

  const genres = [
    "All",
    "Hip-Hop",
    "Indie",
    "Electronic",
    "Acoustic",
    "Rock",
    "R&B",
  ];

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.name.toLowerCase().includes(search.toLowerCase()) ||
      tour.artist.toLowerCase().includes(search.toLowerCase()) ||
      tour.location.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || tour.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const handleRegister = (tourId) => {
    setRegistered((previous) =>
      previous.includes(tourId)
        ? previous
        : [...previous, tourId]
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0b14] text-white">
      <Sidebar />

      <main className="min-h-screen pb-32 md:ml-64">
        <Topbar />

        <div className="px-5 py-8 md:px-10">
          {/* Page Heading */}
          <section className="mb-8">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-purple-400">
              <Music2 size={18} />
              LIVE MUSIC EXPERIENCE
            </p>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Artist Tours &{" "}
              <span className="text-purple-400">Live Shows</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
              Discover upcoming concerts, explore live performances
              and find your next unforgettable music experience.
            </p>
          </section>

          {/* Banner */}
          <section className="relative mb-10 overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-r from-purple-950 via-indigo-950 to-[#17112b] p-7 md:p-10">
            <div className="relative z-10 max-w-xl">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-purple-200">
                YOUR NEXT LIVE EXPERIENCE
              </span>

              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                Feel the music.
                <br />
                Live the moment.
              </h2>

              <p className="mt-4 text-sm leading-6 text-gray-300">
                From underground rap nights to unforgettable live
                concerts, discover music beyond your headphones.
              </p>

              <a
                href="#upcoming-tours"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-3 text-sm font-semibold transition hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <Ticket size={18} />
                Explore Shows
              </a>
            </div>

            <Music2
              size={180}
              className="absolute -right-5 -bottom-8 hidden rotate-12 text-white/5 md:block"
            />
          </section>

          {/* Search */}
          <section className="mb-8">
            <div className="relative max-w-xl">
              <Search
                size={19}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="Search shows, artists or cities..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#151522] py-3.5 pr-4 pl-12 text-sm outline-none transition placeholder:text-gray-500 focus:border-purple-500"
              />
            </div>
          </section>

          {/* Genre Filters */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedGenre === genre
                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20"
                      : "border border-white/10 bg-[#151522] text-gray-400 hover:border-purple-400/50 hover:text-white"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </section>

          {/* Tours Grid */}
          <section id="upcoming-tours">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">
                  Upcoming Shows
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Find your next music experience.
                </p>
              </div>

              <span className="rounded-lg border border-white/10 bg-[#151522] px-3 py-2 text-sm text-gray-400">
                {filteredTours.length} shows
              </span>
            </div>

            {filteredTours.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#151522] px-5 py-14 text-center">
                <Search
                  size={35}
                  className="mx-auto mb-4 text-gray-600"
                />

                <h3 className="text-lg font-semibold">
                  No shows found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try another artist, city or music genre.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTours.map((tour) => (
                  <article
                    key={tour.id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151522] transition duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-xl hover:shadow-purple-950/30"
                  >
                    {/* Event Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                      <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                        {tour.genre}
                      </span>

                      <span className="absolute right-4 bottom-4 left-4 text-lg font-bold">
                        {tour.name}
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="p-5">
                      <p className="mb-4 text-sm font-medium text-purple-300">
                        {tour.artist}
                      </p>

                      <p className="mb-5 min-h-12 text-sm leading-6 text-gray-400">
                        {tour.description}
                      </p>

                      <div className="space-y-3 border-t border-white/10 pt-4 text-sm text-gray-300">
                        <div className="flex items-center gap-3">
                          <CalendarDays
                            size={17}
                            className="shrink-0 text-purple-400"
                          />
                          <span>{tour.date}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <Clock
                            size={17}
                            className="shrink-0 text-purple-400"
                          />
                          <span>{tour.time}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <MapPin
                            size={17}
                            className="shrink-0 text-purple-400"
                          />
                          <span>
                            {tour.venue}, {tour.location}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRegister(tour.id)}
                        disabled={registered.includes(tour.id)}
                        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          registered.includes(tour.id)
                            ? "cursor-default border border-green-500/30 bg-green-500/10 text-green-400"
                            : "bg-purple-500 text-white hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-500/20"
                        }`}
                      >
                        <Ticket size={17} />

                        {registered.includes(tour.id)
                          ? "Registration Selected ✓"
                          : "Register Interest"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Note */}
          <p className="mt-8 text-xs leading-5 text-gray-600">
            Demo project: show details are sample data. The registration
            button demonstrates frontend interaction; it does not book
            actual tickets.
          </p>
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
}

export default Tours;