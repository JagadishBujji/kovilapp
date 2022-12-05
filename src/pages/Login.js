import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { fontSize, width } from "@mui/system";
import { getDoc, doc, query, collection, where, getDocs } from "firebase/firestore";
import axios from "axios";
import firebaseApp from "../services/firebase";
import { getMessaging, getToken } from 'firebase/messaging'
import CryptoJS from "crypto-js"; 
import { MenuItem, Select } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [passwordError, setPasswordError] = useState();

  const eyeClick = document.querySelector("[data-password]");
  const password_elem = document.getElementById("password");
  const [isPending, setIsPending] = useState(false)
  const handleClick = async (e) => {
    e.preventDefault();
    // console.log("formData: ", formData);
    setIsPending(true);
    await signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        const user = res.user;
        // console.log(user);
        // console.log(formData.email);
        const docRef = doc(db, "admins", user.uid)
        getDoc(docRef)
          .then((res) => {
            // console.log(res.data())
            const data = res.data()
            const role = data.role.toLowerCase();
            if (role === "admin") {
              setIsPending(false);

              localStorage.setItem("user", JSON.stringify(data));
              window.location.reload();
            }
            else if (role === "sub-admin") {
              setIsPending(false);

              localStorage.setItem("subadmin", JSON.stringify(data));
              window.location.reload();
            }
          }).catch((err) => {
            setIsPending(false);
            setError("your account has been deleted");

              // alert(err)
            console.log(err)
          })
      })
      .catch((err) => {
        setIsPending(false);

        console.log(err);
        if (err.code === "auth/user-not-found") {
          setError("Email not register, kindly sign up");
          setPasswordError("");
        } else if (err.code === "auth/wrong-password") {
          setPasswordError("Wrong password");
          setError("");
        }
        else {
          setIsPending(false);

          setError(err.code)
          setPasswordError("")
        }
      });
  };

  useEffect(() => {
    if (eyeClick !== null) {
      eyeClick.onClick = () => {
        const icon = eyeClick.children[0];
        icon.classList.toggle("fa-eye-slash");
        if (password_elem.type === "password") {
          password_elem.type = "text";
        } else if (password_elem.type === "text") {
          password_elem.type = "password";
        }
      };
    }
  }, []);
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    if (prop === "email") {
      setFormData({ ...formData, [prop]: event.target.value });
    } else {
      setValues({ ...values, [prop]: event.target.value });
      setFormData({ ...formData, [prop]: event.target.value });
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    // tgsuperadmin123#
    // tgsuperadmin@gmail.com
  };

  const login = {
    background: "#ff6000",
    width: "100%",
    mt: 3,
    color: "#fff",
    fontSize: "18px",
    fontWeight: "600",
    border: "1px solid #ff6000",
    "&:hover": {
      backgroundColor: "#ff6000",
      border: "1px solid #ff6000",
    },
  };
  // const pass = Math.floor(Math.random() * 10000000000);
  // var ciphertext = CryptoJS.AES.encrypt(String(pass), 'kovilapp').toString();
  // console.log(ciphertext)
  // // console.log(pass)
//   const sendNotification = async () => {
 
//   const apikey = 'wJyfpBVDtbg-rnMp7JmQ23XtMqxpH9K2CPbbbgCP9V';
//   const subadmin = 'Ariv';
//   const mobile = '7639758020';
//   const ticket = '5012356'; 
//   const sender = 'KVLAPP';
//   const status="inprogress"
//   const name="prabhu"
//   // var m8='Dear '+username+', Namaskaram, Welcome to Kovil App. You have been successfully registered. Login to continue. - KovilApp Team'
//   // var m7='Dear '+username+' Namaskaram, Your ticket no '+tno+' has been created and assigned to the concerned team. Your complaint will be resolved within 3 working days. Please check the KovilApp for status. - KovilApp Team'
//   var m6='Dear '+name+', Ticket no '+ticket+' has been assigned to you. Please take necessary action and respond within 24 Hours -- KovilApp Team'
//   // var m5='Dear '+username+', Ticket no '+tno+' has been assigned to '+name+' - Ph no: '+mobile+'. Please take necessary action and respond within 36 Hours – KovilApp Team'
// //   // var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'
// //   // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
// //   // var m10='Dear '+username+', Namaskaram, Your profile password has been successfully changed - KovilApp Team'
// //   // var m2='Dear '+username+', ticket no '+tno+' status has been changed to {#var#} - KovilApp Team'
// // var mms='Dear '+subadmin+', ticket no '+ticket+' status has been changed to '+status+' - KovilApp Team'
// //   var mess='Dear '+subadmin+', Ticket no '+ticket+' has been assigned to you. Please take necessary action and respond within 24 Hours – KovilApp Team'
  
//   // var message = 'Dear '+username+' - Namaskaram! Please enter the OTP: '+otp+' in your Kovil App to create your account. Thank you!';
//   var url = 'https://api.textlocal.in/send/?apikey='+apikey+'&numbers='+mobile+'&sender='+sender+'&message='+encodeURIComponent(m6);
//   fetch (url).then(response => response.json()).then(data => console.log(data));

//   }
  // console.log(process.env)
// const [da,setDa]=useState();
// const [pd,setPd]=useState();
// const [pc,setPc]=useState();
//   useEffect(()=>{
//     const getSuperAdmin=async()=>{
//       const docRef=collection(db,"political_districts");
//       const q=query(docRef,where("district","==","vellore"));
//       const  querySnapshot=await getDocs(q);
//       let arr=[]
//        querySnapshot.forEach((doc)=>{
//           // console.log(doc.data())
//           const document=doc;
//           const obj={
//               doc_id:document.id,
//               ...document.data()
//           }
//           console.log(obj)  
//           arr.push(obj)
//       })
//       setDa(arr);
//   }
//    getSuperAdmin();

//   },[])
//   useEffect(()=>{
//     const getSuperAdmin=async()=>{
//       const docRef=collection(db,"political_districts");
//       const q=query(docRef,where("politicalDistrict","==",pd));
//       const  querySnapshot=await getDocs(q);
 
//        querySnapshot.forEach((doc)=>{
//           // console.log(doc.data())
//           const document=doc;
//           const obj={
//               doc_id:document.id,
//               ...document.data()
//           }
//           console.log(obj) 
//           setPc(obj); 
//       })
//   }
//    getSuperAdmin();

//   },[pd])


//  console.log(da)
  return (
    <>
 
      <div class="container row m-auto loginmainbanner">
        <div className="col-md-5 kovil-login">
          <img src="/images/Picture1.jpg" alt="" className="login-img" />
        </div>
        <div className="col-md-7 login-from">
          <div className="container login">
            {/* <button onClick={sendNotification} >send notification</button> */}

            <h2>Login</h2>
            <p>Enter your credentials to access your account</p>
            {/* <div className="googlelogin">
              <a href="" className="google-signin">
                <img src="/images/google.png" alt="" className="google-img" />{" "}
                Login with Google
              </a>
            </div> */}

            <form className="form-group">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email id"
                variant="outlined"
                className="mb-4"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
              />
              {/* <TextField
                fullWidth
                id="outlined-basic"
                label="Password"
                variant="outlined"
                className="mb-4"
                type="password"
              /> */}
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button sx={login} disabled={isPending} variant="outlined" onClick={handleClick}>
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
