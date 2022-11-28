import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import "../../src/styles.css";

import PoliticalState from "../Reuseable/SelectField/PoliticalState";
import DistrictName from "../Reuseable/SelectField/DistrictName";
import Pincode from "../Reuseable/SelectField/Pincode";
// Add a new document with a generated id.

const PoliticalAdd = (props) => {
  //   const navigate = useNavigate();
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
  // const [compliantType, setCompliantType] = useState({
  //   sno: "",
  //   complaints: "",
  //   more: undefined,
  // });
  const [complaintType, setCompliantType] = useState(props.data?.complaints);
  var milliseconds = new Date().getTime();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.forWhat === "createType") {
      try {
        const docRef = await addDoc(collection(db, "complaint_types"), {
          complaint_type: complaintType,
          posted_on: milliseconds,
        });
        console.log("Document written with ID: ", docRef.id);
        props.setCount(props.count + 1);
        alert("type added successfully");
        props.onCancel();
      } catch (err) {
        props.setCount(props.count + 1);
        console.log(err);
        alert(err);
        props.onCancel();
      }
    } else if (props.forWhat === "editType") {
      const docRef = doc(db, "complaint_types", props.data.more);

      await updateDoc(docRef, {
        complaint_type: complaintType,
        posted_on: milliseconds,
      })
        .then((res) => {
          console.log(res);
          props.setCount(props.count + 1);
          alert("updated successfully");
          props.onCancel();
        })
        .catch((err) => {
          console.log(err);
          alert(err);
          props.onCancel();
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ p: 3 }} className="complaintmodal">
        <div className="row user-tabs">
          <h4>Add Political District</h4>
          <span className="crossBtn" onClick={props.onCancel}>
            <b>X</b>
          </span>
        </div>
        <div className="scroll">
          <TextField
            id="outlined-basic"
            required
            label="Political District"
            variant="outlined"
            value={complaintType}
            fullWidth
            onChange={(e) => {
              setCompliantType(e.target.value);
            }}
            type="text"
          />
          <PoliticalState />
          <DistrictName />
          <Pincode />
        </div>
        <div className="row complaints-btn ">
          <Button type="submit" variant="contained" sx={save}>
            Save
          </Button>
          <Button
            type="button"
            variant="outlined"
            sx={cancel}
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default PoliticalAdd;
