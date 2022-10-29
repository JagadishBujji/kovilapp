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
  { id: "name", label: "District Code", minWidth: 100, align: "center" },
  { id: "code", label: "District Name", minWidth: 100 },
  {
    id: "open",
    label: "Open",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "inProgress",
    label: "In-Progress",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "closed",
    label: "Closed",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total",
    label: "Total",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Admins",
    label: "Admins",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Subadmins",
    label: "Sub-Admins",
    minWidth: 100,
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

export default function StickyHeadTable({ allTicketsAvailable }) {
  const [selectState, setSelectState] = React.useState("tamil nadu")
  const [allTickets, setAllTickets] = React.useState(allTicketsAvailable)
  React.useEffect(() => {
    if (selectState) {
      if(selectState==="All")
      {
        setAllTickets(allTicketsAvailable)
      }
      else{
      
      let filterdList = allTicketsAvailable.map((mp) => {
        const cc = mp.state.toLowerCase();
        const gg = selectState?.toLowerCase();
        // console.log(cc, gg)
        if (cc === gg) {
          return mp
        }
      })
      // console.log(filterdList)

      filterdList = filterdList.filter(function (element) {
        return element !== undefined;
      });
      setAllTickets(filterdList)
    }
    } else {
      // console.log(allTicketsAvailable)
      setAllTickets(allTicketsAvailable)
    }
  }, [selectState])
  // console.log(allTickets)

  let districts = new Set();
  allTickets?.forEach(element => {
    // console.log(element.city)
    districts.add(element?.district)
  });
  // console.log(districts);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // console.log(districts.size)
  const distArray = Array.from(districts);
  // console.log(distArray)
  const distArrayOpen = distArray;
  const distArrayInProgess = distArray;
  const distArrayClosed = distArray;

  let disObj = {

  }
  // distArray.map((ds)=>{
  //   console.log(ds)
  //   const newArr={

  //   }
  // })
  let res = distArray.reduce((acc, curr) => (acc[curr] = 0, acc), {});
  let vals = []
  let distInpro = []
  let disOpen = []
  let disClosed = []
  for (let i = 0; i < districts.size; i++) {
    vals.push(0)
    disOpen.push(0)
    disClosed.push(0)
    distInpro.push(0);
  }
  // console.log(res)
  // console.log(vals)
  allTickets?.map((at) => {
    // console.log(at.district)


    if (distArray.includes(at?.district)) {
      const vs = distArray.indexOf(at?.district)
      vals[vs]++;
    }
    if (distArray.includes(at?.district) && at?.status === "In-Progress") {
      const vs = distArray.indexOf(at?.district)
      distInpro[vs]++;
    }
    if (distArray.includes(at?.district) && at?.status === "Open") {
      const vs = distArray.indexOf(at?.district)
      disOpen[vs]++;
    }
    if (distArray.includes(at?.district) && at?.status === "Closed") {
      const vs = distArray.indexOf(at?.district)
      disClosed[vs]++;
    }
  })
  // console.log(vals);
  var r = {}
  var ip = {}
  var op = {}
  var cl = {}
  let i;
  for (let i = 0; i < districts.size; i++) {
    r[distArray[i]] = vals[i]
    ip[distArray[i]] = distInpro[i]
    op[distArray[i]] = disOpen[i]
    cl[distArray[i]] = disClosed[i]
  }
  // console.log(r);
  // console.log("inprogess", ip);
  // console.log("closed", cl);
  // console.log("opened", op);
  let ap = []
  let id = 0
  distArray.map((rs) => {
    id = id + 1
    const tt = op[rs] + ip[rs] + cl[rs]
    ap.push(createData(id, rs, op[rs], ip[rs], cl[rs], tt, 8, 40),)
  })
  // allTickets?.map((rs)=>{
  //   // console.log(rs.district)
  //   id=id+1
  //   const ds=rs.district;
  //   const tt=op[ds]+ip[ds]+cl[ds]
  //   ap.push(createData(id, ds, op[ds], ip[ds], cl[ds], tt, 8, 40),)
  // })
  // allTickets?.map((rs)=>{
  //   id=id+1
  //   const ds=rs.district
  //   const tt=op[ds]+ip[ds]+cl[ds]
  //   ap.push(createData(id, rs, op[ds], ip[ds], cl[ds], tt, 8, 40),)
  // })
  // for (const property in r) {
  //   console.log(`${property}: ${r[property]}`);
  // }

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
    zIndex: "0",
  };
  const stickybody = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1E3849",
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "13px" }}>
      <div className="statewise">
        <StateOption setSelectState={setSelectState} />
        <h1 className="district-title">District Wise Tickets</h1>
      </div>

      <TableContainer>
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
            {ap
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
                    {ap.length===0 && <p>No data available</p>}

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
