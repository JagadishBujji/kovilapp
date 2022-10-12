import React from "react";
import "./NetworkModal.css";
const NetworkModal = ({ close }) => {
  return (
    <div className="modal">
      <div className="modal_container">
        <div className="modal_close" onClick={() => close(false)}>
          &times;
        </div>
        <div className="modal-title">K.P.JagadishKumar</div>
        <div className="modal_content row">
          <div className="col-md-6">
            <h3>ui/ux designer</h3>
          </div>
          <div className="col-md-6">
            <h3></h3>
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

export default NetworkModal;
