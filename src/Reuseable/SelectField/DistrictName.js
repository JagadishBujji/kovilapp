import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DistrictName({selectState}) {
  console.log(selectState);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">District Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="District Name"
          onChange={handleChange}
        >
          <MenuItem value={"Vellore"}>Vellore</MenuItem>
          <MenuItem value={"Chennai"}>Chennai</MenuItem>
          <MenuItem value={"Madurai"}>Madurai</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
