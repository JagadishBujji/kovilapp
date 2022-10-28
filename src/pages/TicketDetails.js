import { Stack, Box, Card, Button, Avatar, TextField } from "@mui/material";
import VerticalLinearStepper from "../Reuseable/Stepper/VerticalLinearStepper";
import { useEffect, useState } from "react";
import TicketsBack from "../Reuseable/TicketsBack";
import TicketsModalBox from "../Reuseable/TicketsModalBox";
import { useNavigate, useParams } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
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
  useEffect(() => {
    const fetchData = async () => {
      await getDocs(collection(db, "userProfile"))
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
  }, []);
  // console.log(subAdmins);
  const handleModal = () => {
    setOpenModal(true);
  };
  const deleteBack = () => {
    setOpenModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedSubAdmin, assignDate, data.doc_id);
    const docRef = doc(db, "Complaints", data.doc_id);
    const docRef2 = doc(db, "userProfile", selectedSubAdmin.id);

    try {
      await updateDoc(docRef, {
        status: "In-Progress",
        sub_admin_uid: selectedSubAdmin.id,
        assinged_date: assignDate,
      });
      if (selectedSubAdmin.current_ticket) {
        const newSCT = [...selectedSubAdmin.current_ticket, data];
        await updateDoc(docRef2, {
          current_ticket: newSCT,
        });
        alert("Sub admin has been assigned successfully");
        navigate("/kovil/tickets");
      } else {
        const newSCT = [data];
        await updateDoc(docRef2, {
          current_ticket: newSCT,
        });
        alert("Sub admin has been assigned successfully");
        navigate("/kovil/tickets");
      }
      // await  updateDoc(docRef2,{
      //   current_ticket:data.doc_id
      // })
      // alert("Sub admin has been assigned successfully")
      // navigate('/kovil/tickets')
    } catch (err) {
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
                  <Button variant="outlined">open</Button>
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
                    <b>{data?.posted_on} </b>
                  </p>
                </div>
                <div>
                  <p>Due Date</p>
                  <p>
                    <b>{data?.assinged_date}</b>
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
                  {data?.files?.length > 0 ? (
                    data?.files?.map((fs) => (
                      // <img
                      
                      //   src={fs}
                      //   alt="compliant image"
                      //   width="80"
                      //   height="80"
                      //   className="img-upload"
                      // />
                     <TicketImage source={fs}/>
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
                  <Button
                    sx={tab}
                    variant="contained"
                    onClick={() => navigate(`/kovil/assigntickets/${docId}`)}
                  >
                    Reassign Tickets
                  </Button>

                  {/* {data?.sub_admin_uid?
                 <Button variant="contained" disabled>Ticket is already assigned</Button>
                  :
                  <Button variant="contained" onClick={()=>setShowAdmin(!showAdmin)}>Assign Tickets</Button>}
                   */}
                </div>
              </Card>

              {showAdmin && (
                <div className="col-md-7">
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
