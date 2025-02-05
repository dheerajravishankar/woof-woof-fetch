import styles from "./Footer.module.css";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function Footer({ handleNavigate }) {
  return (
    <div className={styles.footer}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => handleNavigate("prev")}
      >
        Prev Page
      </Button>
      <Button
        variant="contained"
        endIcon={<ArrowForwardIosIcon />}
        onClick={() => handleNavigate("next")}
      >
        Next Page
      </Button>
      <br />
      <br />
    </div>
  );
}

export default Footer;
