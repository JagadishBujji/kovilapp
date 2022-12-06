import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function EditPincode({ getPin,formData, setPincode, setPoliticalDistrict, districtClicked }) {
  const [data, setData] = useState()
  const [skill,setSkill]=useState();
  const [showLast,setShowLast]=useState(true);
  const [isPending, setIsPending] = useState(false);
  // console.log(skill);
  React.useEffect(() => {
    // console.log(districtClicked)
    const getData = async () => {
      setIsPending(true);
      await axios.get(`https://api.postalpincode.in/postoffice/${districtClicked}`)
        .then((res) => {
          // console.log(res);
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
  }, [formData.district,districtClicked])
// },[])
  const [age, setAge] = React.useState("");
// console.log(data)
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  //   setFormData({
  //     ...formData,
  //     pincode: event.target.value
  //   })
  // };

  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>
            {showLast &&  <InputLabel id="demo-simple-select-label">Already selected pincodes{formData.pincode}</InputLabel>}

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


        {data && <>
              <Autocomplete
          multiple 
          id="tags-outlined"
          getOptionLabel={data ? (op) => op.Pincode : ""} 
          options={data} 
          filterSelectedOptions
          placeholder={formData.pincode}
          onChange={(_event, newTeam) => { 
            setSkill(newTeam);
            setPincode(newTeam)
            getPin(newTeam);
            setShowLast(false)
          }} 
          renderInput={(params) => <TextField {...params} label="Pincodes" placeholder="Favorites" />}
        />
        </>
        }

      </FormControl>}
    </Box>
  );
}
