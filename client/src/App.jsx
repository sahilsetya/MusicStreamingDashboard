
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
import Analytics from "./pages/Analytics";

import socket from "./socket";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

import { FavoritesProvider } from "./context/FavoritesContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/history" element={<History />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/tours" element={<Tours />} />

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* Unknown Routes */}
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
