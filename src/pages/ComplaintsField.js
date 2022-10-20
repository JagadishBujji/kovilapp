import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ComplaintsField = () => {
    return (
        <Card sx={{ p: 3 }}>
            <h4>Complaint Types</h4>
         <div className="row user-tabs">
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    fullWidth
                    type="text"
                  />
                </div>
                <div className="row complaints-btn">
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#ff6000", color: "#fff", mr: 2 }}
                  >
                    Save
                  </Button>
                  </div>
        </Card>
    )
}

export default ComplaintsField;