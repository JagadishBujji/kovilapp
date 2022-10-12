import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

export default function EditModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          color: "#000",
          border: "1px solid #EEB5EB",
          fontSize: "12px",
          fontWeight: "600",
          "&:hover": {
            background: "#EEB5EB",
            color: "#fff",
            "&:active": {
              outline: "1px solid #EEB5EB",
            },
          },
        }}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{marginBottom: "10px"}} variant="h4" component="h2">
            Job Post Edit
          </Typography>
          <label class="ed">
            <input type="text" class="input-ed" placeholder="&nbsp;" />
            <span class="label">Job title</span>
           
          </label>
          <label class="ed">
            <input type="text" class="input-ed" placeholder="&nbsp;" />
            <span class="label">Company Name</span>
           
          </label>
          <label class="ed">
            <input type="text" class="input-ed" placeholder="&nbsp;" />
            <span class="label">Experience</span>
           
          </label>
          <label class="ed">
            <input type="text" class="input-ed" placeholder="&nbsp;" />
            <span class="label">Location</span>
           
          </label>
          <label class="ed">
            <input type="text" class="input-ed" placeholder="&nbsp;" />
            <span class="label">Skills</span>
           
          </label>
          <label class="ed">
            <input type="text" class="input-ed" placeholder="&nbsp;" />
            <span class="label">Job Description</span>
           
          </label>
          <label class="ed">
            <input type="text" class="input-ed" placeholder="&nbsp;" />
            <span class="label">Annual Pay</span>
           
          </label>
         <div className="row ed-button">
           <button className="button button-1">Close</button>
           <button className="button button-2">Publish</button>
         </div>
        </Box>
      </Modal>
    </div>
  );
}
