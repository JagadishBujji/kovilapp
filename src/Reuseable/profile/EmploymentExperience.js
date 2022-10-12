import React from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceModal from "./Modal/ExperienceModal";

const EmploymentExperience = () => {
  return (
    <>
      <div className="row container m-auto">
        <div className="Card jobpost">
          <div className="row skills-modal">
            <h2>
              <b>Experience</b>
            </h2>
            <ExperienceModal />
          </div>
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
        </div>
      </div>
    </>
  );
};

export default EmploymentExperience;
