import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'id', label: 'id', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'published',
    label: 'Published By',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'article',
    label: 'Article',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'more',
    label: 'More',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];

function createData(id, date, published, article, more) {
  
  return { id, date, published, article, more };
}

const rows = [
  createData('#06', 'Oct. 11, 2022', "None", "short news 3 , demo, short news 3 , demo short news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 …", "Closed On"),
  createData('#05', 'Oct. 11, 2022', "None", "short news 3 , demo, short news 3 , demo short news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 …", "Closed On"),
  createData('#04', 'Oct. 11, 2022', "None", "short news 3 , demo, short news 3 , demo short news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 …", "Closed On"),
  createData('#03', 'Oct. 11, 2022', "None", "short news 3 , demo, short news 3 , demo short news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 …", "Closed On"),
  createData('#02', 'Oct. 11, 2022', "None", "short news 3 , demo, short news 3 , demo short news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 , demoshort news 3 …", "Closed On"),
  createData('#01', 'Oct. 11, 2022', "None", "Happy Dusserra to all", "Re-assigned"),
 
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

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      <h1><b>New News</b></h1>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                 
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
                          {column.format && typeof value === 'number'
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
