import { Card, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import country_state_district from "country_state_district";

// import "../../src/styles.css"; 
import "../../../src/styles.css"
import DistrictSelect from '../AddDistrict/DistrictSelect'
import PoliticalState from "../SelectField/PoliticalState";
import DistrictName from "../SelectField/DistrictName";
import Pincode from "../SelectField/Pincode";
import StateSelect from "../AddDistrict/StateSelect";   
import { FormatColorFill } from "@mui/icons-material";
import EditDistrict from "./EditDistrict";
import EditPDistrict from "../EditpoliticalModal/EditPDistrict";
import EditPincode from "../EditpoliticalModal/EditPincode";

// Add a new document with a generated id.

const EditPoliticalModal = (props) => {
  // console.log(props.data);
  //   const navigate = useNavigate();
  const [allStates, setAllStates] = useState();
  const [stateClicked, setStateClicked] = useState()
  const [count, setCount] = useState(0);
  const [data, setData] = useState();
  const [districtClicked,setDistrictClicked]=useState(props?.data?.district)
  const [isPending,setIsPending]=useState(false)
  const [pincode,setPincode]=useState();
  const [politicalDistrict,setPoliticalDistrict]=useState();
  var milliseconds = (new Date).getTime();
  const [formData, setFormData] = useState({
    state: props.data.state,
    district: props.data.district,
    politicalDistrict: props.data.politicalDistrict,
    pincode:props.data.pincode,
    posted_on_timestamp:milliseconds

  })

  useEffect(() => {
    const states = country_state_district.getAllStates();
    setAllStates(states);
    // setDistrictClicked(props?.data.district)
  }, []);

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
  // var milliseconds = new Date().getTime();
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (props.forWhat === "createType") {
  //     try {
  //       const docRef = await addDoc(collection(db, "complaint_types"), {
  //         complaint_type: complaintType,
  //         posted_on: milliseconds,
  //       });
  //       console.log("Document written with ID: ", docRef.id);
  //       props.setCount(props.count + 1);
  //       alert("type added successfully");
  //       props.onCancel();
  //     } catch (err) {
  //       props.setCount(props.count + 1);
  //       console.log(err);
  //       alert(err);
  //       props.onCancel();
  //     }
  //   } else if (props.forWhat === "editType") {
  //     const docRef = doc(db, "complaint_types", props.data.more);

  //     await updateDoc(docRef, {
  //       complaint_type: complaintType,
  //       posted_on: milliseconds,
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         props.setCount(props.count + 1);
  //         alert("updated successfully");
  //         props.onCancel();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         alert(err);
  //         props.onCancel();
  //       });
  //   }
  // };
const handleSubmit=async(e)=>{
  e.preventDefault() 
  console.log(formData);
  if(formData.state && formData.district && formData.pincode && formData.politicalDistrict)
  {
    const typ=typeof(formData.pincode)
    // console.log(typeof(formData.pincode))
  if(typ==="string")
  {
    // alert("string")
    const arr=formData.pincode.split(" ") 
        const fs=arr.slice(1) 
        formData.pincode=fs
        console.log(formData)
        const docRef = doc(db, "political_districts", props.data.more)
    
      setIsPending(true);
      await updateDoc(docRef, formData)
        .then((res) => {
          console.log(res);
          props.setCount(props.count + 1)
          alert("updated successfully")
          props.onCancel()
  
        }).catch((err) => {
          console.log(err);
          alert(err);
          props.onCancel()
        }).finally(()=>{
          setIsPending(false);
        })
  }
  else{
    const docRef = doc(db, "political_districts", props.data.more)
  
    setIsPending(true);
    await updateDoc(docRef, formData)
      .then((res) => {
        console.log(res);
        props.setCount(props.count + 1)
        alert("updated successfully")
        props.onCancel()

      }).catch((err) => {
        console.log(err);
        alert(err);
        props.onCancel()
      }).finally(()=>{
        setIsPending(false);
      })
  }
  // if(typeof(formData.pincode=="string"))
  //   {
  //     const arr=formData.pincode.split(" ") 
  //     const fs=arr.slice(1) 
  //     formData.pincode=fs
  //     console.log(formData)
  //     const docRef = doc(db, "political_districts", props.data.more)
  
  //   setIsPending(true);
  //   await updateDoc(docRef, formData)
  //     .then((res) => {
  //       console.log(res);
  //       props.setCount(props.count + 1)
  //       alert("updated successfully")
  //       props.onCancel()

  //     }).catch((err) => {
  //       console.log(err);
  //       alert(err);
  //       props.onCancel()
  //     }).finally(()=>{
  //       setIsPending(false);
  //     })
  //   }
  //   else if(typeof(formData.pincode=="object")){
      
  //   const docRef = doc(db, "political_districts", props.data.more)
  
  //   setIsPending(true);
  //   await updateDoc(docRef, formData)
  //     .then((res) => {
  //       console.log(res);
  //       props.setCount(props.count + 1)
  //       alert("updated successfully")
  //       props.onCancel()

  //     }).catch((err) => {
  //       console.log(err);
  //       alert(err);
  //       props.onCancel()
  //     }).finally(()=>{
  //       setIsPending(false);
  //     })
  //   }
  }
  else{
    alert("select all values")
  }
  

}
 
  const getPin=(arr)=>{
   let arr2=[]
  arr.map((ar)=>{
    arr2.push(ar.Pincode);
  })
  setFormData({
    ...formData,
    pincode:arr2
  })
 } 
  return (
    <form onSubmit={handleSubmit} >
      <Card sx={{ p: 3, height: "75vh" }} className="complaintmodal">
        <div className="row user-tabs">
          <h4>Add Political District</h4>
          <span className="crossBtn" onClick={props.onCancel}>
            <b>X</b>
          </span>
        </div>
        <div className="scroll">
          {/* <PoliticalState  setSelectState={setSelectState}/> */}
          <StateSelect
              allStates={allStates}
              setStateClicked={setStateClicked}
              formData={formData}
              setFormData={setFormData}
            />
            <br/>
              <br/>
            
          {formData && allStates &&     <EditPDistrict
              setDistrictClicked={setDistrictClicked}
                allStates={allStates}
                stateClicked={stateClicked}
                formData={formData}
                setFormData={setFormData}
              /> }
          
          {/* <DistrictName selectState={selectState}/> */}
          <br/> 
            {formData &&     <EditPincode getPin={getPin} pincode={pincode} setPincode={setPincode} setPoliticalDistrict={setPoliticalDistrict} formData={formData} districtClicked={districtClicked}/>
}
        
          <br/>
          {/* <InputLabel id="demo-simple-select-label">{formData?.pincode}</InputLabel> */}

          <TextField
            id="outlined-basic"
            required
            // label="Political District"
            variant="outlined"
            placeholder="Political District"
            value={formData.politicalDistrict}
            fullWidth
            onChange={(e) => {
              setFormData({...formData,
                politicalDistrict:e.target.value});
            }}
            type="text"
          />
          
        </div>
        <div className="row complaints-btn ">
          <Button type="submit" disabled={isPending} variant="contained" sx={save}>
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

export default EditPoliticalModal;
