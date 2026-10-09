import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("soundwave-favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "soundwave-favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function toggleFavorite(song) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (item) => item.id === song.id
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (item) => item.id !== song.id
        );
      }

      return [...currentFavorites, song];
    });
  }

  function isFavorite(songId) {
    return favorites.some((song) => song.id === songId);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}