import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import country_state_district from 'country_state_district'


export default function DistrictSelect({ allStates, formData, setFormData, stateClicked }) {
  const [age, setAge] = React.useState("");
  const [allDistricts, setAllDistricts] = React.useState()

  // console.log(stateClicked)
  const handleChange = (event) => {
    setAge(event.target.value);
    setFormData({
      ...formData,
      district: event.target.value
    })
  };

  const ds = allStates.filter((as) => {
    return as.name === stateClicked
  })
  // console.log(ds[0].id)
  React.useEffect(() => {
    let districts = country_state_district.getDistrictsByStateId(ds[0].id);
    setAllDistricts(districts)

  }, [stateClicked])

  // console.log(allDistricts)
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">District</InputLabel>
      <Select
        required
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={formData.district}
        label="State"
        onChange={handleChange}
      >
        {/* <MenuItem value={"Vellore"}>Vellore</MenuItem>
        <MenuItem value={"Chennai"}>Chennai</MenuItem> */}
        {allDistricts &&
          allDistricts.map((ad) => (
            <MenuItem value={ad.name}>{ad.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
