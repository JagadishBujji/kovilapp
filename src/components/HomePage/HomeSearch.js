import { Link } from "react-router-dom";
import classes from "./HomeSearch.module.css"
const HomeSearch = () => {
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
      
        <div className={classes.SearchNav}>
        <nav>
        <ul  className={classes.SearchNav_inner}>
          <li className={classes.SearchNav_sub}>
            <Link to="/">For You</Link>
          </li>
          <li className={classes.SearchNav_sub}>
            <Link to="/">Data Science</Link>
          </li>
          <li className={classes.SearchNav_sub}>
            <Link to="/">AI</Link>
          </li>
          <li className={classes.SearchNav_sub}>
            <Link to="/">UI/UX Design</Link>
          </li>
          <li className={classes.SearchNav_sub}>
            <Link to="/">Machine Learning</Link>
          </li>
        </ul>
      </nav>
        </div>
        </div>

    )
}
export default HomeSearch;