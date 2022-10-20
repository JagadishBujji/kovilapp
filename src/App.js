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
import NewsTable from "./Reuseable/Table/NewsTable";
import ComplaintTypeTable from "./Reuseable/Table/ComplaintTypeTable";
import ComplaintsField from "./pages/ComplaintsField";
// import EventPosts from "./components/EventPost/EventPosts";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("app page", user);
  return (
    <div className="App" >
      <Routes>
        {/* //protected routes */}
        <Route path="/" element={user ? <Home /> : <Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* <Route path="welcome" element={ user?  <Welcome /> :<Navigate to="/login"/>} /> */}
        <Route
          path="/kovil"
          element={user ? <Home /> : <Navigate to="/" />}
          // element={<Home />}
        >
          <Route
            path="home-post"
            element={user ? <HomePost /> : <Navigate to="/" />}
          />
          <Route
            path="user-post"
            element={user ? <UserPosts /> : <Navigate to="/" />}
          />
          <Route
            path="adduser"
            element={user ? <AddUser /> : <Navigate to="/" />}
          />
          <Route
            path="userdetails"
            element={user ? <UserDetails /> : <Navigate to="/" />}
          />
          <Route
            path="tickets"
            element={user ? <Tickets /> : <Navigate to="/" />}
            // element={<Tickets />}
          />
          <Route
            path="ticketsdetails"
            element={user ? <TicketsDetails /> : <Navigate to="/" />}
            // element={<TicketsDetails />}
          />
          <Route
            path="assigntickets"
            element={user ? <AssignTicket /> : <Navigate to="/" />}
          />
           <Route
            path="newstable"
            element={user ? <NewsTable /> : <Navigate to="/" />}
          />
           <Route
            path="complaintstypetable"
            element={user ? <ComplaintTypeTable /> : <Navigate to="/" />}
          />
           <Route
            path="complaintsfield"
            element={user ? <ComplaintsField /> : <Navigate to="/" />}
          />
          
          {/* <Route path="event-post" element={ user? <EventPosts /> : <Navigate to="/login"/>} /> */}
        </Route>
      </Routes>
    </div>
  );
}
