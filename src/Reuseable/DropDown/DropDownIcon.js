import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import NewsModal from "../NewsModal/NewsModal";
import TicketsBack from "../TicketsBack";
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';    

export default function BasicMenu({data,count,setCount}) {
  // console.log(data);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);
  const [isPending,setIsPending]=useState(false);
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

  const deleteHandler = () => {
    setAnchorEl(null);
    alert("news deleted");
  };

  const handleDelete=async()=>{
    // await deleteDoc(doc(db,"short_news",data.ID))
    setIsPending(true)
    await deleteDoc(doc(db,"short_news",data.more.props.doc_id))
    .then((res)=>{
      console.log(res)
      setCount(count+1)
      alert("deleted successfully")
      handleClose()
    setAnchorEl(null);

    }).catch((err)=>{
      alert(err)
      console.log(err);
      handleClose()
    setAnchorEl(null);


    }).finally(()=>{
      setIsPending(false)
    })
  }

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
        {/* <MenuItem onClick={deleteHandler}>Delete</MenuItem> */}
        <MenuItem disabled={isPending} onClick={handleDelete}>Delete</MenuItem>

      </Menu>
      {openModal && <NewsModal count={count} setCount={setCount} editData={data} forWhat="edit" onSave={handleClose} onCancel={handleClose}/>}
      {openModal && <TicketsBack onCancel={handleClose} />}
    </div>
  );
}
