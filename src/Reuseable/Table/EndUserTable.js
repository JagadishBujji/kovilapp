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
import UserDropDown from "../DropDown/UserDropDown";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useEffect } from "react";

const columns = [
  // { id: "id", label: "ID", minWidth: 170 },
  { id: "first_name", label: "First name", minWidth: 100, align: "left" },
  { id: "last_name", label: "Last name", minWidth: 100, align: "left" },
  { id: "email", label: "Email", minWidth: 100, align: "left" },

  {
    id: "phone_number",
    label: "Phone Number",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "flat_number",
    label: "Flat Number",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "street_name",
    label: "Street Name",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
    label: "Address",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "district",
    label: "District",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "state",
    label: "State",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(
  id,
  user,
  number,
  flat,
  address,
  streetname,
  district,
  state
) {
  return { id, user, number, flat, address, streetname, district, state };
}

// const rows = [
//   createData(
//     "001",
//     "Jagadish Kumar",
//     1234567890,
//     "Admin",
//     3125,
//     350,
//     250,
//     2515,
//     ":"
//   ),
//   createData(
//     "001",
//     "Jagadish Kumar",
//     1234567890,
//     "Admin",
//     3125,
//     350,
//     250,
//     2515,
//     ":"
//   ),
//   createData(
//     "001",
//     "Jagadish Kumar",
//     1234567890,
//     "Admin",
//     3125,
//     350,
//     250,
//     2515,
//     ":"
//   ),
//   createData(
//     "001",
//     "Jagadish Kumar",
//     1234567890,
//     "Admin",
//     3125,
//     350,
//     250,
//     2515,
//     ":"
//   ),
//   createData(
//     "001",
//     "Jagadish Kumar",
//     1234567890,
//     "Admin",
//     3125,
//     350,
//     250,
//     2515,
//     ":"
//   ),
// ];

export default function UserTable({ allData }) {
  const [tic, setTic] = React.useState();
 

  React.useEffect(() => {
    const getNews = async () => {
      await getDocs(query(collection(db, "userProfile")))
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach((doc) => {
            let data = doc.data();
            // console.log(doc.id);
            const obj = {
              doc_id: doc.id,
              ...data,
            };
            arr.push(obj);
 
          });
          console.log(arr);
          setTic(arr);
        })
        .catch((e) => console.log(e));
    };
    getNews();
  }, []);
  console.log(tic);

  const [rows, setRows] = React.useState(allData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tablehead = {
    background: "#F2F4F8",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1E3849",
  };
  const tablebody = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1E3849",
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* <h1>
        <b>AndraPradesh District Wise Tickets</b>
      </h1> */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={tablehead}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          
            { rows
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
                          sx={tablebody}
                        >
                          {column.id === "more" ? (
                            <UserDropDown row={row} />
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
    </Paper>
  );
}

// onClick={() => navigate(`/kovil/userdetails/${row.id}`)}
