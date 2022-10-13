import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ComplaintsTable from "../Table/ComplaintsTable";
import StickyHeadTable from "../Table/StickyHeadTable";
import ComplaintTypeTabs from "./ComplaintTypeTabs";

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

export default function HomeTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab className="tab" label="District Wise" {...a11yProps(0)} />
          <Tab label="Compliants Type" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-2">
            <div className="card">
              <p className="count">Open Ticket</p>
              <p className="open">
                <b>3620</b>
              </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-2">
            <div className="card">
              <p className="count">In Progress</p>
              <p className="Progress">
                <b>3620</b>
              </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-2">
            <div className="card">
              <p className="count"> Closed Tickets</p>
              <p className="Closed">
                <b>3620</b>
              </p>
            </div>
          </div>
        </div>

        <StickyHeadTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-2">
            <div className="card">
              <p className="count">Open Ticket</p>
              <p className="open">
                <b>3623</b>
              </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-2">
            <div className="card">
              <p className="count">In Progress</p>
              <p className="Progress">
                <b>4525</b>
              </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-2">
            <div className="card">
              <p className="count"> Closed Tickets</p>
              <p className="Closed">
                <b>5448</b>
              </p>
            </div>
          </div>
        </div>
        < ComplaintTypeTabs />
      </TabPanel>
    </Box>
  );
}
