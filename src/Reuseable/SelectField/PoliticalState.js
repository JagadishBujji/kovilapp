import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Country, State, City }  from 'country-state-city';


// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city'
import { useState } from 'react';

export default function PoliticalState({setSelectState}) {
  const [age, setAge] = React.useState('');
  // console.log(Country.getAllCountries())
  const [allStates,setAllStates]=useState(State.getStatesOfCountry("IN"))
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event.target.value)
    setSelectState(event.target.value)
  }; 

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{width: "100%", mr: 2, mb: 2, mt: 2}}>
        <InputLabel id="demo-simple-select-label">{age?"State":"Tamil nadu"}</InputLabel>
     {allStates &&   <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age} 
          label="State"
          onChange={handleChange}
          sx={{fontFamily: "sans-serif", textAlign: "left"}}
        >
          <MenuItem value={"none"}>None</MenuItem>
          {/* <MenuItem value={"All"}>All</MenuItem> */}
          {/* <MenuItem value={"Tamil nadu"} selected>Tamil Nadu</MenuItem>
          <MenuItem value={"Andhra Pradesh"}>Andra Pradesh</MenuItem>
          <MenuItem value={"Uttra Pradesh"}>Uttra Pradesh</MenuItem> */}
          {allStates.map((state)=>(
       <MenuItem value={state.name} selected>{state.name}</MenuItem>
          ))}
        </Select>}
      </FormControl>
    </Box>
  );
}
