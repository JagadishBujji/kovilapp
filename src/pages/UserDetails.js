import { Avatar, Box, Card, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import PreviousTickets from "../Reuseable/Table/PreviousTickets";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const docId=useParams().id
  const subadmin=JSON.parse(localStorage.getItem("subadmin"))
  const [data, setData] = useState(); 
  const [count,setCount]=useState(0) 
  useEffect(() => {
    const getDetails = async () => {
      const docRef = doc(db, "admins", docId)
      try {
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data())
        setData(docSnap.data());
      } catch (err) {
        alert("Invalid user id")
        console.log(err)
      }
    }
    getDetails();
  }, [count]);
  // console.log(data);

  const save = {
    backgroundColor: "#f17116",
    color: "#fff",
    
    "&:hover": {
      backgroundColor: "#f17116",
      color: "#fff",
    },

  };

  const navigate = useNavigate();
  return (
    <Stack>
      <h1 style={{padding: "0 45px"}}>
        <b>
        <span 
        className="navigateArrow"
        onClick={() => {
          navigate("/kovil/user-post")
        }}>Users</span>   <i class="fas fa-chevron-right"></i> UserDetails
        </b>
      </h1>
      <Box>
        <div className="row p-5">
          <div className="col-md-5">
            <Card sx={{ p: 2 }}>
              <div className="row user-tabs">
                <h5>User Details</h5>
                <Button onClick={()=>{
                  navigate(`/kovil/editUser/${docId}`)
                }} variant="text">
                  <EditIcon /> Edit
                </Button>
              </div>
              <div className="row  user-tabs">
                <div className="row user-name">
                {data?.profilePic && <img src={data.profilePic} width="150" alt="img"/>}
                 {!data?.profilePic && <Avatar sx={{ width: 60, height: 60, mr: 1 }} />}
                 <p className="m-0">{data?.first_name} {data?.last_name}</p>
                </div>
                <Button variant="contained" sx={save}>{data?.role==="Sub-Admin"? "Subadmin":"Admin"}</Button>
              </div>
              <div>
                <p>Mobile Number</p>
                <p>
                  <b>{data?.phone_number}</b>
                </p>
              </div>
              <div>
                <p>Alternate Mobile Number</p>
                <p>
                  <b>{data?.alternate_number}</b>
                </p>
              </div>
              <div>
                <p>Email Address</p>
                <p>
                  <b>{data?.email}</b>
                </p>
              </div>
              <div>
                <p>Aadhar Number</p>
                <p>
                  <b>{data?.aadhar}</b>
                </p>
              </div>
              <div>
                <p>Date of Birth</p>
                <p>
                  <b>{data?.dob}</b>
                </p>
              </div>
              {/* <div>
                <p>Address</p>
                <p>
                  <b>xxxx yyyyyyy xxxxxx yyyyyyyyyyy</b>
                </p>
              </div> */}
              <div>
                <p>State</p>
                <p>
                  <b>{data?.state}</b>
                </p>
              </div>
              <div>
                <p>District</p>
                <p>
                  <b>{data?.district}</b>
                </p>
              </div>
              <div>
                <p>ZipCode</p>
                <p>
                  <b>{data?.pincode}</b>
                </p>
              </div>
            </Card>
          </div>

        {data?.role==="Sub-Admin" &&  <div className="col-md-7">
            <Card sx={{ p: 2 }}>
              <div>
                <h5>
                  <b>Current Ticket</b>
                </h5>
                {/* <p>#KAT09</p> */}
              </div>
              {data?.current_ticket?.length>0 ?
              data.current_ticket.map((cc)=>(
                
              <div
              onClick={() => navigate(`/kovil/ticketsdetails/${cc.doc_id}`)}
              
              className="row Userdetails">
                <div >
                  <p>Posted On</p>
                  <p><b>{cc.posted_on}</b></p>
                </div>
                {/* <div>
                  <p>Due Date</p>
                  <p><b>28-05-2022</b></p>
                </div> */}
                {/* <div>
                  <p>Admin</p>
                  <p>#KAU02 Srivatsav</p>
                </div>  */}
                <div>
                  <p>Compalint Type</p>
                  <p><b>{cc.complaint_type}</b></p>
                </div>
                <div>
                  <p>Message</p>
                  <p><b>{cc.message}</b></p>
                </div>
                 
              </div>
              ))
              :
              <p>No current ticket available</p>}
            </Card>
            {/* <Card sx={{mt: 5}}>
                <PreviousTickets/>
            </Card> */}
            <br/>
            <Card sx={{ p: 2 }}>
              <div>
                <h5>
                  <b>Previous Ticket</b>
                </h5>
                {/* <p>#KAT09</p> */}
              </div>
            {data?.closed_ticket?
              data.closed_ticket.map((cc)=>(
                
              <div
              onClick={() => navigate(`/kovil/ticketsdetails/${cc.doc_id}`)}
              
              className="row Userdetails">
                <div >
                  <p>Posted On</p>
                  <p><b>{cc.posted_on}</b></p>
                </div>
                {/* <div>
                  <p>Due Date</p>
                  <p><b>28-05-2022</b></p>
                </div> */}
                {/* <div>
                  <p>Admin</p>
                  <p>#KAU02 Srivatsav</p>
                </div>  */}
                <div>
                  <p>Compalint Type</p>
                  <p><b>{cc.complaint_type}</b></p>
                </div>
                <div>
                  <p>Message</p>
                  <p><b>{cc.message}</b></p>
                </div>
                 
              </div>
              ))
              :
              <p>No closed ticket available</p>}
              </Card>
          </div>}
        </div>
      </Box>
    </Stack>
  );
};

export default UserDetails;
