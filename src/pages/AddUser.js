import { Avatar, Box, Card, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import Button from "@mui/material/Button";
import SelectField from "../Reuseable/SelectField/SelectField";
import TextField from "@mui/material/TextField";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import StateSelect from "../Reuseable/SelectField/StateSelect";
import DistrictSelect from "../Reuseable/SelectField/DistrictSelect";

const AddUser = () => {
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
                  <span>Upload Profile Picture</span>
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
                  />
                </div>
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    label="Enter Last Name"
                    variant="outlined"
                    fullWidth
                    type="text"
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
                sx={{ mb: 2 }}
              />
              <div className="row">
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    label="Enter Aadhar Number"
                    variant="outlined"
                    fullWidth
                    type="tel"
                  />
                </div>
                <div className="col-md-6 picture">
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    fullWidth
                    type="date"
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
                  />
                </div>
                <div className="col-md-6 picture1">
                <Button variant="text" sx={{ mr: 2 }}>
                  + Add
                </Button>
                </div>
              </div>
              <div className="row okbutton">
                <Button variant="text" sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button variant="text">Add User</Button>
              </div>
            </Box>
          </Card>
        </Box>
      </Stack>
    </>
  );
};

export default AddUser;
