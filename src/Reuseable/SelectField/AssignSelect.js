import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AssignSelect({subAdmins,setSelectedSubAdmin}) {
  // console.log(subAdmins)
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event.target.value)
    setSelectedSubAdmin(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{width:"300px"}}>
        <InputLabel id="demo-simple-select-label">Select SubAdmin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Select Role"
          onChange={handleChange}
        >
          {/* <MenuItem value={"Admin"}>Admin</MenuItem>
          <MenuItem value={"Sub-Admin"}>Sub-Admin</MenuItem>
         */}
         {subAdmins?.map((ss,index)=>(
          <MenuItem value={ss}>
            {ss.first_name} {ss.last_name}
          </MenuItem>
 
         ))}
        </Select>
      </FormControl>
    </Box>
  );
}
