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
import { useNavigate } from "react-router-dom";
import {doc,addDoc,collection} from 'firebase/firestore'
import { db } from "../services/firebase";

const AddUser = () => {
      const [formData,setFormData]=useState({
        firstName:"",
      lastName:"",
      role:"",
      mobile:"",
      alternateNumber:"",
      email:"",
      aadhar:"",
      state:"",
      zipcode:"",
      dob:"",
      district:""

      })
       const [showModal,setShowModal] = useState(false);
       const navigate = useNavigate();

       const handleClick = () => {
        setShowModal(true)
       }
       const handleCancel = () => {
        setShowModal(false)
       }
       const deleteHandle = () => {
          navigate("/kovil/user-post")
       }
       const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          const docRef = await addDoc(collection(db, "userProfile"), {
            first_name:formData.firstName,
            last_name:formData.lastName,
            role:formData.role,
            state:formData.state,
            district:formData.district,
            phone_number:formData.mobile,
            alternate_number:formData.alternateNumber,
            email:formData.email,
            aadhar:formData.aadhar,
            dob:formData.dob,
            zipcode:formData.zipcode       
          });
          console.log(docRef.id)
          alert("user added successfully") 
          navigate("/kovil/user-post")
      }catch(err){
          console.log(err); 
          alert("error occured") 
      }
       }
  return (
    <>
      <Stack>
        <h1>
          Users <i class="fas fa-chevron-right"></i> Add User{" "}
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
                  <Avatar sx={{ width: 56, height: 56 }} />{" "}
                  <span>Upload Profile Picture</span>
                </div>
                <div className="col-md-6">
                  <SelectField  formData={formData} setFormData={setFormData}/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    label="Enter First Name"
                    required
                    onChange={(e)=>{
                      setFormData({
                        ...formData,
                        firstName:e.target.value
                      })
                    }}
                    variant="outlined"
                    fullWidth
                    type="text"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif"
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
                    onChange={(e)=>{
                      setFormData({
                        ...formData,
                        lastName:e.target.value
                      })
                    }}
                    type="text"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif"
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

                    onChange={(e)=>{
                      setFormData({
                        ...formData,
                        mobile:e.target.value
                      })
                    }}
                    type="number"
                    pattern="[0-9]{10}"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif"
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
                    onChange={(e)=>{
                      setFormData({
                        ...formData,
                        alternateNumber:e.target.value
                      })
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
                onChange={(e)=>{
                  setFormData({
                    ...formData,
                    email:e.target.value
                  })
                }}
                sx={{
                  mb: 2 ,
                  fontSize: "14px",
                  fontWeight: "900",
                  fontFamily: "sans-serif"
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

                    onChange={(e)=>{
                      setFormData({
                        ...formData,
                        aadhar:e.target.value
                      })
                    }}
                    type="tel"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif"
                    }}
                  />
                </div>
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    required

                    label=""
                    variant="outlined"
                    fullWidth
                    onChange={(e)=>{
                      setFormData({
                        ...formData,
                        dob:e.target.value
                      })
                    }}
                    type="date"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif"
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 picture">
                  <StateSelect formData={formData} setFormData={setFormData}/>
                </div>
                <div className="col-md-6 picture">
                  <DistrictSelect formData={formData} setFormData={setFormData} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 picture">
                <TextField
                    id="outlined-basic"
                    label="ZipCode"
                    variant="outlined"
                    fullWidth
                    required
                    
                    onChange={(e)=>{
                      setFormData({
                        ...formData,
                        zipcode:e.target.value
                      })
                    }}
                    type="tel"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif"
                    }}
                  />
                </div>
                <div className="col-md-6 picture1">
                <Button variant="text" sx={{ mr: 2 }}>
                  + Add
                </Button>
                </div>
              </div>
              <div className="row okbutton">
                <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClick}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">Add User</Button>
              </div>
              {showModal && <UserModal onConfirm = {deleteHandle} onCancel = {handleCancel}/>}
              {showModal && <TicketsBack  />}
            </Box>
          </Card>
        </Box>
        </form>
      </Stack>
    </>
  );
};

export default AddUser;
