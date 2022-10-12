import React from "react";
const Experience = () => {
  return (
    <>
      <div className="card jobfilter ">
        <div className="row job-filter">
          <p className="job m-0"> Experience</p>
          <a href="/">Clear all</a>
        </div>
        <form className="exper-input" action="/action_page.php">
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
                Entry Level
              </label>
            </div>
            <p className="m-0">123 Jobs</p>
          </div>

          <div className="row filters">
            <div>
              <input
                type="checkbox"
                className="mr-2"
                id="vehicle2"
                name="vehicle2"
                value="Car"
              />
              <label className="m-0" for="vehicle2">
                {" "}
                Intermediate
              </label>
            </div>
            <p className="m-0">123 Jobs</p>
          </div>

          <div className="row filters">
            <div>
              <input
                type="checkbox"
                className="mr-2"
                id="vehicle3"
                name="vehicle3"
                value="Boat"
              />
              <label for="vehicle3"> Expert</label>
            </div>
            <p className="m-0">123 Jobs</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Experience;
