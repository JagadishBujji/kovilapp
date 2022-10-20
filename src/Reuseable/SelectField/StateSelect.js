import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function StateSelect({formData,setFormData}) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    setFormData({
      ...formData,
      state:event.target.value
    })
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">State</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        required
        label="State"
        onChange={handleChange}
      >
        <MenuItem value={"Tamil-nadu"}>Tamil Nadu</MenuItem>
        <MenuItem value={"kerala"}>kerala</MenuItem>
      </Select>
    </FormControl>
  );
}
