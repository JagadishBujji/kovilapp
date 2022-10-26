import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function StateOption({setSelectState}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    setSelectState(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{width: "100%", mr: 2}}>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="State"
          onChange={handleChange}
          sx={{fontFamily: "sans-serif"}}
        >
          <MenuItem value={""}>None</MenuItem>
          <MenuItem value={"Tamil Nadu"}>Tamil Nadu</MenuItem>
          <MenuItem value={"Andhra Pradesh"}>Andra Pradesh</MenuItem>
          <MenuItem value={"Uttra Pradesh"}>Uttra Pradesh</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
