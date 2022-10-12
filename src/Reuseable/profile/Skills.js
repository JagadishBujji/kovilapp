import React from "react";
import SkillsModal from "./Modal/SkillsModal";

const Skills = () => {
  return (
    <>
      <div className="row container m-auto">
        <div className="Card jobpost">
          <div className="row skills-modal">
            <h2>
              <b>Skills</b>
            </h2>
            <SkillsModal />
          </div>

          <div className="row skills">
            <p className="p-2 ass">Associate</p>
            <p className="p-2 ass">Excel</p>
            <p className="p-2 ass">BPO</p>
            <p className="p-2 ass">Finance</p>
            <p className="p-2 ass">Unix</p>
            <p className="p-2 ass">Associate</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;
