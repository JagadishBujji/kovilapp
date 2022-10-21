import Button from "@mui/material/Button";

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

const UserModal = (props) => {
    return(
        <div className="Minimodal">
        <p>Do you want to Cancel?</p>
        <Button variant="contained" sx={save} onClick={props.onConfirm}>
          Save
        </Button>
        <Button variant="outlined" sx={cancel} onClick={props.onCancel}>
          Cancel
        </Button>
        </div>
    )
}
export default UserModal;