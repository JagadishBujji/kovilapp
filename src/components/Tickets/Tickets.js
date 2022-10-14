// import React, { useEffect, useState } from "react";
import * as React from "react";

import Card from "@mui/material/Card";
import TicketTabs from "../../Reuseable/Tabs/TicketTabs";

const Tickets = () => {
  return (
    <>
      <Card sx={{ padding: "20px" }} variant="outlined">
        <div className="TicetTab">
          <h4>
            <b>Tickets</b>
          </h4>
        </div>
        <TicketTabs/>
      </Card>
    </>
  );
};

export default Tickets;
