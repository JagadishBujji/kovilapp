import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DistrictSelect({formData,setFormData}) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    setFormData({
      ...formData,
      district:event.target.value
    })
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">District</InputLabel>
      <Select
      required
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="State"
        onChange={handleChange}
      >
        <MenuItem value={"Vellore"}>Vellore</MenuItem>
        <MenuItem value={"Chennai"}>Chennai</MenuItem>
      </Select>
    </FormControl>
  );
}
