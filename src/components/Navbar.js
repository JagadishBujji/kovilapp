import { DriveEta } from "@mui/icons-material";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

// import ChatIcon from "@mui/icons-material/Chat";
// import AccountMenu from "../.././src/Reuseable/AccountMenu";

const Navbar = () => {
  function open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleClick = () => {
    // alert("hello")
    // localStorage.clear()
    // navigate("/")
    localStorage.removeItem("subadmin");
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-2 ">
          {/* <button classNameName="btn-primary" onClick={open}>
            ☰
          </button> */}

          <a className="navbar-brand" href="#/">
            {/* <img src="images/logo.png" alt="" classNameName="Logo-img"  /> */}
            <h1 style={{ fontFamily: "Uomo" }}>Kovil App</h1>
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
         {user &&     <NavLink
                className={({ isActive }) =>
                  isActive ? "activelink" : "nav-link"
                }
                to="/kovil/home-post"
              >
                {/* <i classNameName="fas fa-briefcase mr-3"></i> */}
                <i className="fas fa-th-large mr-1"></i>
                Dashboard
              </NavLink>}

              {user && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "activelink" : "nav-link"
                  }
                  to="/kovil/user-post"
                >
                  {/* <i classNameName="fas fa-briefcase mr-3 "></i> */}
                  <i className="fas fa-user-friends mr-1"></i>
                  Users
                </NavLink>
              )}

              <NavLink
                className={({ isActive }) =>
                  isActive ? "activelink" : "nav-link "
                }
                to="/kovil/tickets"
              >
                {/* <i classNameName="fas fa-calendar mr-3"></i> */}
                <i className="fas fa-ticket-alt mr-1"></i>
                Tickets
              </NavLink>
              {user && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "activelink" : "nav-link "
                  }
                  to="/kovil/newstable"
                >
                  <i className="fas fa-newspaper mr-1"></i>
                  News
                </NavLink>
              )}

              {user && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "activelink" : "nav-link "
                  }
                  to="/kovil/complaintstypetable"
                >
                  <i class="fas fa-pager mr-1"></i>
                  Complaint Type
                </NavLink>
              )}
              {user && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "activelink" : "nav-link "
                  }
                  to="/kovil/political"
                >
                  <i class="fas fa-landmark mr-1"></i>
                  Political
                </NavLink>
              )}

              {/* <li classNameName="nav-item">
                <Link classNameName="nav-link   px-4" to="user-profile">
                  <i classNameName="fas fa-user mr-3"></i>
                  <b>Profile</b>
                </Link>
              </li> */}

              {/* <NavLink
                classNameName={({ isActive }) =>
                  isActive ? "activelink" : "nav-link "
                }
                to="/recruiter/networking"
              >
                <i classNameName="fas fa-user mr-3"></i>
                <b>NetWorking</b>
              </NavLink> */}

              {/* <NavLink
                classNameName={({ isActive }) =>
                  isActive ? "activelink" : "nav-link "
                }
                to="/recruiter/chats"
              >
                <i classNameName="fas fa-user mr-3"></i>
                <b>
                  {/* <img classNameName="chat" src="/images/chat-box.png" /> 
                  Chats
                </b>
              </NavLink> */}
            </ul>

            <div id="panel">
              <div className="username">
                <div id="container-avatar">
                  <img src="/images/prof1.jpg" />
                  <span className="entypo-menu"></span>

                  <div className="avatar">
                    <ul>
                      {/* <li>
                        <a href="user-profile">
                        <i class="fas fa-user-circle mr-1"></i>Profile
                        </a>
                      </li> */}
                      <li>
                        <button className="logout" onClick={handleClick}>
                          <i class="fas fa-sign-out-alt mr-1"></i>Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
