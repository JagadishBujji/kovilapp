import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

const ComplaintsField = (props) => {
  const [complaint, setComplaint] = useState("");

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
        <span onClick={props.onCancel} style={{ cursor: "pointer" }}>
          <b>X</b>
        </span>
      </div>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        type="text"
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
      />
      <div className="row complaints-btn ">
        <Button
          variant="contained"
          sx={save}
          onClick={() => props.onSave(complaint)}
        >
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
