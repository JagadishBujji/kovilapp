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
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js'
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  query,
  getDocs,
  where,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../services/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import country_state_district from "country_state_district";
import { v4 } from "uuid";
import { storage } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";

const AddUser = () => {
  const [allStates, setAllStates] = React.useState();
  const [userImage, setUserImage] = React.useState();
  const [previewImage, setPreviewImage] = useState();
  const [uImage, setUImage] = useState();
  const handleImage = (img) => {
    setUImage(img);
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };
  const [error, setError] = useState();
  const [setPassword, setPasswordError] = useState();
  React.useEffect(() => {
    const states = country_state_district.getAllStates();
    setAllStates(states);
  }, []);
  const pass = Math.floor(Math.random() * 10000000000);
  // var ciphertext = CryptoJS.AES.encrypt(String(pass), '123243').toString();
  // console.log(ciphertext)
  // console.log(pass)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    mobile: "",
    alternateNumber: "",
    email: "",
    aadhar: "",
    state: "",
    // zipcode: "",
    dob: "",
    district: "",
    password: pass,
    bjp_id: "",
    politicalDistrict:"",
    pincode:""
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [stateClicked, setStateClicked] = useState();
  const [pdId,setPdId]=useState();
  console.log(pdId);
  const handleClick = () => {
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const deleteHandle = () => {
    navigate("/kovil/user-post");
  };
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      formData.mobile.length === 10 &&
      formData.alternateNumber.length === 10
    ) {
      if (uImage) {
        setIsPending(true);
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        )
          .then((res) => {
            setIsPending(true);

            const userId = res.user.uid;
            console.log(userId);
            const imageRef = ref(storage, `images/${uImage.name + v4()}`);
            uploadBytes(imageRef, uImage).then((snapshot) => {
              getDownloadURL(snapshot.ref).then((url) => {
                setIsPending(true);

                const imageURL = url;
                setDoc(doc(db, "admins", userId), {
                  first_name: formData.firstName,
                  last_name: formData.lastName,
                  role: formData.role,
                  state: formData.state,
                  district: formData.district,
                  phone_number: formData.mobile,
                  alternate_number: formData.alternateNumber,
                  email: formData.email,
                  aadhar: formData.aadhar,
                  doc_id: userId,
                  dob: formData.dob,
                  politicalDistrict:formData.politicalDistrict,
                  uid: userId,
                  password: formData.password,
                  pincode: formData.pincode,
                  profilePic: imageURL,
                  bjp_id: formData.bjp_id,
                  timestamp: serverTimestamp(),
                  is_password_changed: false,
                })
                  .then(async (res) => {
                    setIsPending(true);
                    var ciphertext = CryptoJS.AES.encrypt(String(formData.password), 'kovilapp').toString();

                    // await axios.post("http://localhost:5001/sendMail", {
                      await axios.post("https://kovilapp.in/sendMail", {
                      email: formData.email,
                      password: ciphertext,
                      name: formData.firstName
                    })
                      .then(async(res1) => {
                        const washingtonRef = doc(db, "political_districts", pdId);
                        await updateDoc(washingtonRef, {
                          sub_admin_uid: userId,
                          sub_admin_name:formData.firstName,
                          mobile_no:formData.mobile
                          }).then((res2)=>{
                            setIsPending(false);
                            alert("user created");
                            navigate("/kovil/user-post");
                            console.log(res2);
                          }).catch((err)=>{
                            console.log(err)
                            alert(err)
                          })

                    
                       


                      }).catch((err) => {
                        alert(err);
                        console.log(err);
                      })
                    //   .then((res) => {

                  })
                  .catch((err) => {
                    alert(err);
                    console.log(err);
                  });

                // })
              });
            });
          })
          .catch((err) => {
            alert(err);
            setIsPending(false);
            console.log(err.code);
          });
      } else {
        setIsPending(true);
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        )
          .then((res) => {
            setIsPending(true);
            const userId = res.user.uid;
            console.log(userId);
            setDoc(doc(db, "admins", userId), {
              first_name: formData.firstName,
              last_name: formData.lastName,
              role: formData.role,
              state: formData.state,
              district: formData.district,
              phone_number: formData.mobile,
              alternate_number: formData.alternateNumber,
              email: formData.email,
              aadhar: formData.aadhar,
              dob: formData.dob,
              doc_id: userId,
              uid: userId,
              politicalDistrict:formData.politicalDistrict,
              password: formData.password,
              pincode: formData.pincode,
              profilePic: "",
              bjp_id: formData.bjp_id,
              timestamp: serverTimestamp(),
              is_password_changed: false,
            })
              .then(async (res) => {
                setIsPending(true)
                var ciphertext = CryptoJS.AES.encrypt(String(formData.password), 'kovilapp').toString();
                // await axios.post("http://localhost:5001/sendMail", {
                  await axios.post("https://kovilapp.in/sendMail", {
                  email: formData.email,
                  password: ciphertext,
                  name: formData.firstName
                })
                  .then(async(res) => {
                    console.log(res);
                    const washingtonRef = doc(db, "political_districts", pdId);
                        await updateDoc(washingtonRef, {
                          sub_admin_uid: userId,
                          sub_admin_name:formData.firstName,
                          mobile_no:formData.mobile

                          }).then((res2)=>{
                            setIsPending(false);
                            alert("user created");
                            navigate("/kovil/user-post");
                            console.log(res2);
                          }).catch((err)=>{
                            console.log(err)
                            alert(err)
                          })


                  }).catch((err) => {
                    alert(err);
                    console.log(err);
                  })
                //   .then((res) => {

              })
              .catch((err) => {
                alert(err);
                console.log(err);
              });

            // })
          })
          .catch((err) => {
            alert(err);
            setIsPending(false);
            console.log(err.code);
          });
      }
    } else {
      alert("enter valid mobile number");
    }
  };

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
          console.log(url);
        });
      });
    }
  };

  const [da, setDa] = useState();
  const [pd, setPd] = useState();
  const [pc, setPc] = useState();

  React.useEffect(() => {
    const getSuperAdmin = async () => {
      const docRef = collection(db, "political_districts");
      const q = query(docRef, where("district", "==", formData.district.toLowerCase()));
      const querySnapshot = await getDocs(q);
      let arr = []
      querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        const document = doc;
        const obj = {
          doc_id: document.id,
          ...document.data()
        }
        console.log(obj)
        arr.push(obj)
      })
      setDa(arr);
    }
    getSuperAdmin();

  }, [formData.district])
  console.log(pc)

  
 React.useEffect(()=>{
    const getSuperAdmin=async()=>{
      const docRef=collection(db,"political_districts");
      const q=query(docRef,where("politicalDistrict","==",pd));
      const  querySnapshot=await getDocs(q);
 
       querySnapshot.forEach((doc)=>{
          // console.log(doc.data())
          const document=doc;
          const obj={
              doc_id:document.id,
              ...document.data()
          }
          console.log(obj) 
          setPc(obj); 
      })
  }
   getSuperAdmin();

  },[pd,formData.district])

  return (
    <>
      <Stack>
        <h1>
          <span
            className="navigateArrow"
            onClick={() => {
              navigate("/kovil/user-post");
            }}
          >
            Users
          </span>{" "}
          <i class="fas fa-chevron-right"></i> Add User{" "}
        </h1>
        <form onSubmit={handleSubmit}>
          <Box>
            <Card sx={{ p: 3 }}>
              <h1>
                <b>Add User</b>
              </h1>
              <Box sx={{ p: 3 }}>
                <div className="row">
                  <div className="col-md-6 picture">
                    {previewImage ? (
                      <img src={previewImage} width="150" alt="user image" />
                    ) : (
                      <Avatar sx={{ width: 56, height: 56 }} />
                    )}
                    <span>
                      <form action="/action_page.php">
                        <input
                          type="file"
                          onChange={(e) => {
                            handleImage(e.target.files[0]);
                          }}
                          accept="image/*"
                          id="myFile"
                          name="filename"
                        />
                      </form>
                    </span>
                  </div>
                  <div className="col-md-6">
                    <SelectField
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      label="Enter First Name"
                      required
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        });
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
                      label="Enter Last Name"
                      variant="outlined"
                      required
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          lastName: e.target.value,
                        });
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
                      label="Enter Mobile Number"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          mobile: e.target.value,
                        });
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
                      label="Enter Alternate Mobile Number"
                      variant="outlined"
                      required
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          alternateNumber: e.target.value,
                        });
                      }}
                      type="number"
                    />
                  </div>
                </div>
                <TextField
                  id="outlined-basic"
                  label="Enter Email ID"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    });
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
                      label="Enter Aadhar Number"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          aadhar: e.target.value,
                        });
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
                    <span>Date Of Birth</span>
                    <TextField
                      id="outlined-basic"
                      required
                      label=""
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          dob: e.target.value,
                        });
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
                    <StateSelect
                      allStates={allStates}
                      setStateClicked={setStateClicked}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  {stateClicked ? (
                    <div className="col-md-6 picture">
                      <DistrictSelect
                        allStates={allStates}
                        stateClicked={stateClicked}
                        formData={formData}
                        setFormData={setFormData}
                      />
                    </div>
                  ) : (
                    <p>Select a state to view district</p>
                  )}
                </div>
                <div className="row">
                <div className="col-md-6 picture">
                  {formData.district ? ( 
                      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Political district</InputLabel>

                      <Select required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Political district"
                        onChange={(e) => {
                          setPd(e.target.value.politicalDistrict)
                          setFormData({
                            ...formData,
                            politicalDistrict:e.target.value.politicalDistrict
                          })
                          setPdId(e.target.value.doc_id)
                        }}>
                        {da &&
                          da.map((ad) => (
                            <MenuItem value={ad}>{ad.politicalDistrict}</MenuItem>
                          ))
                        }
                      </Select>
                      </FormControl> 
                  ) : (
                    <p>Select a district to view political state</p>
                  )}
                  </div>
                  <div className="col-md-6 picture">
                  {/* {pc ? ( 
                      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Pincode</InputLabel>

                      <Select required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Pincode"
                        onChange={(e) => {
                          setFormData({...formData,
                            pincode:e.target.value})
                        }}
                        >
                        {pc &&
                          pc.pincode.map((ad) => (
                            <MenuItem value={ad}>{ad}</MenuItem>
                          ))
                        }
                      </Select>
                      </FormControl> 
                  ) : (
                    <p>Select a district to view political state</p>
                  )} */}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 picture">
                    <TextField
                      id="outlined-basic"
                      label="BJP ID"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          bjp_id: e.target.value,
                        });
                      }}
                      type="text"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                        mb: 8,
                      }}
                    />
                  </div>
                  <div className="col-md-6 picture1">
                    {/* <Button
                      variant="contained"
                      sx={{ backgroundColor: "#198754", color: "#fff", mt: 4 }}
                    >
                      + Add
                    </Button> */}
                    {/* <TextField
                      id="outlined-basic"
                      label="ZipCode"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          zipcode: e.target.value,
                        });
                      }}
                      type="tel"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "900",
                        fontFamily: "sans-serif",
                        mt: 4,
                      }}
                    /> */}
                  </div>
                </div>
                <div className="row okbutton">
                  <Button variant="text" sx={{ mr: 2 }} onClick={handleClick}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    variant="contained"
                    sx={save}
                  >
                    Create User
                  </Button>
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

export default AddUser;
