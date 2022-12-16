import { Alert, Avatar, Box, Card, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import Button from "@mui/material/Button";
import SelectField from "../Reuseable/SelectField/SelectField";
import TextField from "@mui/material/TextField";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import StateSelect from "../Reuseable/SelectField/StateSelect";
import DistrictSelect from "../Reuseable/SelectField/DistrictSelect";
import { useState } from "react";
import UserModal from "../Reuseable/UserModal/UserModal";
import TicketsBack from "../Reuseable/TicketsBack";
import { useNavigate, useParams } from "react-router-dom";
import { doc, addDoc, collection, getDoc, serverTimestamp, setDoc, query, where, getDocs, updateDoc } from 'firebase/firestore'
import { db } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL, listAll, list } from 'firebase/storage'
import country_state_district from 'country_state_district'
import { v4 } from "uuid";
import { storage } from "../services/firebase";
import EditDistrict from "../Reuseable/Edit/EditDistrict";
import { useEffect } from "react";

const EditUser = () => {
  const docId = useParams().id;
  const [data, setData] = useState();
  const [allStates, setAllStates] = React.useState();
  const [userImage, setUserImage] = React.useState();
  const [previewImage, setPreviewImage] = useState();
  const [oldImage, setOldImage] = useState();
  const [uImage, setUImage] = useState();
  // console.log(previewImage)
  // console.log(oldImage)
  const handleImage = (img) => {
    setUImage(img)
    const reader = new FileReader();
    reader.readAsDataURL(img)
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
  }
  React.useEffect(() => {
    const states = country_state_district.getAllStates()
    setAllStates(states)
  }, [])
  const [formData, setFormData] = useState({
    firstName: data?.first_name,
    lastName: "",
    role: "",
    state: "",
    district: "",
    mobile: "",
    alternateNumber: "",
    email: "",
    aadhar: "",
    doc_id: "",
    dob: "",
    uid: "",
    password: "",
    pincode: "",
    profilePic: "",
    bjp_id: "",
    is_password_changed: "",
    timestamp: "",
    politicalDistrict:""
  })
  React.useEffect(() => {
    const getDetails = async () => {
      const docRef = doc(db, "admins", docId)
      try {
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data())
        setData(docSnap.data());
        const ds = docSnap.data()
        setFormData({
          firstName: ds.first_name,
          lastName: ds.last_name,
          role: ds.role,
          mobile: ds.phone_number,
          alternateNumber: ds.alternate_number,
          email: ds.email,
          aadhar: ds.aadhar,
          state: ds.state,
          pincode: ds.pincode,
          politicalDistrict:ds.politicalDistrict,
          doc_id: ds.doc_id,
          dob: ds.dob,
          district: ds.district,
          profilePic: ds.profilePic,
          bjp_id: ds.bjp_id,
          password: ds.password,
          uid: ds.uid,
          is_password_changed: ds.is_password_changed
        })
        setPreviewImage(ds.profilePic);
        setOldImage(ds.profilePic)
      } catch (err) {
        alert("Invalid user id")
        console.log(err)
      }
    }
    getDetails();
  }, []);
  // console.log(data);

  // console.log(formData)
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false)
  const [stateClicked, setStateClicked] = useState();
  const handleClick = () => {
    setShowModal(true)
  }
  // console.log(oldImage === previewImage)
  const handleCancel = () => {
    setShowModal(false)
  }
  const deleteHandle = () => {
    navigate("/kovil/user-post")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    console.log(pdId)
    if(formData.politicalDistrict)
    {
    if (formData.mobile.length === 10 && formData.alternateNumber.length === 10) {
      
        if(previewImage===oldImage)
        { 
            setIsPending(true);
             await   setDoc(doc(db, "admins",docId),
                {
                  first_name: formData.firstName,
                  last_name: formData.lastName,
                  role: formData.role,
                  state: formData.state,
                  district: formData.district,
                  phone_number: formData.mobile,
                  alternate_number: formData.alternateNumber,
                  email: formData.email,
                  aadhar: formData.aadhar,
                  doc_id:formData.doc_id,
                  dob: formData.dob,
                  uid:formData.uid,
                  politicalDistrict:formData.politicalDistrict,
                  password:formData.password,
                  pincode: formData.pincode,
                  profilePic: formData.profilePic,
                  bjp_id:formData.bjp_id, 
                  timestamp:serverTimestamp(),
                  is_password_changed:formData.is_password_changed

                }
              )
              .then(async(res) => {
                // console.log(res);

                const washingtonRef = doc(db, "political_districts", pdId);
                await updateDoc(washingtonRef, {
                  sub_admin_uid: formData.uid,
                  sub_admin_name:formData.firstName,
                  mobile_no:formData.mobile
                  }).then((res2)=>{
                  
                setIsPending(false)
                alert("user updated")
                navigate("/kovil/user-post") 
                  }).catch((err)=>{
                    console.log(err)
                    alert(err)
                  })


              }).catch((err) => {
                setIsPending(false)
                console.log(err);
                alert("error occured")
              })       
        }
        else{
        setIsPending(true)
        const imageRef = ref(storage, `images/${uImage.name + v4()}`);
        await 
        uploadBytes(imageRef, uImage).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            const imageURL = url
            // setUserImage(imageURL)
            // console.log(url);
            setDoc(doc(db, "admins",docId),
            {
              first_name: formData.firstName,
              last_name: formData.lastName,
              role: formData.role,
              state: formData.state,
              district: formData.district,
              phone_number: formData.mobile,
              alternate_number: formData.alternateNumber,
              email: formData.email,
              aadhar: formData.aadhar,
              doc_id:formData.doc_id,
              dob: formData.dob,
              uid:formData.uid,
              password:formData.password,
              politicalDistrict:formData.politicalDistrict,
              pincode: formData.pincode,
              profilePic: imageURL,
              bjp_id:formData.bjp_id,
              timestamp:serverTimestamp(),
              is_password_changed:formData.is_password_changed,

            }
          )
          .then(async(res) => {
            const washingtonRef = doc(db, "political_districts", pdId);
            await updateDoc(washingtonRef, {
              sub_admin_uid: formData.uid,
              sub_admin_name:formData.firstName,
              mobile_no:formData.mobile
              }).then((res2)=>{
                setIsPending(false)
            alert("user updated")
            navigate("/kovil/user-post")
                console.log(res2);
              }).catch((err)=>{
                console.log(err)
                alert(err)
              })

            console.log(res);
           
          }).catch((err) => {
            setIsPending(false)
            console.log(err);
            alert("error occured")
          })
          });
        }).catch((err)=>{
          setIsPending(false)
          console.log(err);
          alert(err)
          navigate("/kovil/user-post")

        })
    }
    }
    else {
      alert("enter valid mobile number")
    }
    }
    else{
      alert("please select political district")
    }
}

