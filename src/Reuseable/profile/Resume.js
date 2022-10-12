import $ from "jquery";
import React from "react";
// import ProfileEditModal from "./ProfileEditModal";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadButtons from "./UploadButtons";

const Resume = () => {
  const Add = {
    fontSize: "16px",
    fontWeight: "800",
    color: "#eeb5eb",
    "&:focus": {
      outline: "none",
    },
  };
  return (
    <>
      <div className="row container m-auto">
        <div className="Card jobpost">
          <h3>
            <b>Resume</b>
          </h3>
          <p>
            Resume is the most important document recruiters look for.
            Recruiters generally do not look at profiles without resumes.
          </p>
          <div className="download">
            <p>
              <b>Jagadish kumar CV-converted.pdf</b> - Uploaded on Mar 24, 2021
            </p>
            <img src="/images/download.png" alt="" className="download-img" />
          </div>
          <div className="delete">
            {/* <img src="/images/delete.png" alt="" className="download-img" /> */}
            <Button
              sx={Add}
              size="large"
              // InputProps={{ style: { fontSize: 18 } }}
              // InputLabelProps={{ style: { fontSize: 18 } }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
          <div className="upload">
            <UploadButtons />
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
