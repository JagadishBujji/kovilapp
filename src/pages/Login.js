// import $ from "jquery";

import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
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

  return (
    <>
      <div class="container row m-auto">
        <div className="col-md-12 ">
          <main class="signup-container">
            <h1 class="heading-primary">
              Log in<span class="span-blue">.</span>
            </h1>
            <p class="text-mute">
              Enter your credentials to access your account.
            </p>
            <div class="login-wrapper">
              <a href="#" class="btn btn-google">
                <img src="https://img.icons8.com/fluency/48/000000/google-logo.png" />
                Log In with Google
              </a>
              <div class="line-breaker">
                <span class="line"></span>
                <span>or</span>
                <span class="line"></span>
              </div>
            </div>

            <form class="signup-form">
              <label class="inp">
                <input
                  type="email"
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  class="input-text"
                  placeholder="&nbsp;"
                />
                <span class="label">Email</span>
                <span class="input-icon">
                  <i class="fas fa-envelope"></i>
                </span>
                {error && <p style={{ color: "red" }}>{error}</p>}
              </label>
              <label class="inp">
                <input
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  type="password"
                  class="input-text"
                  placeholder="&nbsp;"
                  id="password"
                />
                <span class="label">Password</span>
                <span class="input-icon input-icon-password" data-password>
                  <i class="fas fa-eye"></i>
                </span>
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
              </label>
              <button type="submit" onClick={handleClick} class="btn btn-login">
                Login
              </button>
            </form>
            <p class="text-mute">
              Not a member? <a href="/signup">Sign up</a>
            </p>
          </main>
        </div>

        {/* <div class="welcome-container">
          <h1 class="heading-secondary">
            Welcome to <span class="lg">IDEEZ!</span>
          </h1>
          <img
            src="https://png2.cleanpng.com/sh/82506800d9e08bf14cb0a38d53322fea/L0KzQYm3VsI1N6Rug5H0aYP2gLBuTfxieKV0iJ9taYPzfLLCTfRmfppofZ92dXz3eb7shPliNZ1miOZ4cD3wf7TylgAuPZM3fqNsMEC4RIKAUsQvOmU5SaUBMkm0RYOCWME1OGI7S6Y9NT7zfri=/kisspng-laptop-display-device-multimedia-laptop-mockup-5b2f1c00541724.2441362915298140163445.png"
            alt=""
          />
        </div> */}
      </div>
    </>
  );
};

export default Login;
