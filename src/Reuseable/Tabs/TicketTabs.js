import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TicketTable from "../Table/TicketTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TicketTabs({ tickets }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tab = {
    background: "#fff",
    outline: "none",
    color: "#000",
    "&.Mui-selected": {
      fontWeight: "700",
      color: "#ff6000",
      borderBottom: "2px solid #ff6000",
    },
    "&:focus": {
      outline: "none",
    },
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={tab}
            label={`Open [${tickets ? tickets.open.length : 0}]`}
            {...a11yProps(0)}

          />
          <Tab sx={tab} label={`In-Progress [${tickets ? tickets.inProgress.length : 1}]`} {...a11yProps(1)}
          
          />
          <Tab label= {`Closed [${tickets ? tickets.closed.length : 2}]`} {...a11yProps(2)} 
          
          
          />
          <Tab label= {`New & Not Assigned [${tickets ? tickets.closed.length : 3}]`}{...a11yProps(3)} 
          
          />
        </Tabs>
      </Box>
      {tickets === null ? (
        <p>Loading!!!</p>
      ) : (
        <>
          <TabPanel value={value} index={0}>
            <TicketTable tickets={tickets.open} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TicketTable tickets={tickets.inProgress} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TicketTable tickets={tickets.closed} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TicketTable tickets={tickets.closed} />
          </TabPanel>
        </>
      )}
    </Box>
  );
}
