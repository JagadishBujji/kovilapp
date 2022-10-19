import { Alert, Avatar, Box, Card, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import Button from "@mui/material/Button";
import SelectField from "../Reuseable/SelectField/SelectField";
import TextField from "@mui/material/TextField";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import StateSelect from "../Reuseable/SelectField/StateSelect";
import DistrictSelect from "../Reuseable/SelectField/DistrictSelect";
import { useState } from "react";
import UserModal from "../Reuseable/UserModal/UserModal";
import TicketsBack from "../Reuseable/TicketsBack";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowModal(true);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const deleteHandle = () => {
    navigate("/kovil/user-post");
  };
  return (
    <>
      <Stack>
        <h1>
          Users <i class="fas fa-chevron-right"></i> Add User{" "}
        </h1>
        <Box>
          <Card sx={{ p: 3 }}>
            <h1>
              <b>Add User</b>
            </h1>
            <Box sx={{ p: 3 }}>
              <div className="row">
                <div className="col-md-6 picture">
                  <Avatar sx={{ width: 56, height: 56 }} />{" "}
                  <form action="/action_page.php">
                    <input type="file" id="myFile" name="filename" />
                  </form>
                </div>
                <div className="col-md-6">
                  <SelectField />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    label="Enter First Name"
                    variant="outlined"
                    fullWidth
                    type="text"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif",
                    }}
                  />
                </div>
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    label="Enter Last Name"
                    variant="outlined"
                    fullWidth
                    type="text"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif",
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    label="Enter Mobile Number"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif",
                    }}
                  />
                </div>
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    label="Enter Alternate Mobile Number"
                    variant="outlined"
                    fullWidth
                    type="tel"
                  />
                </div>
              </div>
              <TextField
                id="outlined-basic"
                label="Enter Email ID"
                variant="outlined"
                fullWidth
                type="email"
                sx={{
                  mb: 2,
                  fontSize: "14px",
                  fontWeight: "900",
                  fontFamily: "sans-serif",
                }}
              />
              <div className="row">
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    label="Enter Aadhar Number"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif",
                    }}
                  />
                </div>
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    fullWidth
                    type="date"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif",
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 picture">
                  <StateSelect />
                </div>
                <div className="col-md-6 picture">
                  <DistrictSelect />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    label="ZipCode"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "900",
                      fontFamily: "sans-serif",
                    }}
                  />
                </div>
                <div className="col-md-6 picture1">
                  <Button
                    variant="contained"
                    sx={{ mr: 2, backgroundColor: "#198754", color: "#fff" }}
                  >
                    + Add
                  </Button>
                </div>
              </div>
              <div className="row okbutton">
                <Button variant="text" sx={{ mr: 2 }} onClick={handleClick}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#ff6000", color: "#fff" }}
                >
                  Add User
                </Button>
              </div>
              {showModal && (
                <UserModal onConfirm={deleteHandle} onCancel={handleCancel} />
              )}
              {showModal && <TicketsBack />}
            </Box>
          </Card>
        </Box>
      </Stack>
    </>
  );
};

export default AddUser;
