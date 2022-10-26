import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import NewsModal from "../NewsModal/NewsModal";
import TicketsBack from "../TicketsBack";

export default function BasicMenu() {
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

  const deleteHandler = () => {
    setAnchorEl(null);
    alert("news deleted");
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
      {openModal && <NewsModal onSave={handleClose} onCancel={handleClose}/>}
      {openModal && <TicketsBack onCancel={handleClose} />}
    </div>
  );
}
