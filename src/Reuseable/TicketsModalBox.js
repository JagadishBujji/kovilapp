import { Box, Button, Card } from "@mui/material";
import TextField from "@mui/material/TextField";

const TicketsModalBox = (props) => {
  return (
    <Box>
      <Card sx={{ p: 2 }} className="Ticketsbox">
        <div className="row user-tabs">
          <h5 sx={{ p: 2 }}>
            <b>Add Feedback</b>
          </h5>
        </div>
        <textarea rows="10" cols="55" placeholder="Add Feedback" className="ticketsInput"></textarea>
        <div className="row Textbtn">
          <Button
            variant="contained"
            onClick={props.onCancel}
            className="FeedBtn"
            sx={{background:"#ff6000"}}
          >
            Submit FeedBack
          </Button>
        </div>
      </Card>
    </Box>
  );
};

export default TicketsModalBox;
