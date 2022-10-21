import { Card, } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from "@mui/material/Button";

const NewsModal = (props) => {
  const save = {
    backgroundColor: "#f17116",
    color: "#fff",
    m: 2,
    "&:hover": {
      backgroundColor: "#f17116",
      color: "#fff",
    },

  };

  const cancel = {
    borderColor: "#f17116",
    color: "#f17116",
    m: 2,
    "&:hover": {
        borderColor: "#f17116",
      color: "#f17116",
    },

  };
  return (
    <Card sx={{ p: 3 }} className="Newsmodal">
        <div className="row user-tabs">
        <h4>Add News</h4>
        <span className = "crossBtn" onClick={props.onCancel}><b>X</b></span>
      </div>
      <TextareaAutosize
      aria-label="minimum height"
      minRows={8}
      placeholder=""
      style={{ width: 500 }}
    />
      <div className="row complaints-btn ">
        <Button variant="contained" sx={save} onClick={props.onCancel}>
          Save
        </Button>
        <Button variant="outlined" sx={cancel} onClick={props.onSave}>
          Cancel
        </Button>

      </div>
    </Card>
  );
};

export default NewsModal;