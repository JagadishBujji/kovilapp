import { Box, Button, Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MiniModal from "../Reuseable/MiniModal/Minimodal";
import TicketsBack from "../Reuseable/TicketsBack";

const TicketsModalBox = (props) => {
  const [feedBack,setFeedBack]=useState();
  // console.log(feedBack)
  const [openInModal,setOpenInModal] = useState(false);

  const handleMinimodal = () => {
    setOpenInModal(true)
  }

  const deleteMiniModal = () => {
    setOpenInModal(false)
  }

  return (
    <Box>
      <Card sx={{ p: 2 }} className="Ticketsbox">
        <div className="row user-tabs">
          <h5 sx={{ p: 2 }}>
            <b>Add Feedback</b>
          </h5>
          <h5 sx={{ p: 2 }} className="CloseButton">
            <b onClick={props.onCancel}>X</b>
          </h5>
        </div>
        <textarea
          rows="10"
          cols="55"
          onChange={(e)=>{
            setFeedBack(e.target.value);
          }}
          placeholder="Add Feedback"
          className="ticketsInput"
        ></textarea>
        <div className="row Textbtn">
          <Button
            variant="contained"
            onClick={handleMinimodal}
            className="FeedBtn"
            sx={{ background: "#ff6000" }}
          >
            Submit FeedBack
          </Button>
        </div>
        {openInModal && <MiniModal setCount={props.setCount} count={props.count} data={props.data} closeAllModal={props.onCancel} feedBack={feedBack} onCancel={deleteMiniModal}/>}
        {openInModal && <TicketsBack />}
      </Card>
    </Box>
  );
};

export default TicketsModalBox;
