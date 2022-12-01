import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserTable from "../Table/UserTable";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";
import { SafetyDividerOutlined } from "@mui/icons-material";
import Loader from "../Loader/Loader";
import { useState } from "react";

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
  const [allData,setAllData]=React.useState()
  const [adminData,setAdminData]=React.useState();
  const [subAdmin,setSubAdmin]=React.useState();
  const [isLoading, setIsLoading] = useState(true);
  // console.log(allData);
   React.useEffect(() => {
    const fetchData = async () => {

      const querySnapshot = await getDocs(query(collection(db, "admins"),orderBy("timestamp","desc")));
      let all=[]
      let ad=[]
        let sad=[]
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        let data=doc.data()
        // console.log(data)
        const nD={
          id:doc.id,
          ...data
        }
        console.log(nD)
        all.push(nD)
        
        const rl=doc.data().role;
        // console.log(rl?.toLowerCase())
        if(rl?.toLowerCase()==="admin")
        {
            ad.push(nD)
        }
        else if(rl?.toLowerCase()==="sub-admin")
        {
          sad.push(nD);
        }
      });
      setAllData(all);
      setAdminData(ad);
      setSubAdmin(sad);
      setIsLoading(false);
    }
    fetchData()
    // console.log(allData);
  }, [])
  // console.log(subAdmin)
  // console.log(adminData);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tab = {
    background: "#fff",
    outline: "none",
    color: "#000",
    textTransform: "none",
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
    <>
    {isLoading && <Loader />}
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={tab} label={`All [${allData?.length}]`} {...a11yProps(0)} />
          <Tab sx={tab} label={`Admin [${adminData?.length}]`} {...a11yProps(1)} />
          <Tab sx={tab} label={`SubAdmin [${subAdmin?.length}]`} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
     { allData &&  <UserTable allData={allData} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {adminData &&  <UserTable allData={adminData} />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {subAdmin && <UserTable allData={subAdmin} />}
      </TabPanel>
    </Box>
    </>
  );
}
