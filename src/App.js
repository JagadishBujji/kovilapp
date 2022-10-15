import React from "react";
import "./styles.css";
// import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
// import Welcome from "./components/Welcome/Welcome";
import HomePost from "./components/HomePage/HomePost";

import UserPosts from "./components/Userpost/UserPosts";
import Tickets from "./components/Tickets/Tickets";
import AddUser from "./pages/AddUser";
import UserDetails from "./pages/UserDetails";
import TicketsDetails from "./pages/TicketDetails";
import AssignTicket from "./pages/AssignTicket";
// import EventPosts from "./components/EventPost/EventPosts";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("app page", user);
  return (
    <div className="App">
      <Routes>
        {/* //protected routes */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/recruiter" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/recruiter" /> : <Signup />}
        />
        {/* <Route path="welcome" element={ user?  <Welcome /> :<Navigate to="/login"/>} /> */}
        <Route
          path="/kovil"
          element={user ? <Home /> : <Navigate to="/login" />}
        >
          <Route
            path="home-post"
            element={user ? <HomePost /> : <Navigate to="/login" />}
          />
          <Route
            path="user-post"
            element={user ? <UserPosts /> : <Navigate to="/login" />}
          />
          <Route
            path="adduser"
            element={user ? <AddUser /> : <Navigate to="/login" />}
          />
          <Route
            path="userdetails"
            element={user ? <UserDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="tickets"
            element={user ? <Tickets /> : <Navigate to="/login" />}
          />
          <Route
            path="ticketsdetails"
            element={user ? <TicketsDetails /> : <Navigate to="/login" />}
          />
           <Route
            path="assigntickets"
            element={user ? <AssignTicket/> : <Navigate to="/login" />}
          />
          {/* <Route path="event-post" element={ user? <EventPosts /> : <Navigate to="/login"/>} /> */}
        </Route>
      </Routes>
    </div>
  );
}
