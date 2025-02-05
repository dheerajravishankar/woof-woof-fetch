import { Button } from "@mui/material";
import DogsCount from "../components/DogsCount";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import styles from "./FavoritesLayout.module.css";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useDogs } from "../context/DogsContext";
import Match from "../components/Match";
import { useState } from "react";

function HomeLayout({ children, favoriteDogs }) {
  const { getMatchedDog, match } = useDogs();
  const [open, setOpen] = useState(false);
  const count = favoriteDogs.length;

  function handleMatch() {
    setOpen(true);
    if (favoriteDogs.length > 0) {
      getMatchedDog();
    }
  }

  return (
    <div className={styles.allDogs}>
      <Header />
      <div className={styles.dogsCount}>
        <DogsCount count={count} />
        {count > 0 && (
          <Button
            variant="contained"
            style={{ backgroundColor: "green" }}
            onClick={handleMatch}
            startIcon={<AutoFixHighIcon />}
          >
            Find my match
          </Button>
        )}
        <Match open={open} handleClose={() => setOpen(false)} />
      </div>
      <div className={styles.findMatch}></div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}

export default HomeLayout;
