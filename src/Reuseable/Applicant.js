import React from "react";
const Applicant = () => {
  return (
    <>
      <div className="card jobfilter ">
        <div className="row job-filter">
          <p className="job m-0"> Applicant</p>
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
                Less than 10
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
                10 to 50
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
                50 to 100
              </label>
            </div>
            <p className="m-0">123 Jobs</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Applicant;
