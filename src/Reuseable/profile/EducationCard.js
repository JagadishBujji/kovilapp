import React from "react";
import EducationEdit from "./Modal/EducationEdit";

const EducationCard = () => {
  return (
    <>
      <div className="mb-4">
        <p className="exp">
          <b>Diploma - Mechanical</b>
          <span>
            <EducationEdit />{" "}
          </span>
        </p>
        <p>Rajagopal Polytechnic College</p>
        <p>Jun 2019 to Present (3 years 2 months)</p>
      </div>
    </>
  );
};
export default EducationCard;
