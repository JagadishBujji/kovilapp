import React from "react";
import ExperienceEdit from "./Modal/ExperienceEdit";

const ExperienceCard = () => {
  return (
    <>
      <div className="mb-4">
        <p className="exp">
          <b>Mortgage Associate</b>
          <span>
            <ExperienceEdit />{" "}
          </span>
        </p>
        <p>Kittivaasal Technologies</p>
        <p>Jun 2019 to Present (3 years 2 months)</p>
        <p>1 Month Notice Period</p>
        <p>US mortgage</p>
      </div>
    </>
  );
};
export default ExperienceCard;
