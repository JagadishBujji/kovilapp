import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function StateSelect({allStates, formData,setFormData,setStateClicked}) {
  const [age, setAge] = React.useState("");
  
  const handleChange = (event) => { 
    setAge(event.target.value);
    setStateClicked(event.target.value)
    setFormData({
      ...formData,
      state:event.target.value
    }) 
  };
  const styles={
    width:"20%",
    margin:"20px"
  }
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">State</InputLabel>
     {allStates && <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={formData.state}
        required
        label="State"
        onChange={handleChange}
      >
        {/* <MenuItem value={"Tamil-nadu"}>Tamil Nadu</MenuItem>
        <MenuItem value={"kerala"}>kerala</MenuItem>
         */}
         {allStates.map((state)=>(
        <MenuItem value={state.name}>{state.name}</MenuItem>
         ))}
      </Select>}
    </FormControl>
  );
}
