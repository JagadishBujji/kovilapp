import React from "react";
import { Link, NavLink } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import AccountMenu from "../.././src/Reuseable/AccountMenu";

const Navbar = () => {
  function open() {
    document.getElementById("mySidebar").style.display = "block";
  }

  const handleClick = () => {
    // alert("hello")
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-2 ">
          {/* <button className="btn-primary" onClick={open}>
            ☰
          </button> */}

          <a className="navbar-brand" href="#/">
            {/* <img src="images/logo.png" alt="" className="Logo-img"  /> */}
            <h1>
              Kovil App
            </h1>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-start"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav w-100 justify-content-start">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "activelink" : "nav-link"
                }
                to="/recruiter/home-post"
              >
                {/* <i className="fas fa-briefcase mr-3"></i> */}
                <i class="fas fa-th-large mr-3"></i>
                <b>Dashboard</b>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? "activelink" : "nav-link"
                }
                to="/recruiter/job-post"
              >
                {/* <i className="fas fa-briefcase mr-3 "></i> */}
                <i class="fas fa-user-friends mr-3"></i>
                <b>Users</b>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? "activelink" : "nav-link "
                }
                to="/recruiter/event-post"
              >
                {/* <i className="fas fa-calendar mr-3"></i> */}
                <i class="fas fa-ticket-alt mr-3"></i>
                <b>Tickets</b>
              </NavLink>

              {/* <li className="nav-item">
                <Link className="nav-link   px-4" to="user-profile">
                  <i className="fas fa-user mr-3"></i>
                  <b>Profile</b>
                </Link>
              </li> */}

              {/* <NavLink
                className={({ isActive }) =>
                  isActive ? "activelink" : "nav-link "
                }
                to="/recruiter/networking"
              >
                <i className="fas fa-user mr-3"></i>
                <b>NetWorking</b>
              </NavLink> */}

              {/* <NavLink
                className={({ isActive }) =>
                  isActive ? "activelink" : "nav-link "
                }
                to="/recruiter/chats"
              >
                <i className="fas fa-user mr-3"></i>
                <b>
                  {/* <img className="chat" src="/images/chat-box.png" /> 
                  Chats
                </b>
              </NavLink> */}
            </ul>

            {/* <div id="panel">
              <div class="username">
                <div id="container-avatar">
                  <img src="/images/profile.png" />
                  <span class="entypo-menu"></span>

                  <div class="avatar">
                    <ul>
                      <li>
                        <a href="user-profile">
                          <span class="entypo-cog"></span>Profile
                        </a>
                      </li>
                      <li>
                        <button onClick={handleClick}>
                          <span class="entypo-logout"></span>Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
