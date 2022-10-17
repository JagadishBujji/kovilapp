// import $ from "jquery";

import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
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

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [passwordError, setPasswordError] = useState();

  const eyeClick = document.querySelector("[data-password]");
  const password_elem = document.getElementById("password");

  const handleClick = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code === "auth/user-not-found") {
          setError("Email not register, kindly sign up");

          setPasswordError("");
        } else if (err.code === "auth/wrong-password") {
          setPasswordError("Wrong password");
          setError("");
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
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

  return (
    <>
      <div class="container row m-auto loginmainbanner">
        <div className="col-md-5 kovil-login">
          <img src="/images/Picture1.jpg" alt="" className="login-img" />
        </div>
        <div className="col-md-7 login-from">
          <div className="container login">
            <h2>Signup</h2>
            <p>Enter your credentials to access your account</p>
            {/* <div className="googlelogin">
              <a href="" className="google-signin">
                <img src="/images/google.png" alt="" className="google-img" />{" "}
                Login with Google
              </a>
            </div> */}
            {/* <div className="googlelogin">
              <button className="login-btn">
                <img src="/images/google.png" alt="" className="google-img" />{" "}
                Login with Google
              </button>
            </div> */}
            {/* <p>(or)</p> */}
            <div className="row">
              <div className="col-md-6">
                <form className="form-group">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    className="mb-4"
                    type="text"
                  />
                </form>
              </div>{" "}
              <div className="col-md-6">
                <form className="form-group">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    className="mb-4"
                    type="email"
                  />
                </form>
              </div>{" "}
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="form-group">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    className="mb-4"
                    type="tel"
                  />
                </form>
              </div>{" "}
              <div className="col-md-6">
                <form className="form-group">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="email"
                    variant="outlined"
                    className="mb-4"
                    type="email"
                  />
                </form>
              </div>{" "}
            </div>
            <div className="row">
              <div className="col-md-12">
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
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
                <Button sx={login} variant="outlined">
                  Sign up
                </Button>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
