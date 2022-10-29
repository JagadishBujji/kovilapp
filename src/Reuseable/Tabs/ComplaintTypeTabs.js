import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ComplaintsTable from "../Table/ComplaintsTable";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";
import { getDistrictTotal, removeDuplicates } from "./CompliantTypeWise/DistricNumber";
import { useEffect } from "react";

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

export default function ComplaintTypeTabs({allTypes,allTickets,open,closed,inProgress}) {
  const [value, setValue] = React.useState(0);
  // console.log(allTickets)
  // console.log(open,closed,inProgress)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const [allTypes,setAllTypes]=React.useState();
  // React.useEffect(()=>{
  //   const getType = async () => {
  //     await getDocs(query(collection(db, "complaint_types"),orderBy("posted_on","desc")))
  //     .then((querySnapshot) => {
  //       let arr=[]
  //       querySnapshot.forEach((doc) => {
  //         let data = doc.data();
  //         // console.log(doc.id);
  //         // const obj={
  //         //   doc_id:doc.id,
  //         //   ...data
  //         // }
  //         // console.log(data);
  //         arr.push(data.complaint_type)
  //       });
  //       setAllTypes(arr); 
  //     })
  //     .catch((e) => console.log(e));
       
  //   };
  //   getType();
  // },[]) 
  let openTotal;
  let closedTotal;
  let inProgressTotal;
  if(allTypes && open)
  {
   openTotal= getDistrictTotal(allTypes,open) 
  }
  if(allTypes && closed)
  {
   closedTotal= getDistrictTotal(allTypes,closed) 
  }
  if(allTypes && inProgress)
  {
   inProgressTotal= getDistrictTotal(allTypes,inProgress) 
  }
  // useEffect(()=>{ 
  //    openTotal= getDistrictTotal(allTypes,open)   
  //    closedTotal= getDistrictTotal(allTypes,closed)  
  //    inProgressTotal= getDistrictTotal(allTypes,inProgress)  
  // },[])

  const table = {
    width: "100%",
    background: "#FFFFFF",
    boxShadow: "0px 2px 10px rgb(0 0 0 / 10%)",
    fontFamily: "Roboto",
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
    <Box sx={table}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <h4 style={{padding: "10px"}}>Complaint Type Tickets</h4>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={tab} label={`Open [${open.length}]`} {...a11yProps(0)} />
          <Tab sx={tab} label={`In-Progress [${inProgress.length}]]`} {...a11yProps(1)} />
          <Tab sx={tab} label={`Close [${closed.length}]`} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ComplaintsTable data={openTotal}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <ComplaintsTable data={inProgressTotal} />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <ComplaintsTable data={closedTotal}/>
      </TabPanel>
    </Box>
  );
}
