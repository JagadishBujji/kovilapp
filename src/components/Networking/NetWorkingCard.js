import React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import NetworkModal from "./NetworkModal";
import { useState } from "react";

const NetWorkingCard = () => {
  const apply = {
    background: "#eeb5eb",
    color: "#fff",
    border: "1px solid #eeb5eb",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "20px",
    "&:hover": {
      background: "#eeb5eb",
      color: "#fff",
    },
  };
  const save = {
    background: "#fff",
    color: "#c26dbc",
    border: "1px solid #eeb5eb",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "20px",
    "&:hover": {
      border: "1px solid #c26dbc",
      color: "#c26dbc",
    },
  };
  const [showNetModal,setNetModal] = useState(false);
  return (
    <>
      <div className="row container m-auto p-0">
        <div className="Card jobpost">
          <div className="row">
            <div className="col-md-3">
              <img src="/images/team.png" alt="" className="companylogo" />
            </div>
            <div className="col-md-9 pl-2">
              <div className="edit">
                <h2 onClick={() => setNetModal(true)}>
                  <b>Jagadish Kumar</b>
                </h2>
                {/* <EventEditModal /> */}
              </div>
              <p className="mb-5">Ui/UX Designer</p>

              <div className="row btnrow1">
                {/* <Button variant="outlined">View Applicant</Button> */}
                <div className="job-button">
                  <Button sx={save} variant="outlined" className="mr-2">
                    Connect Me
                  </Button>
                  {/* <Button sx={apply} variant="outlined">
                    Follow
                  </Button> */}
                  {showNetModal && (
                    <NetworkModal 
                    close = {setNetModal}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetWorkingCard;
