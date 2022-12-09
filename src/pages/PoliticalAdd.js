import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { collection, addDoc, setDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import country_state_district from "country_state_district";

import "../../src/styles.css";
import DistrictSelect from '../Reuseable/AddDistrict/DistrictSelect'
import PoliticalState from "../Reuseable/SelectField/PoliticalState";
import DistrictName from "../Reuseable/SelectField/DistrictName";
import Pincode from "../Reuseable/SelectField/Pincode";
import StateSelect from "../Reuseable/AddDistrict/StateSelect";


// Add a new document with a generated id.

const PoliticalAdd = (props) => {
  //   const navigate = useNavigate();
  const [allStates, setAllStates] = useState();
  const [stateClicked, setStateClicked] = useState()
  const [count, setCount] = useState(0);
  const [data, setData] = useState();
  const [districtClicked, setDistrictClicked] = useState()
  const [isPending, setIsPending] = useState(false)
  const [pincode, setPincode] = useState();
  const [copy, setCopy] = useState(false)
  const [politicalDistrict, setPoliticalDistrict] = useState();
  var milliseconds = (new Date).getTime();
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    politicalDistrict: "",
    pincode: "",
    posted_on_timestamp: milliseconds

  })

  useEffect(() => {
    const states = country_state_district.getAllStates();
    setAllStates(states);
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
  var milliseconds = new Date().getTime();
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
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    setIsPending(true);
    await getDocs(collection(db, "political_districts"))
      .then((querySnapshot) => {
        let arr = []
        querySnapshot.forEach((doc) => {
          let arr2 = doc.data().pincode;
          arr2.forEach((a) => {
            arr.push(a);
          })

        });
        // console.log(arr);
        let arr1 = formData.pincode
        const found = arr1.some(r => {
          // console.log(arr.indexOf(r))
          if (arr.indexOf(r) >= 0) {
            alert(`${arr[arr.indexOf(r)]} already tagged please select another pinocde`)
          }
          return arr.indexOf(r) >= 0
        })
        if (!found) {
          setIsPending(true);
          addDoc(collection(db, "political_districts"), formData).then((res) => {
            // setCount(count+1)
            props.setCount(props.count + 1)
            alert("successfully added")
            props.onCancel();
            console.log(res);
          }).catch((err) => {
            setIsPending(false);

            alert(err);
            console.log(err)
          }).finally(() => {
            setIsPending(false);
          })
        }
      })
      .catch((e) => console.log(e)).finally(() => {
        setIsPending(false);
      })

    // console.log(formData)
    // setIsPending(true);
    // await addDoc(collection(db, "political_districts"),formData).then((res)=>{
    //   // setCount(count+1)
    //   props.setCount(props.count+1)
    //   alert("successfully added")
    //   props.onCancel();
    //   console.log(res);
    // }).catch((err)=>{
    //   alert(err);
    //   console.log(err)
    // }).finally(()=>{
    // setIsPending(false);
    // })

  }
  // const getDist=(pc)=>{



  //   let arr=[]
  //   pc.map((p)=>{
  //     arr.push(p.Pincode);
  //   })
  //   setFormData({
  //     ...formData,
  //     pincode:arr
  //   })
  // }
  const getPin = (arr) => {
    let arr2 = []
    arr.map((ar) => {
      arr2.push(ar.Pincode);
    })
    setFormData({
      ...formData,
      pincode: arr2
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
          <br />
          <br />
          {stateClicked ? (
            <DistrictSelect
              setDistrictClicked={setDistrictClicked}
              allStates={allStates}
              stateClicked={stateClicked}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <p style={{ marginTop: "20px", marginRight: "4px" }}>Select a state to view district</p>
          )}
          {/* <DistrictName selectState={selectState}/> */}
          <br />
          {districtClicked ? (
            <Pincode getPin={getPin} pincode={pincode} setPincode={setPincode} setPoliticalDistrict={setPoliticalDistrict} districtClicked={districtClicked} />
          ) : (
            <p style={{ marginTop: "20px", marginRight: "4px" }}>Select a district to view pincodes</p>
          )}

          <br />
          <TextField
            id="outlined-basic"
            required
            // label="Political District"
            variant="outlined"
            placeholder="Political District"
            value={formData.politicalDistrict}
            fullWidth
            onChange={(e) => {
              setFormData({
                ...formData,
                politicalDistrict: e.target.value
              });
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

export default PoliticalAdd;
