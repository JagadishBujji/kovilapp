import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 2,
  border: "none",
  "@media (max-width:400px)": {
    width: 300,
    maxHeight: "500px",
  },

  "@media (min-width:1200px)": {
    width: 800,
    maxHeight: "700px",
  },
};

const apply = {
  background: "#eeb5eb",
  color: "#fff",
  border: "1px solid #eeb5eb",
  fontSize: "14px",
  fontWeight: "600",
  "&:hover": {
    background: "#eeb5eb",
    color: "#fff",
  },
};
const save = {
  background: "#fff",
  color: "#c26dbc",
  border: "1px solid #eeb5eb",
  fontSize: "14px",
  fontWeight: "600",
  "&:hover": {
    border: "1px solid #c26dbc",
    color: "#c26dbc",
  },
};

export default function EditModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {" "}
      <img
        onClick={handleOpen}
        src="/images/edit-button.png"
        alt=""
        className="Edit-img"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="mb-5">
            <h1>
              <b>Work Experience Edit</b>
            </h1>
            <Divider />
          </Box>

          <TextField
            fullWidth
            id="outlined-basic"
            label="Desination"
            variant="outlined"
            className="mb-5"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Desination"
            variant="outlined"
            className="mb-5"
          />
          <div className="job-button">
            <Button sx={save} variant="outlined" className="mr-2">
              Save
            </Button>
            <Button sx={apply} variant="outlined">
              Apply
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
