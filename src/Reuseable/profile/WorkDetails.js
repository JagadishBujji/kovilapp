import React from "react";
const WorkDetails = () => {
  return (
    <>
      <div className="exper-input">
        <div className="row filters">
          <div className="work-experience">
            <div className="mr-4">
              <img src="/images/js.png" alt="" className="workexperience-img" />
            </div>
            <div>
              <p className="m-0"> Entry Level</p>
              <span>Kittivaasal </span>
              <p>Fill-Time</p>
            </div>

            {/* <p>ui/ux designer</p>
      <p>kittivaasal Tech - Full-Time</p> */}
          </div>
          <p className="m-0">2 Mos</p>
        </div>
      </div>
    </>
  );
};

export default WorkDetails;
