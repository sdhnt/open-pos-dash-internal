import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { getProfitMargins } from './functions';

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  }
}));

const Inventory = props => {
  const classes = useStyles();
  const { business } = props;

  const data = getProfitMargins(business.products, [
    { title: 'Retail', priceType: 'price' },
    { title: 'Wholesale', priceType: 'wholesale_price' }
  ]);

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Inventory</Typography>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Price Type</TableCell>
              <TableCell align="center">Average profit margin</TableCell>
              <TableCell align="center">Counted number of products</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.title}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="center">{row.margin * 100}%</TableCell>
                <TableCell align="center">{row.countedProducts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Inventory;
