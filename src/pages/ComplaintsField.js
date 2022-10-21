import { Card, } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { collection, addDoc,setDoc,doc } from "firebase/firestore"; 

import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
// Add a new document with a generated id.

const ComplaintsField = (props) => {
  const navigate=useNavigate();
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
  const [compliantType,setCompliantType]=useState()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    let NewArray=[...props.eData,compliantType]
    console.log(NewArray)
    try{
      await setDoc(doc(db, "complaint_types", "complaint"), {NewArray});
      alert("Compliant type added")
      props.setRefresh(props.refresh+1)
      props.onCancel()
    }
    catch(err){
      console.log(err)
      alert(err)
      props.setRefresh(props.refresh+1)
      props.onCancel()

    }
  }
  return (
      <form onSubmit={handleSubmit}>
    <Card sx={{ p: 3 }} className="complaintmodal">
        <div className="row user-tabs">
        <h4>Complaint Type</h4>
        <span className = "crossBtn" onClick={props.onCancel}><b>X</b></span>
      </div>
        <TextField
          id="outlined-basic"
          required
          label=""
          variant="outlined"
          fullWidth
          type="text"
          onChange={(e)=>{
            setCompliantType(e.target.value)
          }}
        />
      <div className="row complaints-btn ">
        <Button type="submit" variant="contained" sx={save}  >
          Save
        </Button>
        <Button type="button" variant="outlined" sx={cancel} onClick={props.onCancel}>
          Cancel
        </Button>
      </div>
    </Card>
</form>
  );
};

export default ComplaintsField;
