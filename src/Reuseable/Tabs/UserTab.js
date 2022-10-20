import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserTable from "../Table/UserTable";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";

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

export default function UserTab() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
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
        // setTickets(arr);
      })
      .catch((e) => console.log(e));
  }, []);

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
          <Tab sx={tab} label="All [200]" {...a11yProps(0)} />
          <Tab sx={tab} label="Admin [20]" {...a11yProps(1)} />
          <Tab sx={tab} label="Sub-Admin [400]" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UserTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserTable />
      </TabPanel>
    </Box>
  );
}
