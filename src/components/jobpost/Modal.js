import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({
  title,
  company,
  address,
  salary,
  year,
  type,
  locate,
  content,
  Role,
  qualification,
  close,
  id,
}) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ideez.herokuapp.com/api/jobs/job-skills/${id}`)
      .then((res) => {
        // console.log("res: ", res.data);
        setSkills(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="modal">
      <div className="modal_container">
        <div className="modal_close" onClick={() => close(false)}>
          &times;
        </div>
        <div className="modal_title">{title}</div>
        <div className="modal_content row">
          <div className="col-md-6">
            <h3>{company}</h3>
          </div>
          <div className="col-md-6">
            <h3>{salary}</h3>
          </div>
        </div>
        <p className="position">{address}</p>
        <div className="modal_content row">
          <div className="col-md-6">{year}</div>
          <div className="col-md-6">{locate}</div>
        </div>
        <p className="position">{type}</p>
        <p className="description">{content}</p>
        <div className="modal_content row">
          <div className="col-4">
            <p className="position">{Role}</p>
          </div>
          <div className="col-4">
            <p className="position">{qualification}</p>
          </div>
          <div className="col-4">
            {skills.map((sk) => (
              <p className="" key={sk.id}>
                {sk.skill}
              </p>
            ))}
          </div>
        </div>
        <div className="modal_footer">
          <button className="ModalBtn" onClick={() => close(false)}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// , company, address, salary, year, type, locate, content, Role, qualification, close
