import { Alert, Avatar, Box, Card, Grid } from "@mui/material";
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
import { doc, addDoc, collection, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL, listAll, list } from 'firebase/storage'
import country_state_district from 'country_state_district'
import { v4 } from "uuid";
import { storage } from "../services/firebase";

const EditUser = () => {
    const docId=useParams().id; 
    const [data,setData]=useState();
  const [allStates, setAllStates] = React.useState();
  const [userImage, setUserImage] = React.useState();
  const [previewImage, setPreviewImage] = useState();
  const [oldImage,setOldImage]=useState();
  const [uImage, setUImage] = useState();
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
    mobile: "",
    alternateNumber: "",
    email: "",
    aadhar: "",
    state: "",
    zipcode: "",
    dob: "",
    district: "",
    profilePic:"",
    password:"",
    bjp_id:"", 
    uid:""
  })
  React.useEffect(() => {
    const getDetails = async () => {
      const docRef = doc(db, "userProfile", docId)
      try {
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data())
        setData(docSnap.data());
        const ds=docSnap.data()
        setFormData({
            firstName:ds.first_name,
            lastName:ds.last_name,
            role:ds.role,
            mobile:ds.phone_number,
            alternateNumber:ds.alternate_number,
            email:ds.email,
            aadhar:ds.aadhar,
            state:ds.state,
            zipcode:ds.zipcode,
            dob:ds.dob,
            district:ds.district,
            profilePic:ds.profilePic,
            bjp_id:ds.bjp_id,
            password:ds.password,
            uid:ds.uid
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
console.log(data);
 
  console.log(formData)
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false)
  const [stateClicked, setStateClicked] = useState();
  const handleClick = () => {
    setShowModal(true)
  }
  console.log(oldImage===previewImage)
  const handleCancel = () => {
    setShowModal(false)
  }
  const deleteHandle = () => {
    navigate("/kovil/user-post")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mobile.length === 10 && formData.alternateNumber.length === 10) {
      if (uImage || oldImage) {
        if(previewImage===oldImage)
        { 
            setIsPending(true);
             await   setDoc(doc(db, "userProfile",docId),
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
                  dob: formData.dob,
                  zipcode: formData.zipcode,
                  profilePic: formData.profilePic,
                  timestamp:serverTimestamp(),
                  bjp_id:formData.bjp_id,
                  password:formData.password,
                  timestamp:serverTimestamp(),
                  uid:formData.uid,
                }
              )
              .then((res) => {
                // console.log(res);
                setIsPending(false)
                alert("user updated")
                navigate("/kovil/user-post")
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
            setDoc(doc(db, "userProfile",docId),
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
              dob: formData.dob,
              zipcode: formData.zipcode,
              profilePic: imageURL,
              timestamp:serverTimestamp()
            }
          )
          .then((res) => {
            console.log(res);
            setIsPending(false)
            alert("user updated")
            navigate("/kovil/user-post")
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
        alert("please select a image")
      }
      //   try{
      //     const docRef = await addDoc(collection(db, "userProfile"), {
      //       first_name:formData.firstName,
      //       last_name:formData.lastName,
      //       role:formData.role,
      //       state:formData.state,
      //       district:formData.district,
      //       phone_number:formData.mobile,
      //       alternate_number:formData.alternateNumber,
      //       email:formData.email,
      //       aadhar:formData.aadhar,
      //       dob:formData.dob,
      //       zipcode:formData.zipcode       
      //     });
      //     console.log(docRef.id)
      //     alert("user added successfully") 
      //     navigate("/kovil/user-post")
      // }catch(err){
      //     console.log(err); 
      //     alert("error occured") 
      // }

    }
    else {
      alert("enter valid mobile number")
    }

  }

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
  }


  return (
    <>
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
                      label= {formData.bjp_id?"":"BJP_ID"}  
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
                        mb:8
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
      </Stack>
    </>
  );
};

export default EditUser;
