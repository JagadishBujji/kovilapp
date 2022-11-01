// import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import Card from "@mui/material/Card";
import TicketTabs from "../../Reuseable/Tabs/TicketTabs";
import { db } from "../../services/firebase";
import { FlashOffOutlined } from "@mui/icons-material";
import Loader from "../../Reuseable/Loader/Loader";

const Tickets = () => {
  const [tickets, setTickets] = useState(null);
  const subAdmin = JSON.parse(localStorage.getItem("subadmin"))
  const [isPending, setIsPending] = useState(false);
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

  return (
    <>
      <Card sx={{ padding: "20px" }} variant="outlined">
        <div className="TicetTab">
          <h4>
            <b>Tickets</b>
          </h4>
        </div>
       {isPending && <Loader/>} 
      {tickets &&  <TicketTabs tickets={tickets} />}
      </Card>
    </>
  );
};

export default Tickets;
