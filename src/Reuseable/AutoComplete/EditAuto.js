import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack"; 

export default function EditAuto({getPin,FormData}) {
  const [pins,setPins]=React.useState([])
  console.log(pins)
  const [pincode,setPincode]=React.useState()
  console.log(pincode)
  return (
    <Stack spacing={3} fullWidth sx={{ mt: 3, mb: 2 }}>
      <Autocomplete
        multiple 
        id="tags-outlined"
        options={pins}
        onChange={(_event, newTeam) => {  
          setPincode(newTeam) 
          getPin(newTeam)

        }} 
        // getOptionLabel={(option) => option.title}
        getOptionLabel={(option) => option}
        defaultValue={[arr[1]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            type="number"
            label="Add pincodes"
            // onChange={(e)=>{
            //   const val=e.target.value;
            //   if(val.length===6)
            //   {
            //     setPins((prev)=>[...prev,{title:val}])
            //   }
            // }}
            
            onChange={(e)=>{
              const val=e.target.value;
              if(val.length===6)
              {
                setPins((prev)=>[...prev,val])
              }
            }}
            placeholder="Favorites"
          />
        )}
      />
    </Stack>
  );
}

const arr=[12344,12344]
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
 
