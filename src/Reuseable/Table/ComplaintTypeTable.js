import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import { useState } from "react";
import ComplaintsField from "../../pages/ComplaintsField";
import TicketsBack from "../TicketsBack";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";
import ComplaintDropDown from "../DropDown/ComplaintDropDown";
import Loader from "../Loader/Loader";

const columns = [
  { id: "sno", label: "Sl.No", minWidth: 100 },
  { id: "complaints", label: "Complaints", minWidth: 100 },
  { id: "more", label: "More", minWidth: 100 },
];

function createData(sno, complaints, more) {
  return { sno, complaints, more };
}


// const rows = [
//   createData("01", "Noise", "" ),
//   createData("02", "waste", ""),
// ];

export default function ComplaintTypeTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [eData, setEdata] = useState();
  // const [refresh, setRefresh] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Complaint = {
    background: "#F2F4F8",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1E3849",
    textAlign: "left",
    zIndex: "0",
  };

  const Complaintbody = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1E3849",
    textAlign: "left",
  };

  const save = {
    backgroundColor: "#f17116",
    color: "#fff",
    mr: 2,
    "&:hover": {
      backgroundColor: "#f17116",
      color: "#fff",
    },
  };

  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const [allTypes,setAllTypes]=useState();
  const [count,setCount]=React.useState(0);
  React.useEffect(() => {
    const getType = async () => {
      await getDocs(query(collection(db, "complaint_types"),orderBy("posted_on","desc")))
      .then((querySnapshot) => {
        let arr=[]
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          // console.log(doc.id);
          const obj={
            doc_id:doc.id,
            ...data
          }
          arr.push(obj)
        });
        setAllTypes(arr); 
      })
      .catch((e) => console.log(e));
       
    };
    getType()
  }, [count]);
  // console.log(allTypes);
  let rows=[]
  allTypes?.map((as,index)=>{ 
    rows.push(createData(
      index+1, 
      as.complaint_type,
      as.doc_id
    ))
})
  return (
    <>
      <Paper sx={{ width: "87%", ml: 5 }}>
        <Card sx={{ p: 3 }}>
          <div className="row addbtn">
            <Button variant="contained" sx={save} onClick={handleChange}>
              Add New
            </Button>
            {open &&  
              <ComplaintsField forWhat="createType"
                onCancel={handleCancel}
                count={count}
                setCount={setCount}
              />
            }
            {open && <TicketsBack onCancel={handleCancel}/>}
          </div>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={Complaint}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={Complaintbody}
                            >
                              {column.id === "more" ? (
                                <ComplaintDropDown
                                data={row}
                                count={count}
                                setCount={setCount}
                                  onCancel={handleCancel}
                                />
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Paper>
    </>
  );
}
