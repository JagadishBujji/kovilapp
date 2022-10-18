import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, } from "react";
// import Sidebar from "../components/Sidebar";
const Home = () => {
 const navigate = useNavigate();
  useEffect(()=> {
    navigate("/kovil/home-post")
  },[])
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <div className="out container-fluid">
        <Outlet />
      </div>
    </>
  );
};

export default Home;
