import React from "react";
const JobLocation = () => {
  return (
    <>
      <div className="card jobfilter ">
        <div className="row job-filter">
          <p className="job m-0"> Job Location</p>
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
              <label for="vehicle1"> On Site</label>
            </div>
            <p className="m-0">123 Jobs</p>
          </div>

          {/* search */}
          <form className="joblocation" action="submit">
            <div class="search-container">
              <i class="fa fa-search"></i>
              <input
                type="text"
                name="searchlocation"
                id="searchlocation"
                placeholder="Search Location"
              />
            </div>
          </form>
          <div className="row filters">
            <div>
              <input
                type="checkbox"
                className="mr-2"
                id="vehicle3"
                name="vehicle3"
                value="Boat"
              />
              <label for="vehicle3"> Remote</label>
            </div>
            <p className="m-0">123 Jobs</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default JobLocation;
