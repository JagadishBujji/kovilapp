import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

export default function TicketsDropDown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className='row drpdwnBtn'>
    <span onClick={props.onPress} ><VisibilityIcon /></span>
       <span  onClick={props.onNavigate}><EditIcon /></span> 
       
      </div>
    </div>
  );
}
// onClick={props.onPress}