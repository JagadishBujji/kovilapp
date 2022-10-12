import React from "react";
import axios from "axios";
import Applicant from "../../Reuseable/Applicant";
import Experience from "../../Reuseable/Experience";
import JobFilter from "../../Reuseable/JobFilter";
import JobLocation from "../../Reuseable/JobLocation";
import JobType from "../../Reuseable/JobType";
import Profile from "../../Reuseable/profile/Profile";
import WorkExperience from "../../Reuseable/profile/WorkExperience";
import Search from "../../Reuseable/Search/Search";
// import JobPostCard from "./JobPostCard";
import NetWorkingCard from "./NetWorkingCard";
import { useEffect,useState } from "react";
import NetworkingSearch from "./NetworkingSearch";
const NetWorkingMedia = () => {
  const[netWorks,setNetWorks] = useState([]);
  useEffect(() => {
    axios
      .get("https://ideez.herokuapp.com/api/")
      .then((res) => {
        console.log("res: ", res.data);
        setNetWorks(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-3 jobsearch">
          <Profile />
          <WorkExperience />
        </div>
        <div className="col-md-6 ">
          {/* <h1 className="px-5 py-3 title">Job Post</h1> */}
          <NetworkingSearch />
          <div className="post-card">
            <NetWorkingCard />
            <NetWorkingCard />
            <NetWorkingCard />
            <NetWorkingCard />
            <NetWorkingCard />
            <NetWorkingCard />
            <NetWorkingCard />
            <NetWorkingCard />
            <NetWorkingCard />
            <NetWorkingCard />
            <NetWorkingCard />
          </div>
        </div>
        <div className="col-md-3 jobsearch">
          <JobFilter />
          <Experience />
          <JobLocation />
          <JobType />
          <Applicant />
        </div>
      </div>
    </>
  );
};

export default NetWorkingMedia;
