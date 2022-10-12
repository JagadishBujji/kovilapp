import React from "react";
import EventPostCard from "./EventPostCard";
import axios from "axios";
// import JobPostCard from "./JobPostCard";
import Applicant from "../../Reuseable/Applicant";
import Experience from "../../Reuseable/Experience";
import JobFilter from "../../Reuseable/JobFilter";
import JobLocation from "../../Reuseable/JobLocation";
import JobType from "../../Reuseable/JobType";
import Profile from "../../Reuseable/profile/Profile";
import WorkExperience from "../../Reuseable/profile/WorkExperience";
import Search from "../../Reuseable/Search/Search";
import { useEffect,useState } from "react";
// import JobPostCard from "./JobPostCard";

const EventPosts = () => {
  const [events,setevents] = useState([ ]);
  useEffect(() => {
    axios
      .get("https://ideez.herokuapp.com/api/events")
      .then((res) => {
        console.log("res: ", res.data);
        setevents(res.data);
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
          <Search />
          <div className="post-card">
            {
           events.map((event) => <EventPostCard event = {event}/>)
           }
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

export default EventPosts;
