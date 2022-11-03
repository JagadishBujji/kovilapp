import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import ComplaintsField from "../../pages/ComplaintsField";
import TicketsBack from "../TicketsBack";
import { db } from "../../services/firebase";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
export default function ComplaintDropDown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);
  // console.log(props.data);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpenModal(false);
    setAnchorEl(null);
  };

  const editHandler = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };

  const deleteHandler = async (e) => {
    // setAnchorEl(null);
    // delete complaint type from db
    await deleteDoc(doc(db, "complaint_types", props.data.more))
      .then((res) => {
        console.log(res)
        props.setCount(props.count + 1)
        alert("deleted successfully")
        handleClose()
        setAnchorEl(null);

      }).catch((err) => {
        alert(err)
        console.log(err);
        handleClose()
        setAnchorEl(null);
      })
    // alert("Compliant type deleted");
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
          count={props.count}
          setCount={props.setCount}
          forWhat="editType"
          data={props.data}
          onCancel={handleClose}
          value={props.value}
        />
      )}
      {openModal && <TicketsBack onCancel={handleClose} />}
    </div>
  );
}