const [da, setDa] = useState();
const [pd, setPd] = useState(formData.politicalDistrict);
const [pc, setPc] = useState();
const [pdId,setPdId]=useState();

useEffect(()=>{

  const getSuperAdmin = async () => {
    const docRef = collection(db, "political_districts");
    const q = query(docRef, where("district", "==", formData.district.toLowerCase()));
    // const q = query(docRef, where("district", "==", formData.district));
    const querySnapshot = await getDocs(q);
    let arr = []
    querySnapshot.forEach((doc) => {
      // console.log(doc.data())
      const document = doc;
      const obj = {
        doc_id: document.id,
        ...document.data()
      }
      // console.log(obj)
      arr.push(obj)
    })
    setDa(arr);
  }
  getSuperAdmin();

},[formData.district])
// console.log(da);
// console.log(formData.politicalDistrict)
React.useEffect(()=>{
  const getSuperAdmin=async()=>{
    const docRef=collection(db,"political_districts");
    // console.log(pd)
    const q=query(docRef,where("politicalDistrict","==",formData.politicalDistrict));
    const  querySnapshot=await getDocs(q);

     querySnapshot.forEach((doc)=>{
        // console.log(doc.data())
        const document=doc;
        const obj={
            doc_id:document.id,
            ...document.data()
        }
        // console.log(obj) 
        setPc(obj); 
    })
}
 getSuperAdmin();

},[pd,formData.district])
// console.log(pc);
  const save = {
    backgroundColor: "#f17116",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#f17116",
      color: "#fff",
    },

  };

  const uploadImage = () => {
    if (uImage) {
      const imageRef = ref(storage, `images/${uImage.name + v4()}`);
      uploadBytes(imageRef, uImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // console.log(url);
        });
      });
    }
  }
  // console.log(formData.politicalDistrict)


  return (
    <>
      {/* <Stack>
        <h1 >
          <span className="navigateArrow"
            onClick={() => {
              navigate("/kovil/user-post")
            }}
          >Users</span>  <i class="fas fa-chevron-right"></i> Edit User{" "}
        </h1>
        <form onSubmit={handleSubmit}>
          <Box>
            <Card sx={{ p: 3 }}>
              <h1>
                <b>Edit User</b>
              </h1>
              <Box sx={{ p: 3 }}>
                <div className="row">
                  <div className="col-md-6 picture">
                    {previewImage ? <img src={previewImage} width="150" alt="user image" /> : <Avatar sx={{ width: 56, height: 56 }} />}
                    <span>
                      <form action="/action_page.php">
                        <input type="file" onChange={(e) => {
                          handleImage(e.target.files[0]);
                        }} accept="image/*" id="myFile" name="filename" />
                      </form>
                    </span>
                  </div>
                  <div className="col-md-6">
                    <SelectField formData={formData} setFormData={setFormData} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      //   label="Enter First Name"
                      required
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          firstName: e.target.value
                        })
                      }}
                      variant="outlined"
                      fullWidth
                      type="text"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      //   label="Enter Last Name"
                      variant="outlined"
                      required
                      value={formData.lastName}
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          lastName: e.target.value
                        })
                      }}
                      type="text"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      //   label="Enter Mobile Number"
                      variant="outlined"
                      fullWidth
                      required
                      value={formData.mobile}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          mobile: e.target.value
                        })
                      }}
                      type="number"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      //   label="Enter Alternate Mobile Number"
                      variant="outlined"
                      required
                      value={formData.alternateNumber}
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          alternateNumber: e.target.value
                        })
                      }}
                      type="number"
                    />
                  </div>
                </div>
                <TextField
                  id="outlined-basic"
                  //   label="Enter Email ID"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.email}
                  type="email"
                  disabled
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }}
                  sx={{
                    mb: 2,
                    fontSize: "14px",
                    fontWeight: "900",
                    fontFamily: "sans-serif",
                  }}
                />
                <div className="row">
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      //   label="Enter Aadhar Number"
                      variant="outlined"
                      fullWidth
                      required
                      value={formData.aadhar}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          aadhar: e.target.value
                        })
                      }}
                      type="tel"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      required
                      value={formData.dob}
                      label=""
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dob: e.target.value
                        })
                      }}
                      type="date"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 picture">
                    <StateSelect allStates={allStates} setStateClicked={setStateClicked} formData={formData} setFormData={setFormData} />
                  </div>
                  {stateClicked ? <div className="col-md-6 picture">
                    <DistrictSelect allStates={allStates} stateClicked={stateClicked} formData={formData} setFormData={setFormData} />
                  </div> :
                    <p>Select a state to view district</p>
                  }
                </div>
                <div className="row">
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      label={formData.bjp_id ? "" : "BJP_ID"}
                      value={formData.bjp_id}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          bjp_id: e.target.value
                        })
                      }}
                      type="text"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                        mb: 8
                      }}
                    />
                  </div>
                  <div className="col-md-6 picture1">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#198754", color: "#fff", mb: 2 }}
                    >
                      + Add
                    </Button><TextField
                      id="outlined-basic"
                      //   label="ZipCode"
                      variant="outlined"
                      fullWidth
                      required
                      value={formData.zipcode}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          zipcode: e.target.value
                        })
                      }}
                      type="tel"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />

                  </div>
                </div>
                <div className="row okbutton">
                  <Button variant="text" sx={{ mr: 2 }} onClick={handleClick}>
                    Cancel
                  </Button>
                  {data && <Button type="submit"
                    disabled={isPending}
                    variant="contained" sx={save}>Update User</Button>}
                </div>
                {showModal && (
                  <UserModal onConfirm={deleteHandle} onCancel={handleCancel} />
                )}
                {showModal && <TicketsBack />}
              </Box>
            </Card>
          </Box>
        </form>
      </Stack> */}
        <Stack>
        <h1 >
          <span className="navigateArrow"
            onClick={() => {
              navigate("/kovil/user-post")
            }}
          >Users</span>  <i class="fas fa-chevron-right"></i> Edit User{" "}
        </h1>
        <form onSubmit={handleSubmit}>
          <Box>
            <Card sx={{ p: 3 }}>
              <h1>
                <b>Edit User</b>
              </h1>
              <Box sx={{ p: 3 }}>
                <div className="row">
                  <div className="col-md-6 picture">
                    {previewImage ? <img src={previewImage} width="150" alt="user image" /> : <Avatar sx={{ width: 56, height: 56 }} />}
                    <span>
                      <form action="/action_page.php">
                        <input type="file" onChange={(e) => {
                          handleImage(e.target.files[0]);
                        }} accept="image/*" id="myFile" name="filename" />
                      </form>
                    </span>
                  </div>
                  <div className="col-md-6">
                    <SelectField formData={formData} setFormData={setFormData} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      //   label="Enter First Name"
                      required
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          firstName: e.target.value
                        })
                      }}
                      variant="outlined"
                      fullWidth
                      type="text"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      //   label="Enter Last Name"
                      variant="outlined"
                      required
                      value={formData.lastName}
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          lastName: e.target.value
                        })
                      }}
                      type="text"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      //   label="Enter Mobile Number"
                      variant="outlined"
                      fullWidth
                      required
                      value={formData.mobile}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          mobile: e.target.value
                        })
                      }}
                      type="number"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      //   label="Enter Alternate Mobile Number"
                      variant="outlined"
                      required
                      value={formData.alternateNumber}
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          alternateNumber: e.target.value
                        })
                      }}
                      type="number"
                    />
                  </div>
                </div>
                <TextField
                  id="outlined-basic"
                  //   label="Enter Email ID"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.email}
                  type="email"
                  disabled
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }}
                  sx={{
                    mb: 2,
                    fontSize: "14px",
                    fontWeight: "900",
                    fontFamily: "sans-serif",
                  }}
                />
                <div className="row">
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      //   label="Enter Aadhar Number"
                      variant="outlined"
                      fullWidth
                      required
                      value={formData.aadhar}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          aadhar: e.target.value
                        })
                      }}
                      type="tel"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      required
                      value={formData.dob}
                      label=""
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dob: e.target.value
                        })
                      }}
                      type="date"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 picture">
                    <StateSelect allStates={allStates} setStateClicked={setStateClicked} formData={formData} setFormData={setFormData} />
                  </div>
                  <div className="col-md-6 picture">
                    {/* <DistrictSelect allStates={allStates} stateClicked={stateClicked} formData={formData} setFormData={setFormData} /> */}
                 {allStates && formData.state && <EditDistrict allStates={allStates} stateClicked={stateClicked} formData={formData} setFormData={setFormData}  />}
                  
                  </div>  
                 {/* {allStates && formData.state && <EditDistrict allStates={allStates} stateClicked={stateClicked} formData={formData} setFormData={setFormData}  />} */}
                </div>
                <div className="row">
                  <div className="col-md-6 picture">
                     <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{formData.politicalDistrict}</InputLabel>
                     
                      <Select 
                      required 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Political district" 
                        onChange={(e) => {
                          setPd(e.target.value.politicalDistrict)
                          setFormData({
                            ...formData,
                            politicalDistrict:e.target.value.politicalDistrict,
                            pincode:""
                          
                          })
                          setPdId(e.target.value.doc_id)
                        }}  
                        
                        >
                        {da &&
                          da.map((ad) => (
                            <MenuItem value={ad}>{ad.politicalDistrict}</MenuItem>
                          ))
                        }
                      </Select>
                       
                      </FormControl> 
                   </div>
                  {/* <div className="col-md-6 picture">
                  <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{formData.pincode}</InputLabel>

                      <Select required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Pincode"
                        onChange={(e) => {
                          setFormData({...formData,
                            pincode:e.target.value})
                        }}
                        value={formData.pincode}
                        >
                        {pc &&
                          pc.pincode.map((ad) => (
                            <MenuItem value={ad}>{ad}</MenuItem>
                          ))
                        }
                      </Select>
                      </FormControl> 
                  </div>   */}
                 {/* {allStates && formData.state && <EditDistrict allStates={allStates} stateClicked={stateClicked} formData={formData} setFormData={setFormData}  />} */}
                </div>
                
                <div className="row">
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      label={formData.bjp_id ? "" : "BJP_ID"}
                      value={formData.bjp_id}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          bjp_id: e.target.value
                        })
                      }}
                      type="text"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                        mb: 8
                      }}
                    />
                  </div>
                  {/* <div className="col-md-6 picture1">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#198754", color: "#fff", mb: 2 }}
                    >
                      + Add
                    </Button><TextField
                      id="outlined-basic"
                      //   label="ZipCode"
                      variant="outlined"
                      fullWidth
                      required
                      value={formData.zipcode}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          zipcode: e.target.value
                        })
                      }}
                      type="tel"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                      }}
                    />

                  </div> */}
                </div>
                <div className="row okbutton">
                  <Button variant="text" sx={{ mr: 2 }} onClick={handleClick}>
                    Cancel
                  </Button>
                  {data && <Button type="submit"
                    disabled={isPending}
                      // disabled
                    variant="contained" sx={save}>Update User</Button>}
                </div>
                {showModal && (
                  <UserModal onConfirm={deleteHandle} onCancel={handleCancel} />
                )}
                {showModal && <TicketsBack />}
              </Box>
            </Card>
          </Box>
        </form>
      </Stack>
    </>
  );
};

export default EditUser;
