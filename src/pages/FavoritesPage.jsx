import { Backdrop, CircularProgress } from "@mui/material";

import { useAuth } from "../context/AuthContext";
import { useDogs } from "../context/DogsContext";
import DogCard from "../components/DogCard";
import FavoritesLayout from "../layouts/FavoritesLayout";

function FavoritesPage() {
  const { loading, error, favoriteDogs } = useDogs();
  const totalFavorites = favoriteDogs.length;
  return (
    <FavoritesLayout favoriteDogs={favoriteDogs}>
      {error ? (
        <p className="error">{error}</p>
      ) : loading ? (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        favoriteDogs.map((dog) => (
          <div key={dog.id}>
            <DogCard dog={dog} />
          </div>
        ))
      )}
    </FavoritesLayout>
  );
}

export default FavoritesPage;
