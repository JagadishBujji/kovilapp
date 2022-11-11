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
  // const pass = Math.floor(Math.random() * 10000000000);
  // var ciphertext = CryptoJS.AES.encrypt(String(pass), 'kovilapp').toString();
  // console.log(ciphertext)
  // // console.log(pass)
  // const sendNotification = async () => {
  //   const num=[917639758020]
  //   const name="prabhu"
  //   const id=432432423
  //   const status="inprogess"
  //   const mess= `Dear ${name}, ticket no ${id} ticket status has been changed to ${status} - KovilApp Team`
  //   var url = `https://api.textlocal.in/send/?apikey=wJyfpBVDtbg-rnMp7JmQ23XtMqxpH9K2CPbbbgCP9V&numbers=${num}&sender=TXTLCL&message='+encodeURIComponent(${mess})`
  //  await axios.get(url)

  //   .then(function (response) {

  //   // handle success

  //   console.log("------ SMS Gateway Response ------");

  //   console.log(response.data);

  //   })

  //   .catch(function (error) {

  //   // handle error

  //   console.log(error);

  //   })
  // }
  // console.log(process.env)

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
