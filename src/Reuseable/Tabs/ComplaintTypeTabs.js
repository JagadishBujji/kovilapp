import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ComplaintsTable from "../Table/ComplaintsTable";

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

export default function ComplaintTypeTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const table = {
    width: "100%",
    background: "#FFFFFF",
    boxShadow: "0px 2px 10px rgb(0 0 0 / 10%)",
    fontFamily: "Roboto"
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Open[200]" {...a11yProps(0)}  sx={{
                    background: "#ebf2f8",
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "serif",
                  }}/>
          <Tab label="In-Progress[20]" {...a11yProps(1)} 
          sx={{
            background: "#ebf2f8",
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "serif",
          }}
          />
          <Tab label="Closed[400]" {...a11yProps(2)} 
          sx={{
            background: "#ebf2f8",
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "serif",
          }}
          
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ComplaintsTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
