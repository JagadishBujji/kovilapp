import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function Pincode({ getPin, setPincode, setPoliticalDistrict, districtClicked }) {
  const [data, setData] = useState()
  const [skill,setSkill]=useState();
  const [isPending, setIsPending] = useState(false);
  // console.log(skill);
  React.useEffect(() => {
    console.log(districtClicked)
    const getData = async () => {
      setIsPending(true);
      await axios.get(`https://api.postalpincode.in/postoffice/${districtClicked}`)
        .then((res) => {
          console.log(res);
          const data = res.data
          const hf = data[0].PostOffice
          // console.log(hf)
          setData(hf)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          setIsPending(false);
        })
    }
    getData();
  }, [districtClicked])
  const [age, setAge] = React.useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  //   setFormData({
  //     ...formData,
  //     pincode: event.target.value
  //   })
  // };

  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>

      {isPending ? <p>Getting data </p> : <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Pincode</InputLabel> */}
        {/* {data && <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Pincode"
          onChange={handleChange}
        > */}
          {/* <MenuItem value={"Vellore"}>Vellore</MenuItem>
          <MenuItem value={"Chennai"}>Chennai</MenuItem>
          <MenuItem value={"Madurai"}>Madurai</MenuItem> */}
          {/* {data?.map((ds) => (
            <MenuItem value={ds.Pincode}>{ds.Pincode}</MenuItem>

          ))} */}

        {/* </Select>} */}


        {data && <Autocomplete
          multiple 
          id="tags-outlined"
          getOptionLabel={data ? (op) => op.Pincode : ""} 
          options={data} 
          filterSelectedOptions
          onChange={(_event, newTeam) => { 
            setSkill(newTeam);
            setPincode(newTeam)
            getPin(newTeam);
          }} 
          renderInput={(params) => <TextField {...params} label="Pincodes" placeholder="Favorites" />}
        />
        }

      </FormControl>}
    </Box>
  );
}
