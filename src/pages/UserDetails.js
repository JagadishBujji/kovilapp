import { Avatar, Box, Card, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import PreviousTickets from "../Reuseable/Table/PreviousTickets";

const UserDetails = () => {
  return (
    <Stack>
      <h1>
        <b>
          Users <i class="fas fa-chevron-right"></i> UserDetails
        </b>
      </h1>
      <Box>
        <div className="row p-5">
          <div className="col-md-5">
            <Card sx={{ p: 2 }}>
              <div className="row user-tabs">
                <h5>User Details</h5>
                <Button variant="outlined">
                  <EditIcon /> Edit
                </Button>
              </div>
              <div className="row  user-tabs">
                <div className="row user-name">
                  <Avatar sx={{ width: 60, height: 60, mr: 1 }} />
                  <p className="m-0">Jagadish kumar</p>
                </div>
                <Button variant="outlined">Admin</Button>
              </div>
              <div>
                <p>Mobile Number</p>
                <p>
                  <b>12345677890</b>
                </p>
              </div>
              <div>
                <p>Alternate Mobile Number</p>
                <p>
                  <b>12345677890</b>
                </p>
              </div>
              <div>
                <p>Email Address</p>
                <p>
                  <b>jagadish00198@gmail.com</b>
                </p>
              </div>
              <div>
                <p>Aadhar Number</p>
                <p>
                  <b>0000 0000 0000</b>
                </p>
              </div>
              <div>
                <p>Date of Birth</p>
                <p>
                  <b>12-05-1998</b>
                </p>
              </div>
              <div>
                <p>Address</p>
                <p>
                  <b>xxxx yyyyyyy xxxxxx yyyyyyyyyyy</b>
                </p>
              </div>
              <div>
                <p>State</p>
                <p>
                  <b>Tamil Nadu</b>
                </p>
              </div>
              <div>
                <p>District</p>
                <p>
                  <b> Vellore</b>
                </p>
              </div>
              <div>
                <p>ZipCode</p>
                <p>
                  <b>632007</b>
                </p>
              </div>
            </Card>
          </div>

          <div className="col-md-7">
            <Card sx={{ p: 2 }}>
              <div>
                <h5>
                  <b>Current Ticket</b>
                </h5>
                <p>#KAT09</p>
              </div>
              <div className="row Userdetails">
                <div>
                  <p>Assigned On</p>
                  <p><b>23-05-2022</b></p>
                </div>
                <div>
                  <p>Due Date</p>
                  <p><b>28-05-2022</b></p>
                </div>
                <div>
                  <p>Admin</p>
                  <p>#KAU02 Srivatsav</p>
                </div> 
                <div>
                  <p>Compalint Type</p>
                  <p><b>Question of sacred inside temple</b></p>
                </div>
              </div>
            </Card>
            <Card sx={{mt: 5}}>
                <PreviousTickets/>
            </Card>
          </div>
        </div>
      </Box>
    </Stack>
  );
};

export default UserDetails;
