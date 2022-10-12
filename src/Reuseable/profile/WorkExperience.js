import React from "react";
import EditModal from "./Modal/EditModal";
import WorkDetails from "./WorkDetails";

const WorkExperience = () => {
  return (
    <>
      <div className="card jobfilter ">
        <div className="row job-filter">
          <p className="job m-0"> Work Experience</p>
          <EditModal />
        </div>
        <WorkDetails />
        <WorkDetails />
        <WorkDetails />
      </div>
    </>
  );
};

export default WorkExperience;
