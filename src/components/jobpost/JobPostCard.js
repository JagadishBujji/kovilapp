import React from "react";
// import ActionAreaCard from "../../Reuseable/ActionAreaCard";
// import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import EditModal from "../../Reuseable/EditModal";
import Modal from "./Modal";
import { useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { addSavedJobs } from "../../Redux/savedJobs";

const JobPostCard = (props) => {
  const ss=useSelector((state)=>state);
  // console.log(ss)
  const dispatch=useDispatch();
  const handleSave=()=>{
    // console.log(props.job);
    dispatch(addSavedJobs(props.job)) 
  } 
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

  const [showModal, setshowModal] = useState(false);

  return (
    <>
      <div className="row container-fluid m-auto p-0" key={props.job.id}>
        <div className="Card jobpost">
          <div className="row">
            <div className="col-md-3">
              <img src="/images/team.png" alt="" className="companylogo" />
            </div>
            <div className="col-md-9 pl-5">
              <div className="edit">
                <h2 className="job-Head" onClick={() => setshowModal(true)}>
                  <b>{props.job.job_title}</b>
                </h2>

                {/* <EditModal /> */}
              </div>
              <p className="job-company">{props.job.company_name}</p>
              <div className="row">
                <div className="col-4 years">{props.job.experience}</div>
                <div className="col-8 location">{props.job.location}</div>
              </div>
              <p className="dd">{props.job.address}</p>
              <p className="dc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p className="pa">{props.job.salary}</p>
              <Divider />
              <br />
              <div className="row btnrow">
                {/* <Button variant="outlined">View Applicant</Button> */}
                <div className="job-button">
                  <Button sx={save} onClick={()=>{
                    handleSave()
                  }} variant="outlined" className="mr-2">
                    Save
                  </Button>
                  <Button sx={apply} variant="outlined">
                    Apply
                  </Button>
                  {showModal && (
                    <Modal
                      id={props.job.id}
                      title={<span>{props.job.job_title}</span>}
                      company={props.job.company_name}
                      salary={props.job.salary}
                      address={props.job.address}
                      year={<h3>0-2years</h3>}
                      type={props.job.job_type}
                      locate={props.job.location}
                      Role={props.job.position}
                      content={<p>{props.job.description}</p>}
                      qualification={props.job.education}
                      close={setshowModal}
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
export default JobPostCard;
