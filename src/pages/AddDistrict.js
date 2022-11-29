import React, { useState } from 'react'
import StateSelect from '../Reuseable/AddDistrict/StateSelect'
import country_state_district from "country_state_district";
import DistrictSelect from '../Reuseable/AddDistrict/DistrictSelect';
import { Button, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from '../services/firebase';



const stickyhead = {
  background: "#F2F4F8",
  fontSize: "16px",
  fontWeight: "600",
  color: "#1E3849",
  textAlign: "left",
  zIndex: "0",
};

const columns = [
  // { id: "ID", label: "ID", minWidth: 170 },
  { id: "state", label: "State", minWidth: 100 },
  {
    id: "district",
    label: "District",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "political_district",
    label: "Political district",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "pincode",
    label: "pincode",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const AddDistrict = () => {
  const [allStates, setAllStates] = React.useState();
  const [stateClicked, setStateClicked] = React.useState()
  const [count, setCount] = React.useState(0);
  const [data, setData] = useState();
  const [isPending,setIsPending]=useState(false)
  var milliseconds = (new Date).getTime();
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    politicalDistrict: "",
    pincode: "",
    posted_on_timestamp:milliseconds

  })

  React.useEffect(() => {
    const getDocuments = async () => {

      const querySnapshot = await getDocs(query(collection(db, "political_districts"),orderBy("posted_on_timestamp")));
      const arr=[];
      querySnapshot.forEach((doc) => {
        const dd=doc;
        const obj={
          doc_id:dd.id,
          ...doc.data()
        }
        // console.log(obj);
        arr.push(obj);
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
      setData(arr)
    }
    getDocuments();
    // console.log(data)
  }, [count])
  console.log(data)

  React.useEffect(() => {
    const states = country_state_district.getAllStates();
    setAllStates(states);
  }, []);
  const styles = {
    width: "200px",
    margin: "20px"
  }

  const input = {
    heigth: "50px"
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsPending(true);
    await addDoc(collection(db, "political_districts"),formData).then((res)=>{
      setCount(count+1)
      setFormData({
        ...formData,
        politicalDistrict:"",
        pincode:"",
        posted_on_timestamp:""
      })
      alert("successfully added")
      console.log(res);
    }).catch((err)=>{
      alert(err);
      console.log(err)
    }).finally(()=>{
    setIsPending(false);
    })

  }

  return (
    // <div>
    //   <h2>Add Political District</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div style={{ marginTop: "30px" }} className="row">
    //       <div className="col-md-3 picture">
    //         <StateSelect
    //           allStates={allStates}
    //           setStateClicked={setStateClicked}
    //           formData={formData}
    //           setFormData={setFormData}
    //         />
    //       </div>
    //       {stateClicked ? (
    //         <div className="col-md-3 picture">
    //           <DistrictSelect
    //             allStates={allStates}
    //             stateClicked={stateClicked}
    //             formData={formData}
    //             setFormData={setFormData}
    //           />
    //         </div>
    //       ) : (
    //         <p style={{ marginTop: "20px", marginRight: "4px" }}>Select a state to view district</p>
    //       )}
    //       <div className="col-md-2 picture">
    //         <input style={{ height: "55px" }} type="text"
    //           onChange={(e) => {
    //             setFormData({
    //               ...formData,
    //               politicalDistrict: e.target.value
    //             })
    //           }}
    //           required
    //           value={formData.politicalDistrict}
    //           placeholder='enter  political district' />

    //       </div>
    //       <div className="col-md-2 picture">
    //         <input style={{ height: "55px" }}
    //           onChange={(e) => {
    //             setFormData({
    //               ...formData,
    //               pincode: e.target.value
    //             })
    //           }}
    //           value={formData.pincode}
    //           type="text" required placeholder='enter  pincode' />

    //       </div>
    //       <div className="col-md-2 picture">
    //         <Button type="submit" variant='contained'>Add District</Button>
    //       </div>
    //     </div>
    //   </form>
    //   <TableContainer>
    //     <Table stickyHeader aria-label="sticky table">
    //       <TableHead>
    //         <TableRow>
    //           {columns.map((column) => (
    //             <TableCell
    //               key={column.id}
    //               align={column.align}
    //               style={{ minWidth: column.minWidth }}
    //               sx={stickyhead}
    //             >
    //               {column.label}
    //             </TableCell>
    //           ))}
    //         </TableRow>
    //       </TableHead>
    //     </Table>
    //   </TableContainer>
    // </div>
    <div>
      
    </div>

  )
}

export default AddDistrict