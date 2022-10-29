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
import TicketsDropDown from "../TicketsDropDown/TicketsDropDown";

const columns = [
  // { id: "doc_id", label: "ID", minWidth: 120 },
  { id: "city", label: "District Name", minWidth: 120 },
  {
    id: "temple_name",
    label: "Temple",
    minWidth: 120,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "complaint_type",
    label: "Complaint Type",
    minWidth: 120,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "admin",
    label: "Admin",
    minWidth: 120,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "subadmin",
    label: "Sub-Admin",
    minWidth: 120,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "posted_on",
    label: "Assigned-On",
    minWidth: 120,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "date",
    label: "Due-Date",
    minWidth: 120,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "actions",
    label: "Action",
    minWidth: 120,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];


export default function TicketTable({ tickets }) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState(tickets);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Ticket = {
    background: "#F2F4F8",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1E3849",
  
  };
  const Ticketbody = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1E3849",
    
  
  };

  

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "10px" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow s>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={Ticket}
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
                    key={row.doc_id}
                  >
                    {columns.map((column) => {
                      // console.log(column)
                      const value = row[column.id]; 
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                         onClick={() => navigate(`/kovil/ticketsdetails/${row.doc_id}`)}
                          sx={{fontFamily: "sans-serif"}}
                        >
                          <span
                        style={{
                          color:
                          column.id === "doc_id"
                            ? "#0D83FE"
                            : ""
                        }}
                        >

                        
                          {column.id === "actions" ? (
                            <TicketsDropDown onNavigate={()=>navigate("kovil/assigntickets/4TL5j9ZbJV5d0NpSqlt2")} onPress={() => navigate(`/kovil/ticketsdetails/${row.doc_id}`)} />
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
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
