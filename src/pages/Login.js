// import $ from "jquery";

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
    console.log("formData: ", formData);
    setIsPending(true);
    await signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        console.log(formData.email);
        const docRef = doc(db, "admins", user.uid)
        getDoc(docRef)
          .then((res) => {
            console.log(res.data())
            const data = res.data()
            const role = data.role.toLowerCase();
            if (role === "admin") {
              setIsPending(false);

              localStorage.setItem("user", JSON.stringify(user));
              window.location.reload();
            }
            else if (role === "sub-admin") {
              setIsPending(false);

              localStorage.setItem("subadmin", JSON.stringify(user));
              window.location.reload();
            }
          }).catch((err) => {
            setIsPending(false);

            alert(err)
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
  const sendNotification = async () => {
    // c4bD7v8zQ-S80EOyMxEjSi:APA91bEKE8EwA8psXCODTDwKnEPh_8-QIIqkMyP7buE1Jhdg5l38nBd8hmMEzfYvELjQvBhVKI9SrSdEDbADy67TCFrexmzDa5JQIoZu08oSvhj1xUgKCpD1eEKbSUXpsUuyuTNf_5jw
    await axios.post("https://fcm.googleapis.com/fcm/send", {
      "notification": {
        "title": "Firebase",
        "body": "Firebase is awesome",
        "click_action": "http://localhost:3000/",
        "icon": "http://url-to-an-icon/icon.png"
      },
      "to": "c4bD7v8zQ-S80EOyMxEjSi:APA91bEKE8EwA8psXCODTDwKnEPh_8-QIIqkMyP7buE1Jhdg5l38nBd8hmMEzfYvELjQvBhVKI9SrSdEDbADy67TCFrexmzDa5JQIoZu08oSvhj1xUgKCpD1eEKbSUXpsUuyuTNf_5jw"
    },{
      headers:{
          "Content-Type": "application/json",
          "Authorization": "key=AAAAujeDNFk:APA91bFTPFchdLLWS_6Tp4LsLe14M8QX9pvLOMfUv9ILl-l3O7SGCRuVSbaOsqZvNrYRlxlRc22ygeOxHXN_85SxPsOKZG6l7H3l9WRbHJ3LWJHypuFM6kwPeZhcKTMlgnMx85tNHDt-"
      }
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err.response);
    })
  }

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
