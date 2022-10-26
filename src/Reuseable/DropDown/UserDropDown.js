import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Navigate, useNavigate } from 'react-router-dom';

export default function UserDropDown({row}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        sx={{ml: 3}}
      >
        <MenuItem sx={{align:"center"}} onClick={()=>{
            navigate("/kovil/adduser")
        }}><i class="fas fa-edit mr-2"></i>Edit</MenuItem>
        <MenuItem sx={{align:"center"}} onClick={handleClose}><i class="fas fa-trash mr-2"></i>Delete</MenuItem>
        <MenuItem sx={{align:"center"}} onClick={handleClose}><i class="fas fa-eye-slash mr-2"></i>Disable</MenuItem>
        <MenuItem  sx={{align:"center"}} onClick={()=>{
            navigate(`/kovil/userdetails/${row.id}`)
        }}><i class="fas fa-eye mr-2"></i>View</MenuItem>
      </Menu>
    </div>
  );
}
