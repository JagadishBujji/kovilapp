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
import DropDownIcon from "../DropDown/DropDownIcon";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "first_name", label: "First name", minWidth: 100, align: "left"},
  { id: "last_name", label: "Last name", minWidth: 100, align: "left"},

  {
    id: "phone_number",
    label: "Mobile Number",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "role",
    label: "Role",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "assigned",
    label: "Assigned",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "open",
    label: "Open",
    minWidth: 170,
    align: "left",
    format: (value) =>  value.toLocaleString("en-US"),
  },
  {
    id: "close",
    label: "Close",
    minWidth: 170,
    align: "left",
    format: (value) =>  value.toLocaleString("en-US"),
  },
  {
    id: "progress",
    label: "In-Progress",
    minWidth: 170,
    align: "left",
    format: (value) =>  value.toLocaleString("en-US"),
  },
  {
    id: "more",
    label: "More",
    minWidth: 170,
    align: "left",
    format: (value) =>  value.toLocaleString("en-US"),
  },
];

function createData(
  id,
  user,
  number,
  role,
  assigned,
  open,
  close,
  progress,
  more
) {
  return { id, user, number, role, assigned, open, close, progress, more };
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

export default function UserTable({allData}) {
  const navigate = useNavigate();
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
    textAlign: "left"
 
  }
  const tablebody = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1E3849",
    textAlign: "left"
 
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* <h1>
        <b>AndraPradesh District Wise Tickets</b>
      </h1> */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
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
            {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}  onClick={() => navigate("/kovil/userdetails")} sx={tablebody}>
                            {column.id === "more" ? (
                            <DropDownIcon />
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
              })} */}
                 {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}  onClick={() => navigate(`/kovil/userdetails/${row.id}`)} sx={tablebody}>
                          {column.id === "more" ? (
                            <DropDownIcon />
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
