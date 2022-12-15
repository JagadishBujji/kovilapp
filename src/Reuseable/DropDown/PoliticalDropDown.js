import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import ComplaintsField from "../../pages/ComplaintsField";
import TicketsBack from "../TicketsBack";
import { db } from "../../services/firebase";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import PoliticalModal from "../../pages/PoliticalModal";
import EditPoliticalModal from "../Edit/EditPoliticalModal";

export default function PoliticalDropDown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isPending,setIsPending]=useState()
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
  // console.log(props.data)

  const deleteHandler = async (e) => {
    // setAnchorEl(null);
    // delete complaint type from db
    setIsPending(true);
    await deleteDoc(doc(db, "political_districts", props.data.more))
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
      }).finally(()=>{
    setIsPending(true);

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
        <MenuItem data={props.data} onClick={editHandler}>Edit</MenuItem>
        <MenuItem disabled={isPending} onClick={deleteHandler}>Delete</MenuItem>
      </Menu>
      {openModal && (
        <EditPoliticalModal
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
