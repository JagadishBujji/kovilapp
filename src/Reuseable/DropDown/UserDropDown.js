import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, deleteUser } from "firebase/auth";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';


export default function UserDropDown({ row }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  // console.log(row);
  const open = Boolean(anchorEl);
  // console.log(row);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isPending, setIsPending] = useState();

  const handleDelete = async () => { 
    // const auth = getAuth();
    // const user = auth.currentUser;
    console.log(row.doc_id)
    // setIsPending(true)
    // await deleteUser(row.id).then(async () => {

    //   setIsPending(true)
    //   await deleteDoc(doc(db, "admins", row.doc_id))
    //     .then(() => {
    //       setIsPending(false)
    //       alert("user deleted")
    //       setAnchorEl(null);
    //       navigate(`/kovil/home-post`)
    //     }).catch((err) => {
    //       setIsPending(false)

    //       alert(err)
    //       setAnchorEl(null);

    //     })
    // }).catch((error) => {
    //   setIsPending(false)

    //   alert(error)
    //   setAnchorEl(null);

    // }); 
      setIsPending(true)
      await deleteDoc(doc(db, "admins", row.doc_id))
        .then(() => {
          setIsPending(false)
          alert("user deleted")
          setAnchorEl(null);
          // navigate(`/kovil/home-post`)
        }).catch((err) => {
          setIsPending(false) 
          alert(err)
          setAnchorEl(null);

        })
    } 

  return (
    <div>
      <span
        onClick={handleClick}
      >
        <MoreVertIcon />
      </span>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ ml: 3 }}
      >
        <MenuItem sx={{ align: "center" }} onClick={() => {
          navigate(`/kovil/editUser/${row.id}`)
        }}
        hidden={row.role==="admin"}
        ><i class="fas fa-edit mr-2"></i>Edit</MenuItem>
        <MenuItem disabled={isPending} sx={{ align: "center" }}
        
        hidden={row.role==="admin"}
        onClick={handleDelete}><i class="fas fa-trash mr-2"></i>Delete</MenuItem>
        {/* <MenuItem sx={{ align: "center" }} onClick={handleClose}><i class="fas fa-eye-slash mr-2"></i>Disable</MenuItem> */}
        <MenuItem  sx={{ align: "center" }} onClick={() => {
          navigate(`/kovil/userdetails/${row.id}`)
          
        }}
        hidden={row.role==="admin"}
        
        ><i class="fas fa-eye mr-2"></i>View</MenuItem>
      </Menu>
    </div>
  );
}
