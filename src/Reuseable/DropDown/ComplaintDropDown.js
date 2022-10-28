import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import ComplaintsField from "../../pages/ComplaintsField";
import TicketsBack from "../TicketsBack";
import { db } from "../../services/firebase";
import { setDoc, doc } from "firebase/firestore";
export default function ComplaintDropDown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const editHandler = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };

  const deleteHandler = async(e) => {
    setAnchorEl(null);
    // delete complaint type from db
    alert("Compliant type deleted");
  };

  return (
    <div>
      <span onClick={handleClick}>
        <MoreVertIcon />
      </span>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={editHandler}>Edit</MenuItem>
        <MenuItem onClick={deleteHandler}>Delete</MenuItem>
      </Menu>
      {openModal && (
        <ComplaintsField
          refresh={props.refresh}
          setRefresh={props.setRefresh}
          eData={props.eData}
          onCancel={handleClose}
          value={props.value}
        />
      )}
      {openModal && <TicketsBack onCancel={handleClose} />}
    </div>
  );
}
