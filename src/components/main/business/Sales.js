import React from 'react';
import { makeStyles, Container, Typography, Paper } from '@material-ui/core';
import Chart from './Chart';
import { getMonthlyPerformance } from './functions';

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2)
  }
}));

const Sales = props => {
  const classes = useStyles();
  const { business } = props;

  const data = getMonthlyPerformance(business.transactions);

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Sales and Income</Typography>
      </div>
      <Paper className={classes.paper}>
        <Chart data={data} />
      </Paper>
    </Container>
  );
};

export default Sales;
