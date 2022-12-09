// import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

import Card from "@mui/material/Card";
import TicketTabs from "../../Reuseable/Tabs/TicketTabs";
import { db } from "../../services/firebase";
import { FlashOffOutlined } from "@mui/icons-material";
import Loader from "../../Reuseable/Loader/Loader";
import PasswordModal from "../../Reuseable/Passwordmodal/PasswordModal";
import TicketsBack from "../../Reuseable/TicketsBack";

const Tickets = () => {
  const [tickets, setTickets] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const subAdmin = JSON.parse(localStorage.getItem("subadmin"))
  const [isPending, setIsPending] = useState(false);
  
  const[openModal,setOpenModal] = useState(false);
  const [subAdminData,setSubAdminData]=useState()
  const handleClick = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }
  const [isPasswordChanged,setIsPasswordChanged]=useState("inital")
   
  useEffect(()=>{

    if(subAdmin)
    {
      const subadminId=subAdmin.uid;
const getSubAdmin=async()=>{
  const docRef = doc(db, "admins", subadminId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data=docSnap.data();
    setSubAdminData(data)
    // console.log(data)
    if(data.is_password_changed){
      setIsPasswordChanged("passwordChanged")
    }
    else if(!data.is_password_changed){
      setIsPasswordChanged("notChanged")
    }
    // console.log("Document data:", docSnap.data());

  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
getSubAdmin()

    }
  },[])
console.log(tickets)
  useEffect(() => {
    if (!subAdmin) {
      setIsPending(true)
      const getTic = async () => {
        getDocs(query(collection(db, "Complaints"), orderBy("posted_on_timestamp", "desc")))
          .then((querySnapshot) => {
            setIsPending(true)
            let arr = {
              open: [],
              inProgress: [],
              closed: [],
            };
            querySnapshot.forEach((doc) => {
              setIsPending(true)

              let data = doc.data();
              if (data.status === "Open") {
                arr.open.push(data);
              } else if (data.status === "In-Progress") {
                arr.inProgress.push(data);
              } else if (data.status === "Closed") {
                arr.closed.push(data);
              }
            });
            setTickets(arr);
            setIsPending(false)

          })
          .catch((e) => {
            setIsPending(false)
            alert(e);
            console.log(e)
          })
      }
      getTic();
    }
    else {
      const getTic = async () => {
        setIsPending(true)
        getDocs(query(collection(db, "Complaints"), orderBy("posted_on_timestamp", "desc")))
          .then((querySnapshot) => {
            setIsPending(true)

            let arr = {
              open: [],
              inProgress: [],
              closed: [],
            };

            querySnapshot.forEach((doc) => {
              setIsPending(true)
              let data = doc.data();
              // console.log(data)
              // console.log(subAdmin.uid)
              if (data.sub_admin_uid === subAdmin.uid) {
                if (data.status === "Open") {
                  arr.open.push(data);
                } else if (data.status === "In-Progress") {
                  arr.inProgress.push(data);
                } else if (data.status === "Closed") {
                  arr.closed.push(data);
                }
              }
            });
            setTickets(arr);
            setIsPending(false)

          })
          .catch((e) => {
            setIsPending(false)

            console.log(e)
          });
      }
      getTic();
    }
  }, []);
// console.log(tickets)
  return (
    <>
     {isPasswordChanged==="notChanged" && <>
        <PasswordModal data={subAdminData} setIsPasswordChanged={setIsPasswordChanged} onCancel={handleClose}/>
         <TicketsBack onCancel={handleClose}/></>
         }
       
      <Card sx={{ padding: "20px" }} variant="outlined">
        <div className="TicetTab">
          <h4>
            <b>Tickets</b>
          </h4>
        </div>
       {isPending && <Loader/>} 
      { subAdmin && isPasswordChanged==="passwordChanged" && tickets &&  <TicketTabs tickets={tickets} />}
      { user && tickets &&  <TicketTabs tickets={tickets} />}

      </Card>
    </>
  );
};

export default Tickets;
