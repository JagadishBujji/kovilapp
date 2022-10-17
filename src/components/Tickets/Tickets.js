// import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import Card from "@mui/material/Card";
import TicketTabs from "../../Reuseable/Tabs/TicketTabs";
import { db } from "../../services/firebase";

const Tickets = () => {
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    getDocs(collection(db, "Complaints"))
      .then((querySnapshot) => {
        let arr = {
          open: [],
          inProgress: [],
          closed: [],
        };
        querySnapshot.forEach((doc) => {
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
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Card sx={{ padding: "20px" }} variant="outlined">
        <div className="TicetTab">
          <h4>
            <b>Tickets</b>
          </h4>
        </div>
        <TicketTabs tickets={tickets} />
      </Card>
    </>
  );
};

export default Tickets;
