import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({formData,setFormData}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
      setAge(event.target.value); 
      setFormData({
        ...formData,
        role:event.target.value
      }) 
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          required
          value={formData.role}
          label="Select Role"
          onChange={handleChange}
          
        >
          {/* <MenuItem value={"Admin"}>Admin</MenuItem> */}
          <MenuItem value={"Sub-Admin"}>Sub-Admin</MenuItem>
        
        </Select>
      </FormControl>
    </Box>
  );
}
