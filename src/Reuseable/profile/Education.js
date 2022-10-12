import React from "react";
import EducationCard from "./EducationCard";
import EducationModal from "./Modal/EducationModal";
import EducationEdit from "./Modal/ExperienceEdit";

const Education = () => {
  return (
    <>
      <div className="row container m-auto">
        <div className="Card jobpost">
          <div className="row skills-modal">
            <h2>
              <b>Education</b>
            </h2>
            <EducationModal />
          </div>
          <EducationCard />
          <EducationCard />
        </div>
      </div>
    </>
  );
};

export default Education;
