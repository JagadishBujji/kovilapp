import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import StateOption from "../SelectField/StateOptions";

const columns = [
  { id: "name", label: "District Code", minWidth: 170 },
  { id: "code", label: "District Name", minWidth: 100 },
  {
    id: "open",
    label: "Open",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "inProgress",
    label: "In-Progress",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "closed",
    label: "Closed",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total",
    label: "Total",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Admins",
    label: "Admins",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Subadmins",
    label: "Sub-Admins",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(
  name,
  code,
  open,
  inProgress,
  closed,
  total,
  Admins,
  Subadmins
) {
  return { name, code, open, inProgress, closed, total, Admins, Subadmins };
}

const rows = [
  createData("001", "Srikulam", 362, 452, 544, 1358, 8, 40),
  createData("002", "Vishakapatanam", 362, 452, 544, 1358, 8, 40),
  createData("003", "Vizaiangaram", 362, 452, 544, 1358, 8, 40),
  createData("004", "East Godavari", 362, 452, 544, 1358, 8, 40),
  createData("005", "West Godaari", 362, 452, 544, 1358, 8, 40),
  createData("005", "West Godvari", 362, 452, 544, 1358, 8, 40),
  createData("005", "West Goavari", 362, 452, 544, 1358, 8, 40),
  createData("005", "West Gdavari", 362, 452, 544, 1358, 8, 40),
];

export default function StickyHeadTable({allTickets}) {
  console.log(allTickets)
  let districts = new Set();
  allTickets?.forEach(element => {
    // console.log(element.city)
    districts.add(element.city) 
  });
  console.log(districts);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const stickyhead = {
    background: "#F2F4F8",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1E3849",
    textAlign: "left",
  };
  const stickybody = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1E3849",
    textAlign: "left",
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "13px" }}>
      <div className="statewise">
        <StateOption />
        <h1 className="district-title">District Wise Tickets</h1>
      </div>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow s>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={stickyhead}
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
                          sx={stickybody}
                        >
                          <span
                            style={{
                              backgroundColor:
                                column.id === "open"
                                  ? "#DAE5D1"
                                  : column.id === "inProgress"
                                  ? "#D1E9F7"
                                  : column.id === "closed"
                                  ? "#FFD8D8"
                                  : column.id === "total"
                                  ? "#D5DADD"
                                  : "",
                                  
                              color:
                                column.id === "open"
                                  ? "#7C8F33"
                                  : column.id === "inProgress"
                                  ? "#ACB1DB"
                                  : column.id === "closed"
                                  ? "#FF0C76"
                                  : column.id === "total"
                                  ? "#659FCA"
                                  : "",
                                borderRadius:
                                column.id === "open"
                                  ? "3px"
                                  : column.id === "inProgress"
                                  ? "3px"
                                  : column.id === "closed"
                                  ? "3px"
                                  : column.id === "total"
                                  ? "3px"
                                  : "",
                                  padding:
                                  column.id === "open"
                                  ? "3px"
                                  : column.id === "inProgress"
                                  ? "3px"
                                  : column.id === "closed"
                                  ? "3px"
                                  : column.id === "total"
                                  ? "3px"
                                  : "",
                            }}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </span>
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
