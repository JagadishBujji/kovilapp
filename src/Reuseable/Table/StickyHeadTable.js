import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "name", label: "District Code", minWidth: 170 },
  { id: "code", label: "District Name", minWidth: 100 },
  {
    id: "population",
    label: "open",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "In-Size",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Closed",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Total",
    label: "Total",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Admins",
    label: "Admins",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Subadmins",
    label: "Sub-Admins",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(
  name,
  code,
  population,
  size,
  density,
  Total,
  Admins,
  Subadmins
) {
  return { name, code, population, size, density, Total, Admins, Subadmins };
}

const rows = [
  createData("001", "Srikulam", 362, 452, 544, 1358, 8, 40),
  createData("002", "Vishakapatanam", 362, 452, 544, 1358, 8, 40),
  createData("003", "Vizaiangaram", 362, 452, 544, 1358, 8, 40),
  createData("004", "East Godavari", 362, 452, 544, 1358, 8, 40),
  createData("005", "West Godavari", 362, 452, 544, 1358, 8, 40),
  createData("005", "West Godavari", 362, 452, 544, 1358, 8, 40),
  createData("005", "West Godavari", 362, 452, 544, 1358, 8, 40),
  createData("005", "West Godavari", 362, 452, 544, 1358, 8, 40),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "10px" }}>
      <h1>
        <b>AndraPradesh District Wise Tickets</b>
      </h1>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow s>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{background: "#ebf2f8", fontSize: "14px", fontWeight: "700", fontFamily: "serif"}}
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
                        <TableCell key={column.id} align={column.align} sx={{fontFamily: "serif"}}>
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
