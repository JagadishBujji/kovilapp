import classes from "./NetworkingSearch.module.css";
import { Link } from "react-router-dom";
const NetworkingSearch = () => {
  return (
    <div className="container-fluid search px-2 py-2">
      {/* <h2>Search Jobs</h2> */}
      <section>
        <form className="form" action="submit">
          {/* <label class="head-jobs" for="search">
                  Jobs
                  <br /> Search?
                </label> */}
          <div class="search-container">
            <i class="fa fa-search"></i>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Jobs...."
            />
          </div>
          <button className="sea" type="submit">
            Search
          </button>
        </form>
      </section>
      <div className={classes.networkNav}>
        <nav>
          <ul className={classes.networkNav_inner}>
            <li className={classes.networkNav_sub}>
              <Link to="/">Top Results</Link>
            </li>
            <li className={classes.networkNav_sub}>
              <Link to="/recruiter/networking">Networking</Link>
            </li>
            <li className={classes.networkNav_sub}>
              <Link to="/recruiter/chats">Chats</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NetworkingSearch;
