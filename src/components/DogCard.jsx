import styles from "./DogCard.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDogs } from "../context/DogsContext";

function DogCard({ dog }) {
  const { favoriteDogs, dogsDispatch } = useDogs();
  return (
    <div className={styles.dogItem}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 250 }} image={dog.img} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dog.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            I'm <strong>{dog.age}</strong> years old and I'm a{" "}
            <strong>{dog.breed}</strong>. If you want to take me home I'm
            located at <strong>{dog.zip_code}</strong>
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="favorite">
            {favoriteDogs.some((item) => item.id === dog.id) ? (
              <FavoriteIcon
                style={{ color: "red" }}
                fontSize="large"
                onClick={() =>
                  dogsDispatch({ type: "favoriteToggled", payload: dog })
                }
              />
            ) : (
              <FavoriteBorderIcon
                style={{ color: "red" }}
                fontSize="large"
                onClick={() =>
                  dogsDispatch({ type: "favoriteToggled", payload: dog })
                }
              />
            )}
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default DogCard;
