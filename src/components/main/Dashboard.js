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
import BusinessModal from '../complement/BusinessModal';

const useStyles = makeStyles(theme => ({
  main: {
    margin: '2vh 2vw',
    padding: '2vh 2vw'
  },
  header: {
    margin: '1vh auto'
  },
  tableWrapper: {
    maxHeight: '80vh',
    overflow: 'auto'
  }
}));

const columns = [
  { id: 'business_name', label: 'Name', minWidth: 100 },
  { id: 'business_address', label: 'Business Address', minWidth: 150 },
  { id: 'businesstype', label: 'Type', minWidth: 80 },
  { id: 'cash_balance', label: 'Cash Balance', minWidth: 60 },
  { id: 'owner_name', label: 'Owner', minWidth: 50 },
  { id: 'ph_no', label: 'Phone', minWidth: 50 }
];

const Dashboard = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [focusedUser, setFocusedUser] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = userId => {
    setOpen(true);
    const user = users.find(user => userId === user.id);
    setFocusedUser(user);
  };

  const handleClose = () => {
    setOpen(false);
    setFocusedUser({});
  };

  useEffect(() => {
    const fetchData = async () => {
      const newRows = [],
        newUsers = [];
      await db
        .collection('users')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const row = { id: doc.id };
            columns.forEach(column => {
              row[column.id] = doc.data()[column.id];
            });
            newRows.push(row);
            newUsers.push({ ...doc.data(), id: doc.id });
          });
        });
      setRows(newRows);
      setUsers(newUsers);
    };
    fetchData();
  }, [rows.length, users.length]);

  return (
    <Paper className={classes.main}>
      <div className={classes.header}>
        <Typography variant={'h3'}>Dashboard</Typography>
      </div>

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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => {
                      handleOpen(row.id);
                    }}
                  >
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
      <BusinessModal open={open} user={focusedUser} handleClose={handleClose} />
    </Paper>
  );
};

export default Dashboard;
