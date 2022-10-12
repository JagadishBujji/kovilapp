import React from "react";
import "./styles.css";
// import { useContext } from "react";
import { Route, Routes ,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Welcome from "./components/Welcome/Welcome";
import HomePost from "./components/HomePage/HomePost";
import JobPosts from "./components/jobpost/JobPosts";
import EventPosts from "./components/EventPost/EventPosts";
import UserProfile from "./pages/UserProfile";
import NetWorking from "./pages/NetWorking";
import Chats from "./pages/Chats";

export default function App() {
  const user= JSON.parse(localStorage.getItem("user"))
  console.log("app page", user);
  return (
    <div className="App">
      <Routes>
        {/* //protected routes */}
        <Route path="/" element={ user? <Home/>: <Navigate to="/login"/> }    />
        <Route path="/login" element={ user? <Navigate to="/recruiter"/>: <Login/>}/>
        <Route path="/signup" element={ user? <Navigate to="/recruiter"/> : <Signup />  } />
        <Route path="welcome" element={ user?  <Welcome /> :<Navigate to="/login"/>} />
        <Route path="/recruiter" element={ user? <Home /> : <Navigate to="/login"/>}>
        <Route path="home-post" element={ user?  <HomePost /> :<Navigate to="/login"/>} />
          <Route path="job-post" element={ user?  <JobPosts /> :<Navigate to="/login"/>} />
          <Route path="event-post" element={ user? <EventPosts /> : <Navigate to="/login"/>} />
          
        </Route>
      </Routes>
    </div>
  );
}
