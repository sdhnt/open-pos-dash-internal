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

  let monthlyPerformance = getMonthlyPerformance(business.transactions);
  monthlyPerformance = monthlyPerformance.map(performance => ({
    month: performance.month,
    Revenue: performance.revenue
  }));

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Sales and Income</Typography>
      </div>
      <Paper className={classes.paper}>
        <Chart
          title="Average sales in the last 12 months"
          data={monthlyPerformance}
          dataKeyX="month"
          dataKeysY={['Revenue']}
        />
      </Paper>
    </Container>
  );
};

export default Sales;
