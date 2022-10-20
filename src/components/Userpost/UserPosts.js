// import React, { useEffect, useState } from "react";
import * as React from "react";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import UserTab from "../../Reuseable/Tabs/UserTab";
import { useNavigate } from "react-router-dom";

const UserPosts = () => {
  const navigate = useNavigate();
 
  return (
    <>
      <Card sx={{ padding: "20px" }} variant="outlined">
        <div className="row user-tabs">
          <h4>
            <b>User</b>
          </h4>
          <Button sx={{borderColor:"#ff6000", color: "#ff6000"}} variant="outlined" onClick={() => navigate("/kovil/adduser")}>
            + Add User
          </Button>
        </div>
        {/* {setAdduser && <AddUser/>} */}
        {/* {openAdduser && navigate("tickets")} */}
        <UserTab />
      </Card>
    </>
  );
};

export default UserPosts;
