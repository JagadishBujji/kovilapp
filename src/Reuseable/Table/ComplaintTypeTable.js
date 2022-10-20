import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const columns = [
  { id: "sno", label: "Sl.No", minWidth: 170 },
  { id: "complaints", label: "Complaints", minWidth: 100 },
];

function createData(sno, complaints) {
  return { sno, complaints };
}

// const rows = [
//   createData("#01", "NoisePollution"),
//   createData("#02", "Sound"),
//   createData("#03", "Wastages"),
// ];

export default function ComplaintTypeTable() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    const docRef = doc(db, "complaint_types", "complaint");
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          let arr = [];
          docSnap.data().types.forEach((type, i) => {
            arr.push(createData(i + 1, type));
          });
          setRows(arr);
        } else {
          // doc.data() will be undefined in this case
          // console.log("No such document!");
          setRows([]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

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
  };

  const Complaintbody = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1E3849",
    textAlign: "left",
  };

  const navigate = useNavigate();

  // to save the complaintType to the array in firestore
  const saveComplaintType = (complaintName) => {
    const complaintTypeRef = doc(db, "complaint_types", "complaint");
    updateDoc(complaintTypeRef, {
      types: arrayUnion(complaintName),
    });
  };

  return (
    <Paper sx={{ width: "100%" }}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={Complaintbody}
                          onClick={() => {
                            navigate("/kovil/complaintsfield");
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
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
    </Paper>
  );
}
