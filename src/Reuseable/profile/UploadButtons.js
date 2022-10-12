import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function UploadButtons() {
  const upload = {
    background: "#eeb5eb",
    fontSize: "inherit",
    fontWeight: 900,
    fontFamily: "Roboto",

    "&:hover": {
      // border: "1px solid #c26dbc",
      color: "#fff",
      background: "#eeb5eb",
      fontWeight: 900,
    },
  };
  return (
    <Stack
      sx={{ display: "inline-grid" }}
      direction="row"
      alignItems="center"
      spacing={2}
    >
      <Button
        size="larger"
        sx={upload}
        startIcon={<CloudUploadIcon />}
        variant="contained"
        component="label"
      >
        Upload Resume
        <input hidden accept="image/*" multiple type="file" />
      </Button>

      {/* <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton> */}
      <div>
        <span>Supported Formats: doc, docx, rtf, pdf, upto 2 MB</span>
      </div>
    </Stack>
  );
}
