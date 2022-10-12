import React from "react";
const JobType = () => {
  return (
    <>
      <div className="card jobfilter ">
        <div className="row job-filter">
          <p className="job m-0"> Job Type</p>
          <a href="/">Clear all</a>
        </div>
        <form className="exper-input">
          <div className="row filters">
            <div>
              <input
                type="checkbox"
                className="mr-2"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label className="m-0" for="vehicle1">
                {" "}
                Full Time
              </label>
            </div>

            <p className="m-0">123 Jobs</p>
          </div>

          <div className="row filters">
            <div>
              <input
                type="checkbox"
                className="mr-2"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label className="m-0" for="vehicle1">
                {" "}
                Freelance
              </label>
            </div>

            <p className="m-0">123 Jobs</p>
          </div>

          <div className="row filters">
            <div>
              <input
                type="checkbox"
                className="mr-2"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label className="m-0" for="vehicle1">
                {" "}
                Part Time
              </label>
            </div>
            <p className="m-0">123 Jobs</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default JobType;
