import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDogs } from "../context/DogsContext";

function AgeFilter({ handleAgeFilter }) {
  const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
  const { filtersData } = useDogs();

  return (
    <>
      <h3>Age</h3>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="age-label">Max Age</InputLabel>
          <Select
            labelId="age-label"
            id="age-select"
            value={filtersData.ageMax}
            label="Max Age"
            onChange={(e) => handleAgeFilter(e)}
          >
            {numbers.map((number) => (
              <MenuItem value={number}>{number}</MenuItem>
            ))}
            <MenuItem value="">None</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br />
      <br />
    </>
  );
}

export default AgeFilter;
