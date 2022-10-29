import { TextField } from "@mui/material"
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
const save = {
    backgroundColor: "#f17116",
    color: "#fff",
    m: 2,
    "&:hover": {
      backgroundColor: "#f17116",
      color: "#fff",
    },

  };

  const cancel = {
    borderColor: "#f17116",
    color: "#f17116",
    m: 2,
    "&:hover": {
        borderColor: "#f17116",
      color: "#f17116",
    },

  };


const PasswordModal = (props) => {
    return(
        <div className="Passwordmodal">
<Grid container direction={"column"} spacing={5}>
  <Grid item>
       <TextField
          id="outlined-password-input"
          label="Current Password"
          type="password"
          autoComplete="current-password"
        />
        </Grid>
  <Grid item>
         <TextField
          id="outlined-password-input"
          label="New Password"
          type="password"
          autoComplete="current-password"
        />
       </Grid>
       </Grid>
        <Button variant="contained" sx={save} onClick={props.onCancel}>
          Save
        </Button>
        <Button variant="outlined" sx={cancel} onClick={props.onCancel}>
          Cancel
        </Button>
        </div>
    )
}

export default PasswordModal;