import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Songs from "./pages/Songs";
import Artists from "./pages/Artists";
import Albums from "./pages/Albums";
import Playlists from "./pages/Playlists";
import History from "./pages/History";
import Favorites from "./pages/Favorites";
import Tours from "./pages/Tours";

import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/history" element={<History />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/tours" element={<Tours />} />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;