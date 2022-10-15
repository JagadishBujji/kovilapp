import { Stack, Box, Card, Button, Avatar,} from "@mui/material";
import VerticalLinearStepper from "../Reuseable/Stepper/VerticalLinearStepper";
import { useState } from "react";
import TicketsBack from "../Reuseable/TicketsBack";
import TicketsModalBox from "../Reuseable/TicketsModalBox";

const TicketsDetails = () => {
    const [openModal,setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(true);
  }
  const deleteBack = () => {
    setOpenModal(false);
  }
  return (
    <>
      <Stack>
        <h1>
          <b>
            Tickets <i class="fas fa-chevron-right"></i> Tickets Details
          </b>
        </h1>
        <Box>
          <div className="row p-5">
            <div className="col-md-5">
              <Card sx={{ p: 2 }}>
                <div className="row user-tabs">
                  <h5>#KA001</h5>
                  <Button variant="outlined">In Progress</Button>
                </div>
                {/* <div className="row  user-tabs">
                <div className="row user-name">
                  <Avatar sx={{ width: 60, height: 60, mr: 1 }} />
                  <p className="m-0">Jagadish kumar</p>
                </div>
                <Button variant="outlined">Admin</Button>
              </div> */}
                <div>
                  <p>Complaint</p>
                  <p>
                    <b>John Doe</b>
                  </p>
                </div>
                <div>
                  <p> Mobile Number</p>
                  <p>
                    <b>12345677890</b>
                  </p>
                </div>
                <div>
                  <p>Admin</p>
                  <p>
                    <b>jagadish Kumar</b>
                  </p>
                </div>
                <div>
                  <p>Created On</p>
                  <p>
                    <b>12-05-1998 </b>
                  </p>
                </div>
                <div>
                  <p>Due Date</p>
                  <p>
                    <b>12-05-1998</b>
                  </p>
                </div>
                <div>
                  <p>Email Address</p>
                  <p>
                    <b>jagadish00198@gmail.com</b>
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
                  <h6>
                    <b>Uploaded Items</b>
                  </h6>
                </div>
                <div className="row p-3">
                  <img
                    src="/images/Temples.jpg"
                    alt=""
                    width="80"
                    height="80"
                    className="img-upload"
                  />
                  <img
                    src="/images/temp.jpg"
                    alt=""
                    width="80"
                    height="80"
                    className="img-upload"
                  />
                  <img
                    src="/images/Temples.jpg"
                    alt=""
                    width="80"
                    height="80"
                    className="img-upload"
                  />
                  <img
                    src="/images/Temples.jpg"
                    alt=""
                    width="80"
                    height="80"
                    className="img-upload"
                  />
                </div>
                <div className="row ">
                  <div className="p-2">
                    <i class="fas fa-microphone"></i>
                  </div>
                  <div className="temple1">
                    <p>Sri Arasavalli Temple, Srikakulam</p>
                    <p>
                      <b>28-05-2022</b>
                    </p>
                  </div>
                  <div>
                    <p>Admin</p>
                    <p>00:41:22</p>
                  </div>
                </div>
              </Card>
              <Card sx={{ mt: 5, p: 2 }}>
                <VerticalLinearStepper/>
                <div className="row user-tabs">
                <Button variant="outlined" onClick={handleModal}>Add Feedback</Button>
                <Button variant="contained" >Assign Tickets</Button>
                </div>
                
              </Card>
            </div>
          </div>
        </Box>
      </Stack>
      {openModal && <TicketsModalBox onCancel = {deleteBack}/>}
      {openModal && <TicketsBack onCancel = {deleteBack}/>}
    </>
  );
};

export default TicketsDetails;
