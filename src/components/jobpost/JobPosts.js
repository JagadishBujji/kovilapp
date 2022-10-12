import React, { useEffect, useState } from "react";
import axios from "axios";
import Applicant from "../../Reuseable/Applicant";
import Experience from "../../Reuseable/Experience";
import JobFilter from "../../Reuseable/JobFilter";
import JobLocation from "../../Reuseable/JobLocation";
import JobType from "../../Reuseable/JobType";
import Profile from "../../Reuseable/profile/Profile";
import WorkExperience from "../../Reuseable/profile/WorkExperience";
import Search from "../../Reuseable/Search/Search";
import JobPostCard from "./JobPostCard";
import { useSelector } from "react-redux"; 

const JobPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [showSavedJobs,setShowSavedJobs]=useState(false);
   
    const savedJobes=useSelector((state)=>state.savedJobs.savedJobs);
    
    console.log(savedJobes); 
  useEffect(() => {
    axios
      .get("https://ideez.herokuapp.com/api/jobs")
      .then((res) => {
        console.log("res: ", res.data);
        setJobs(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      {/* <div className="row">
        <div className="col-md-3 jobsearch">
          <Profile />
          <WorkExperience />
        </div>
        <div className="col-md-6 ">
          <h1 className="px-5 py-3 title">Job Post</h1>
          <Search showSavedJobs={showSavedJobs} setShowSavedJobs={setShowSavedJobs}/>
          <div className="post-card">
          {showSavedJobs? 
            savedJobes?.map((jj)=>(
              <JobPostCard job={jj}/>
            ))

          :  jobs.map((job) => (
              <JobPostCard  job={job} />
            ))}

          </div>
        </div>
        <div className="col-md-3 jobsearch">
          <JobFilter />
          <Experience />
          <JobLocation />
          <JobType />
          <Applicant />
        </div>
      </div> */}
    </>
  );
};

export default JobPosts;
