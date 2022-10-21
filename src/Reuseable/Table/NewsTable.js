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
import DropDownIcon from "../DropDown/DropDownIcon";
import { useState } from "react";
import NewsModal from "../NewsModal/NewsModal";
import TicketsBack from "../TicketsBack";

const columns = [
  { id: "ID", label: "ID", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 100 },
  {
    id: "published",
    label: "Published By",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "article",
    label: "Article",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "more",
    label: "More",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(ID, date, published, article, more) {
  return { ID, date, published, article, more };
}

const rows = [
  createData(
    "#06",
    "Oct. 11, 2022",
    "None",
    "short news 3 , demo, short news 3 , demo short news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 …",
    <DropDownIcon />
  ),
  createData(
    "#05",
    "Oct. 11, 2022",
    "None",
    "short news 3 , demo, short news 3 , demo short news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 …",
    <DropDownIcon />
  ),
  createData(
    "#04",
    "Oct. 11, 2022",
    "None",
    "short news 3 , demo, short news 3 , demo short news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 …",
    <DropDownIcon />
  ),
  createData(
    "#03",
    "Oct. 11, 2022",
    "None",
    "short news 3 , demo, short news 3 , demo short news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 …",
    <DropDownIcon />
  ),
  createData(
    "#02",
    "Oct. 11, 2022",
    "None",
    "short news 3 , demo, short news 3 , demo short news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 …",
    <DropDownIcon />
  ),
  createData("#01", "Oct. 11, 2022", "None", "Happy Dusserra to all", <DropDownIcon />),
];

export default function NewsTable() {
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
    zIndex:"0"
  };
  const ticketbody = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1E3849",
    textAlign: "left",
  };


 const [openModal ,setOpenModal] = useState(false);
 const handleClick = () => {
  setOpenModal(true)
 }

 const deleteHandler = () => {
  setOpenModal(false)
 }

 const onConirm = () => {
  setOpenModal(false)
 }

 
 const save = {
  borderColor: "#f17116",
  color: "#f17116",
  "&:hover": {
    borderColor: "#f17116",
    color: "#f17116",
  },

};


  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <div className="row user-tabs">
        <h4>
          <b>New News</b>
        </h4>
        <Button
          sx={save }
          variant="outlined"
          onClick={handleClick}
        >
          Create News
        </Button>
      </div>
      {openModal && <NewsModal onCancel={deleteHandler} onSave={onConirm}/>}
      {openModal && <TicketsBack />}
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
                          sx={ticketbody}
                        >
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
