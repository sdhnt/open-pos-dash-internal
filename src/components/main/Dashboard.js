import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from '@material-ui/core';
import { FirebaseDB as db } from '../../constants/firebase';

const useStyles = makeStyles(theme => ({
  main: {
    padding: '2vh 2vw'
  },
  tableWrapper: {
    maxHeight: '80vh',
    overflow: 'auto'
  }
}));

const columns = [
  { id: 'business_address', label: 'Business Address', minWidth: 170 },
  { id: 'business_name', label: 'Name', minWidth: 100 }
];

const Dashboard = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    db.collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          const row = {
            business_address: data.business_address,
            business_name: data.business_name
          };
          rows.push(row);
          setRows(rows);
        });
      });
  }, [rows]);

  return (
    <Paper className={classes.main}>
      <Typography variant={'h1'}>Dashboard</Typography>

      <div className={classes.tableWrapper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(column => (
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
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
};

export default Dashboard;
