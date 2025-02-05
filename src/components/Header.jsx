import { IconButton } from "@mui/material";
import styles from "./Header.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import PetsIcon from "@mui/icons-material/Pets";
import { useDogs } from "../context/DogsContext";

function Header() {
  const { logout } = useAuth();
  const { favoriteDogs } = useDogs();
  return (
    <div className={styles.main}>
      <Link to="/search">
        <img src="./fetch-logo.png" className={styles.logo} />
      </Link>
      <div className={styles.buttons}>
        <Link to="/favorites" style={{ padding: "20px" }}>
          <Badge badgeContent={favoriteDogs.length} color="secondary">
            <PetsIcon style={{ color: "#fba91a" }} fontSize="large" />
          </Badge>
        </Link>
        <IconButton aria-label="logout">
          <LogoutIcon onClick={logout} fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
