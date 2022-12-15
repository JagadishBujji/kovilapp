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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import ComplaintDropDown from "../DropDown/ComplaintDropDown";
import Loader from "../Loader/Loader";
import PoliticalAdd from "../../pages/PoliticalAdd";
import PoliticalDropDown from "../DropDown/PoliticalDropDown";

const columns = [
  { id: "sno", label: "Sl.No", minWidth: 100 },
  { id: "state", label: "State", minWidth: 100 },
  { id: "politicalDistrict", label: "Political District Name", minWidth: 100 },
  { id: "district", label: "District Name", minWidth: 100 },

  { id: "pincode", label: "PinCode", minWidth: 100 },
  { id: "more" },
];

function createData(sno, state, politicalDistrict, district, pincode, more) {
  return { sno, state, politicalDistrict, district, pincode, more };
}

// const rows = [
//   createData("01", "Noise", "" ),
//   createData("02", "waste", ""),
// ];

export default function Political() {
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
  const [allTypes, setAllTypes] = useState();
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const getType = async () => {
      await getDocs(
        query(
          collection(db, "political_districts"),
          orderBy("posted_on_timestamp", "desc")
        )
      )
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach((doc) => {
            let data = doc.data();
            // console.log(data);
            const obj = {
              doc_id: doc.id,
              ...data,
            };
            // console.log(obj)
            arr.push(obj);
          });
          setAllTypes(arr);
        })
        .catch((e) => console.log(e));
    };
    getType();
  }, [count]);
  // console.log(allTypes);
  let rows = [];
  allTypes?.map((as, index) => {
    // console.log(as)
    let ok = "";
    as.pincode.map((a) => {
      ok = ok + " " + a;
    });
    rows.push(
      createData(index+1, as.state, as.politicalDistrict, as.district, ok,as.doc_id)
    );
  });
  return (
    <>
      <Paper sx={{ width: "87%", ml: 5 }}>
        <Card sx={{ p: 3 }}>
          <div className="row addbtn">
            <Button variant="contained" sx={save} onClick={handleChange}>
              Add New
            </Button>
            {open && (
              <PoliticalAdd
                forWhat="createType"
                onCancel={handleCancel}
                count={count}
                setCount={setCount}
              />
            )}
            {open && <TicketsBack onCancel={handleCancel} />}
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
                {allTypes && rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    // console.log(row);
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
                                <PoliticalDropDown
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
