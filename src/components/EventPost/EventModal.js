import React from "react";
import "./EventModal.css";
const EventModal = ({
  eventname,
  company,
  date,
  amount,
  locate,
  address,
  recruiterid,
  content,
  mode,
  icon,
  close,
}) => {
  return (
    <div className="modal">
      <div className="modal_container">
        <div className="modal_close" onClick={() => close(false)}>
          &times;
        </div>
        <div className="modal_title">{eventname}</div>
        <div className="modal_content row">
          <div className="col-md-6">
            <h3>{company}</h3>
          </div>
          <div className="col-md-6">
            <h3>{amount}</h3>
          </div>
        </div>
        <p className="position">{address}</p>
        <div className="modal_content row">
          <div className="col-md-6">{date}</div>
          <div className="col-md-6">{locate}</div>
        </div>
        <p className="position">{recruiterid}</p>
        <p className="description">{content}</p>
        <div className="modal_content row">
          <div className="col-6">
            <p className="position">{icon}</p>
          </div>
          <div className="col-6">
            <p className="position">{mode}</p>
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

export default EventModal;
