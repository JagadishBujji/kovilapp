import { Stack, Box, Card, Button, Avatar, TextField } from "@mui/material";
import VerticalLinearStepper from "../Reuseable/Stepper/VerticalLinearStepper";
import { useEffect, useState } from "react";
import TicketsBack from "../Reuseable/TicketsBack";
import TicketsModalBox from "../Reuseable/TicketsModalBox";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import AssignSelect from "../Reuseable/SelectField/AssignSelect";
import TicketImage from "../Reuseable/ImageModal/TicketImage";
import BasicSelect from "../Reuseable/DropDown/TicketStatus";

const TicketsDetails = () => {
  const navigate = useNavigate();
  const docId = useParams().id;
  const [data, setData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [assignDate, setAssignDate] = useState();
  const [selectedSubAdmin, setSelectedSubAdmin] = useState();
  useEffect(() => {
    const getDetails = async () => {
      const docRef = doc(db, "Complaints", docId);
      try {
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data())
        setData(docSnap.data());
      } catch (err) {
        alert("Invalid ticket id");
        console.log(err);
      }
    };

    getDetails();
  }, [count]);
  // console.log(data);
  const [subAdmins, setSubAdmins] = useState();
  const subadmin = JSON.parse(localStorage.getItem("subadmin"))
  useEffect(() => {
    if (!subadmin) {
      const fetchData = async () => {
        await getDocs(collection(db, "admins"))
          .then((querySnapshot) => {
            let subAd = [];
            querySnapshot.forEach((doc) => {
              let data = doc.data();
              const rl = data.role;
              const nD = {
                id: doc.id,
                ...data,
              };
              if (rl?.toLowerCase() === "sub-admin") {
                subAd.push(nD);
              }
            });
            setSubAdmins(subAd);
          })
          .catch((e) => console.log(e));
      };
      fetchData();
    }
    else {
      const fetchData = async () => {
        await getDocs(collection(db, "admins"))
          .then((querySnapshot) => {
            let subAd = [];
            querySnapshot.forEach((doc) => {
              let data = doc.data();
              const rl = data.role;
              const nD = {
                id: doc.id,
                ...data,
              };
              if (rl?.toLowerCase() === "sub-admin" && data.doc_id !== subadmin.uid) {
                subAd.push(nD);
              }
            });
            setSubAdmins(subAd);
          })
          .catch((e) => console.log(e));
      };
      fetchData();

    }
  }, []);
  // console.log(subAdmins);
  const handleModal = () => {
    setOpenModal(true);
  };
  const deleteBack = () => {
    setOpenModal(false);
  };
  // console.log(selectedSubAdmin);
  // console.log(data)

  const [isPending,setIsPending]=useState(false)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedSubAdmin, assignDate, data.doc_id);
    const docRef = doc(db, "Complaints", data.doc_id);
    const docRef2 = doc(db, "admins", selectedSubAdmin.doc_id);
    const subAdminName = selectedSubAdmin.first_name + " " + selectedSubAdmin.last_name
    try {
      setIsPending(true)
      await updateDoc(docRef, {
        status: "Open",
        sub_admin_uid: selectedSubAdmin.doc_id,
        assinged_date: assignDate,
        sub_admin_name: subAdminName
      });
     
      const apikey = process.env.REACT_APP_SMS_API_KEY

                  const username = selectedSubAdmin.first_name;
                  const mobile = selectedSubAdmin.phone_number;
                  const ticketId=data.ticket_id? data.ticket_id:data.doc_id;
                  const otp=1232131
                  console.log(mobile,username)
                  const sender = 'KVLAPP';
                  var mm=`Dear ${username}, Ticket no ${ticketId} has been assigned to you. Please take necessary action and respond within 24 Hours - KovilApp Team` 
                   var url = 'https://api.textlocal.in/send/?apikey='+apikey+'&numbers='+mobile+'&sender='+sender+'&message='+encodeURIComponent(mm);
                  fetch (url).then(response => response.json())
                  .then(data =>{
                  console.log(data)
                  alert("Sub admin has been assigned successfully");
      setIsPending(false)

        navigate("/kovil/tickets"); 
                }).catch((err)=>{
                  alert(err);
                  console.log(err);
                })
        
    } catch (err) {
      setIsPending(false)

      alert("error occured");
    }
  };
  const save = {
    backgroundColor: "#f17116",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#f17116",
      color: "#fff",
    },
  };

  const tab = {
    background: "#f17116",
    outline: "none",
    color: "#fff",
    "&.Mui-selected": {
      fontWeight: "700",
      color: "#fff",
      borderBottom: "2px solid #f17116",
    },
    "&:hover": {
      outline: "none",
      background: "#f17116",
      outline: "none",
      color: "#fff",
    },
  };
  const tabs = {
    background: "transparent",
    outline: "none",
    color: "#f17116",
    border: "1px solid #f17116",
    "&.Mui-selected": {
      fontWeight: "700",
      color: "#ff6000",
      borderBottom: "2px solid #ff6000",
    },
    "&:hover": {
      border: "1px solid #f17116",
    },
  };
  // console.log(data)
  return (
    <>
      <Stack>
        <h1 style={{ padding: "0 45px" }}>
          <b>
            <span
              onClick={() => {
                navigate("/kovil/tickets");
              }}
            >
              Tickets
            </span>{" "}
            <i class="fas fa-chevron-right"></i> Tickets Details
          </b>
        </h1>
        <Box>
          <div className="row p-5">
            <div className="col-md-5">
              <Card sx={{ p: 2 }}>
                <div className="row user-tabs">
                  {/* <h5>{data?.doc_id}</h5> */}
                  {data  && <BasicSelect count={count} setCount={setCount} data={data} />}

                </div>
                {/* <div className="row  user-tabs">
                <div className="row user-name">
                  <Avatar sx={{ width: 60, height: 60, mr: 1 }} />
                  <p className="m-0">Jagadish kumar</p>
                </div>
                <Button variant="outlined">Admin</Button>
              </div> */}
                <div>
                  <p>Current status</p>
                  <p>
                    <b>{data?.status}</b>
                  </p>
                </div>
                <div>
                  <p>Complaint</p>
                  <p>
                    <b>{data?.complaint_type}</b>
                  </p>
                </div>
                <div>
                  <p>Name</p>
                  <p>
                    <b>{data?.user_name}</b>
                  </p>
                </div>
                <div>
                  <p> Mobile Number</p>
                  <p>
                    <b>{data?.user_mobile_number}</b>
                  </p>
                </div>
                <div>
                  <p>Temple</p>
                  <p>
                    <b>{data?.temple_name}</b>
                  </p>
                </div>
                <div>
                  <p>Created On</p>
                  <p>
                    <b>{data?.posted_on} </b>
                  </p>
                </div>
                <div>
                  <p>Due Date</p>
                  <p>
                    <b>{data?.due_date}</b>
                  </p>
                </div>
               {data?.user_email && <div>
                  <p>Email Address</p>
                  <p>
                    <b>{data?.user_email}</b>
                  </p>
                </div>}
                {/* <div>
                  <p>Address</p>
                  <p>
                    <b>{data?.address}</b>
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
                    <b>{data?.pin_code}</b>
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
                  {data?.files?.length > 0 ? (
                    data?.files?.map((fs) => (
                      // <img

                      //   src={fs}
                      //   alt="compliant image"
                      //   width="80"
                      //   height="80"
                      //   className="img-upload"
                      // />
                      <TicketImage source={fs} />
                    ))
                  ) : (
                    <p>No image found</p>
                  )}
                </div>
                {/* <div className="row">
                <div className="p-2">
                 
                  </div>
                </div> */}
                {/* <div className="row ">
                  <div className="p-2">
                    <i class="fas fa-microphone m-5"></i>
                    <ReactAudioPlayer
                      src="my_audio_file.ogg"
                      autoPlay
                      controls
                      className="audioplayer"
                    />
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
                </div> */}
              </Card>
              <Card sx={{ mt: 5, p: 2 }}>
                {data && (
                  <VerticalLinearStepper allFeedbacks={data?.allFeedbacks} />
                )}
                <div className="row user-tabs">
                  <Button sx={tabs} variant="outlined" onClick={handleModal}>
                    Add Feedback
                  </Button>
                  {/* <Button
                    sx={tab}
                    variant="contained"
                    onClick={() => navigate(`/kovil/assigntickets/${docId}`)}
                  >
                    Reassign Tickets
                  </Button> */}
                  {data?.status === "Closed" ?
                    <Button variant="contained" disabled> Ticket is closed</Button>
                    :
                   <>
                   
                   <Button variant="contained" sx={save} onClick={() => setShowAdmin(!showAdmin)}>ReAssign Tickets</Button>
                  </>
                  }
                </div>
              </Card>

              {showAdmin && (
                <div className="col-md-8">
                  <form onSubmit={handleFormSubmit}>
                    <Card sx={{ mt: 5, p: 2 }}>
                      <div>
                        <p>Admin</p>
                        <h6>
                          <b>#KATU09 SriVatsava N</b>
                        </h6>
                      </div>
                      <div>
                        {subAdmins && (
                          <AssignSelect
                            setSelectedSubAdmin={setSelectedSubAdmin}
                            subAdmins={subAdmins}
                          />
                        )}
                      </div>

                      <div>
                        {" "}
                        <TextField
                          id="outlined-basic"
                          label=""
                          required
                          variant="outlined"
                          onChange={(e) => {
                            setAssignDate(e.target.value);
                          }}
                          type="date"
                          sx={{ width: "300px", mt: 5 }}
                        />
                      </div>
                      <div>


                        <Button
                          type="submit"
                          disabled={isPending} 
                          variant="contained"
                          sx={{ mt: 3, ml: 13, background: "#ff6000" }}
                        >
                          Assign To Sub-Admin
                        </Button>

                      </div>
                    </Card>
                  </form>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Stack>
      {openModal && (
        <TicketsModalBox
          count={count}
          setCount={setCount}
          data={data}
          onCancel={deleteBack}
        />
      )}
      {openModal && <TicketsBack onCancel={deleteBack} />}
    </>
  );
};

export default TicketsDetails;
