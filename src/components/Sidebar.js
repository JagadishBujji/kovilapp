import React from "react";
import { Link } from "react-router-dom";
import JobFilter from "../Reuseable/JobFilter";
import Profile from "../Reuseable/profile/Profile";
import WorkExperience from "../Reuseable/profile/WorkExperience";
import Experience from "../Reuseable/Experience";
import JobLocation from "../Reuseable/JobLocation";
import JobType from "../Reuseable/JobType";
import Applicant from "../Reuseable/Applicant";

const Sidebar = () => {
  function close() {
    document.getElementById("mySidebar").style.display = "none";
  }

  return (
    <>
      <div class="sidebar " id="mySidebar">
        <button onClick={close} class="w3-bar-item w3-large">
          Close &times;
        </button>
        <ul class="navbar-nav">
          <li class="nav-item">
            <Profile />
          </li>
          <li class="nav-item">
            <WorkExperience />
          </li>
          <li class="nav-item">
            <JobFilter />
          </li>
          <li class="nav-item">
            <Experience />
          </li>
          <li class="nav-item">
            <JobLocation />
          </li>
          <li class="nav-item">
            <JobType />
          </li>
          <li class="nav-item">
            <Applicant />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
