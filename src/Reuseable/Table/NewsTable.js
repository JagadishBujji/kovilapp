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
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";
import Loader from "../Loader/Loader";
import Linkify from 'react-linkify'
import { ExtractLink } from "../Stepper/ExtractLink";

const columns = [
  // { id: "ID", label: "ID", minWidth: 170 },
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

function createData( date, published, article, more) {
  return {  date, published, article, more };
}


export default function NewsTable() {
  const [page, setPage] = React.useState(0);
  const [count,setCount]=useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allNews,setAllNews]=React.useState();
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    const getNews = async () => {
      await getDocs(query(collection(db, "short_news"),orderBy("posted_on_timestamp","desc")))
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
        setAllNews(arr);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
       
    };
    getNews()
  }, [count]); 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let rows=[] 
  allNews?.map((as)=>{ 
    const nm= ExtractLink(as.news)
      rows.push(createData(
        // as.doc_id,
        as.posted_on,
        as.published_by,
        <div dangerouslySetInnerHTML={{__html:nm }} />,
        <DropDownIcon doc_id={as.doc_id} />
      ))
  })
  // console.log(rows);
  const stickyhead = {
    background: "#F2F4F8",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1E3849",
    textAlign: "left",
    zIndex: "0",
  };
  const ticketbody = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1E3849",
    textAlign: "left",
  };

  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    setOpenModal(true);
  };

  const deleteHandler = () => {
    setOpenModal(false);
  };

  const onConirm = () => {
    setOpenModal(false);
  };

  const save = {
    borderColor: "#f17116",
    color: "#f17116",
    "&:hover": {
      borderColor: "#f17116",
      color: "#f17116",
    },
  };

  return (
    <>
     {isLoading && <Loader />}
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <div className="row user-tabs">
        <h4>
          <b>New News</b>
        </h4>
        <Button sx={save} variant="outlined" onClick={handleClick}>
          Create News
        </Button>
      </div>
      {openModal && <NewsModal count={count} setCount={setCount} onCancel={deleteHandler} onSave={onConirm} />}
      {openModal && <TicketsBack />}
      <TableContainer>
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
                            <DropDownIcon count={count} setCount={setCount} data={row}/>
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
    </>
  );
}
