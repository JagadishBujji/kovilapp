import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const Home = () => {
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
