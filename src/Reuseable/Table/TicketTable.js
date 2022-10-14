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
  { id: "id", label: "ID", minWidth: 170 },
  { id: "districtname", label: "District Name", minWidth: 100 },
  {
    id: "temple",
    label: "Temple",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "complaint",
    label: "Complaint Type",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "admin",
    label: "Admin",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "subadmin",
    label: "Sub-Admins",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "assigned",
    label: "Assigned-On",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "date",
    label: "Due-Date",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(
    id,
    districtname,
    temple,
    complaint,
    admin,
    subadmin,
    assigned,
    date
) {
  return { id,districtname ,temple, complaint, admin, subadmin,assigned,date };
}

const rows = [
  createData("#KA001", "Srikakulam","SriSuryanaryanaswamy", "Noise", "srivatsava", "Johnny", "23-05-2022", "30-06-2022"),
  createData("#KA002", "Vishakapatanam","sri Pydi Talli Ammavaru", "Money Collection From public", "srivatsava","Jhonny-absent williams-Reassigned", "23-05-2022", "30-06-2022"),
  createData("#KA001", "Srikakulam","SriSuryanaryanaswamy", "Noise", "srivatsava", "Johnny", "23-05-2022", "30-06-2022"),
  createData("#KA002", "Vishakapatanam","sri Pydi Talli Ammavaru", "Money Collection From public", "srivatsava","Jhonny-absent williams-Reassigned", "23-05-2022", "30-06-2022"),
  createData("#KA001", "Srikakulam","SriSuryanaryanaswamy", "Noise", "srivatsava", "Johnny", "23-05-2022", "30-06-2022"),
  createData("#KA002", "Vishakapatanam","sri Pydi Talli Ammavaru", "Money Collection From public", "srivatsava","Jhonny-absent williams-Reassigned", "23-05-2022", "30-06-2022"),
  
];

export default function TicketTable() {
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
        <b>Tickets</b>
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
                  sx={{background: "#ebf2f8", fontSize: "14px", fontWeight: "700"}}
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
                        <TableCell key={column.id} align={column.align}>
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
