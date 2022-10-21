import { Stack, Box, Card, Button, Avatar } from "@mui/material";
import AssignSelect from "../Reuseable/SelectField/AssignSelect";
import TextField from "@mui/material/TextField";
import { db } from "../services/firebase";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const AssignTicket = () => {
  const docId = useParams().id;
  const [count,setCount]=useState(0)
  const  [data,setData]=useState()
  const [subAdmins,setSubAdmins]=useState();  
  const [selectedSubAdmin,setSelectedSubAdmin]=useState();
  const [assignDate,setAssignDate]=useState();
  useEffect(() => {
    const getDetails = async () => {
      const docRef = doc(db, "Complaints", docId)
      try {
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data())
        setData(docSnap.data());
      } catch (err) {
        alert("Invalid ticket id")
        console.log(err)
      }
    }


    getDetails();
  }, [count]); 
  const navigate = useNavigate();

  useEffect(() => { 
    const fetchData=async()=>{
      
    await getDocs(collection(db, "userProfile"))
      .then((querySnapshot) => {  
        let subAd=[]
        querySnapshot.forEach((doc) => { 
          let data = doc.data();
          const rl=data.role 
          const nD={
            id:doc.id,
            ...data
          }
          if (rl?.toLowerCase() === "sub-admin") {
            subAd.push(nD)
          }  
        });
        setSubAdmins(subAd); 
      })
      .catch((e) => console.log(e));
    }
    fetchData()
  }, []);
  console.log(subAdmins)
  const handleFormSubmit=async(e)=>{
    e.preventDefault();
    console.log(selectedSubAdmin.id,assignDate,data.doc_id)
    const docRef=doc(db,"Complaints",data.doc_id) 
    const docRef2=doc(db,"userProfile",selectedSubAdmin.id) 

        try{
            await  updateDoc(docRef,{
                status:"In-Progress",
                sub_admin_uid:selectedSubAdmin.id,
                assinged_date:assignDate
            }) 
            if(selectedSubAdmin.current_ticket)
            {
              const newSCT=[...selectedSubAdmin.current_ticket,
              data
              ]
              await  updateDoc(docRef2,{
                current_ticket:newSCT
              }) 
              alert("Sub admin has been assigned successfully") 
              navigate('/kovil/tickets')
            }
            else{
              const newSCT=[data]
              await  updateDoc(docRef2,{
                current_ticket:newSCT
              }) 
              alert("Sub admin has been assigned successfully") 
              navigate('/kovil/tickets')
            } 
        }catch(err){ 
            alert("error occured") 
        }
  }
  const save = {
    backgroundColor: "#f17116",
    color: "#fff",
    ml: 14,
    mt:2,
    "&:hover": {
      backgroundColor: "#f17116",
      color: "#fff",
    },

  };
  return (
    <>
      <Stack>
        <h1 style={{padding: "0 45px"}}>
          <b>
           <span className="navigateArrow" onClick = {() => {
            navigate("/kovil/tickets")
           }}>Tickets</span>  <i class="fas fa-chevron-right"></i> Tickets Details
          </b>
        </h1>
        <Box>
          <div className="row p-5">
            <div className="col-md-5">
              <Card sx={{ p: 2 }}>
                <div className="row user-tabs">
                  {/* <h5>#KA001</h5> */}
                  <h5>{data?.doc_id}</h5>

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
                  <b>{data?.complaint_type}</b>

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
                  <b>{data?.temple_name}</b>

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
                  <b>{data?.address}</b>

                  </p>
                </div>
                <div>
                  <p>State</p>
                  <p>
                  <b>{data?.state}</b>

                  </p>
                </div>
                <div>
                  <p>District</p>
                  <p>
                  <b>{data?.city}</b>
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
                  {/* <img
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
                  /> */}
                  {data?.files?.length>0?
                  data?.files?.map((fs)=>(
                     <img
                     src={fs}
                     alt="compliant image"
                     width="80"
                     height="80"
                     className="img-upload"
                   />
                  ))
                :
                <p>No image found</p>
                }
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
              <form onSubmit={handleFormSubmit}>
              <Card sx={{ mt: 5, p: 2 }}>
                <div>
                  <p>Admin</p>
                  <h6>
                    <b>#KATU09 SriVatsava N</b>
                  </h6>
                </div>
                <div>
                  {/* <AssignSelect  /> */}
                  {subAdmins && <AssignSelect setSelectedSubAdmin={setSelectedSubAdmin}   subAdmins={subAdmins} />}
               
                </div>

                <div>
                  {" "}
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    type="date"
                    onChange={(e)=>{
                      setAssignDate(e.target.value)
                    }}
                    sx={{width:"300px",mt: 5}}
                  />
                </div>
                <div>
                {data?.sub_admin_uid?
                <Button   disabled variant="contained" sx={{mt:3,ml:13,background:"#ff6000"}}>Ticket already assigned</Button>
                :
                <Button  type="submit"  variant="contained" sx={save}>Assign To Sub-Admin</Button>
                }
                </div>
              </Card>
              </form>
            </div>
          </div>
        </Box>
      </Stack>
    </>
  );
};

export default AssignTicket;
