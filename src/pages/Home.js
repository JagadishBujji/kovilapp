import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getAuth } from "firebase/auth";

// import Sidebar from "../components/Sidebar";
const Home = () => {
  const auth = getAuth();

  const user = auth.currentUser;
  console.log(user)
 const navigate = useNavigate();
  useEffect(()=> {
    navigate("/kovil/home-post")
  },[])
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <div className="out container">
        <Outlet />
      </div>
    </>
  );
};

export default Home;
