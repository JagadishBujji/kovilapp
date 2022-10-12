import React from "react";
// import ActionAreaCard from "../../Reuseable/ActionAreaCard";
// import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
// import EventEditModal from "../../Reuseable/EventEditModal";
import EventModal from "./EventModal";
import { useState } from "react";

const EventPostCard = (props) => {
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
  const [showeventModal,seteventshowModal] = useState(false);
  return (
    <>
      <div className="row container m-auto p-0" key={props.event.id}>
        <div className="Card jobpost">
          <div className="row">
            <div className="col-md-3">
              <img src="/images/team.png" alt="" className="companylogo" />
            </div>
            <div className="col-md-9 pl-5">
              <div className="edit">
                <h2 onClick={() => seteventshowModal(true)}>
                  <b>{props.event.event_name}</b>
                </h2>
                {/* <EventEditModal /> */}
              </div>
              <p className="m-0">{props.event.company_name}</p>
              <div className="row">
                <div className="col-4">{props.event.event_date}</div>
                <div className="col-8">{props.event.location}</div>
              </div>
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
              <p>{props.event.price}</p>
              <Divider />
              <br />
              <div className="row btnrow">
                {/* <Button variant="outlined">View Applicant</Button> */}
                <div className="job-button">
                  <Button sx={save} variant="outlined" className="mr-2">
                    Save
                  </Button>
                  <Button sx={apply} variant="outlined">
                    Apply
                  </Button>
                  {
                    showeventModal && (
                      <EventModal 
                      eventname = {props.event.event_name}
                      company = {props.event.company_name}
                      date = {props.event.event_date}
                      amount = {props.event.price}
                      locate = {props.event.location}
                      address = {props.event.address}
                      recruiterid = {props.event.recruiters_uid}
                      content= {props.event.description}
                      mode = {props.event.event_mode}
                      icon = {props.event.event_icon}
                      close = {seteventshowModal}
                      />
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EventPostCard;
