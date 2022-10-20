import { Card, } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ComplaintsField = (props) => {
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
  return (
    <Card sx={{ p: 3 }} className="complaintmodal">
        <div className="row user-tabs">
        <h4>Complaint Type</h4>
        <span onClick={props.onCancel}><b>X</b></span>
      </div>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          fullWidth
          type="text"
        />
      <div className="row complaints-btn ">
        <Button variant="contained" sx={save} onClick={props.onCancel}>
          Save
        </Button>
        <Button variant="outlined" sx={cancel} onClick={props.onCancel}>
          Cancel
        </Button>

      </div>
    </Card>
  );
};

export default ComplaintsField;
