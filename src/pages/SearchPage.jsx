import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useDogs } from "../context/DogsContext";
import DogCard from "../components/DogCard";
import styles from "./SearchPage.module.css";
import HomeLayout from "../layouts/HomeLayout";
import { Backdrop, CircularProgress } from "@mui/material";

function SearchPage() {
  const { allDogsList, fetchAllDogs, loading, error, sortOrder, setSortOrder } =
    useDogs();

  function handleNavigate(step) {
    fetchAllDogs(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSort(direction) {
    setSortOrder(direction);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <HomeLayout
      handleNavigate={handleNavigate}
      handleSort={handleSort}
      sortOrder={sortOrder}
    >
      {error ? (
        <p className="error">{error}</p>
      ) : loading ? (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : allDogsList.length > 0 ? (
        allDogsList.map((dog) => (
          <div key={dog.id}>
            <DogCard dog={dog} />
          </div>
        ))
      ) : (
        <p>No dogs found. Please try a different filter.</p>
      )}
    </HomeLayout>
  );
}

export default SearchPage;
