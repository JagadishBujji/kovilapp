import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import NewsModal from "../NewsModal/NewsModal";
import TicketsBack from "../TicketsBack";
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

export default function BasicMenu({ data, count, setCount }) {
  // console.log(data.more.props.doc_id);
  const [prevNews,setPrevNews]=useState()
  React.useEffect(() => {
    const getNews = async () => {

      const docRef = doc(db, "short_news", data.more.props.doc_id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dc=docSnap.data();
        setPrevNews(dc.news);
        // console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getNews()
  }, [])
  // console.log(prevNews)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);
  const [isPending, setIsPending] = useState(false);
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

  const handleDelete = async () => {
    // await deleteDoc(doc(db,"short_news",data.ID))
    if (window.confirm("Are you sure you want to delete?")) {

      setIsPending(true)
      await deleteDoc(doc(db, "short_news", data.more.props.doc_id))
        .then((res) => {
          // console.log(res)
          setCount(count + 1)
          alert("deleted successfully")
          handleClose()
          setAnchorEl(null);

        }).catch((err) => {
          alert(err)
          console.log(err);
          handleClose()
          setAnchorEl(null);


        }).finally(() => {
          setIsPending(false)
        })
    } else {
      setAnchorEl(null);

    }
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
      {openModal && <NewsModal count={count} setCount={setCount} editData={data} forWhat="edit" onSave={handleClose} onCancel={handleClose} />}
      {openModal && <TicketsBack onCancel={handleClose} />}
    </div>
  );
}
