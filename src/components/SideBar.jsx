import { useState } from "react";
import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import styles from "./SideBar.module.css";
import { useDogs } from "../context/DogsContext";
import SortBox from "./SortBox";
import BreedFilter from "./BreedFilter";
import AgeFilter from "./AgeFilter";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function SideBar({ handleSort }) {
  const { dogBreeds, filtersDispatch, sortOrder } = useDogs();
  const [collapse, setCollapse] = useState(false);

  function handleBreedsFilter(e) {
    filtersDispatch({ type: "breedsFilterChanged", payload: e.target.value });
  }

  function handleAgeFilter(e) {
    filtersDispatch({ type: "ageFilterChanged", payload: e.target.value });
  }

  function handleCollapse() {
    setCollapse(!collapse);
  }

  return (
    <div className={`${styles.sideBar} ${collapse ? styles.collapsed : ""}`}>
      <IconButton aria-label="delete" style={{ float: "right" }}>
        {collapse ? (
          <ExpandMoreIcon fontSize="large" onClick={handleCollapse} />
        ) : (
          <ExpandLessIcon fontSize="large" onClick={handleCollapse} />
        )}
      </IconButton>
      {collapse ? (
        <>
          <h3>Filters</h3>
        </>
      ) : (
        <>
          <SortBox handleSort={handleSort} sortOrder={sortOrder} />
          <br />
          <h3>Filters</h3>
          <hr />
          <h3>Breed ({dogBreeds.length})</h3>
          <div className={styles.breeds}>
            {dogBreeds.map((breed) => (
              <div key={breed}>
                <BreedFilter
                  breed={breed}
                  handleBreedsFilter={handleBreedsFilter}
                />
              </div>
            ))}
          </div>
          <hr />
          <AgeFilter handleAgeFilter={handleAgeFilter} />
          <Button
            variant="contained"
            endIcon={<RestartAltIcon />}
            onClick={() => filtersDispatch({ type: "resetFilters" })}
          >
            Reset Filters
          </Button>
        </>
      )}
    </div>
  );
}

export default SideBar;
