import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDogs } from "../context/DogsContext";

function BreedFilter({ breed, handleBreedsFilter }) {
  const { filtersData } = useDogs();
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox />}
        value={breed}
        label={breed}
        checked={filtersData.breeds.includes(breed)}
        onChange={(e) => handleBreedsFilter(e)}
      />
    </FormGroup>
  );
}

export default BreedFilter;
