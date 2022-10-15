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

        <TextField
          id="outlined-basic"
          label="Add Your FeedBack"
          variant="outlined"
          fullWidth
        />
        <div className="row Textbtn">
          <Button
            variant="contained"
            onClick={props.onCancel}
            className="FeedBtn"
          >
            Submit FeedBack
          </Button>
        </div>
      </Card>
    </Box>
  );
};

export default TicketsModalBox;
