import React from 'react';
import { makeStyles, Container, Typography, Paper } from '@material-ui/core';
import moment from 'moment';
import Chart from './Chart';
import {
  getAverageSales,
  getAnnualPerformance,
  getPerformanceByDays,
  getMonthlyPerformance
} from './functions';
import PREChart from './PREChart';

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  }
}));

const Sales = props => {
  const classes = useStyles();
  const { business } = props;

  let annualPerformance = getAnnualPerformance(business.transactions);
  annualPerformance = annualPerformance.map(performance => ({
    month: performance.month,
    Revenue: performance.revenue
  }));

  const businessPerfomance7Days = getPerformanceByDays(
    business.businessPerformance,
    7
  );
  const businessPerfomance30Days = getPerformanceByDays(
    business.businessPerformance,
    30
  );
  const businessPerformanceThisMonth = getMonthlyPerformance(
    business.transactions,
    moment().startOf('month')
  );
  const businessPerformanceLastMonth = getMonthlyPerformance(
    business.transactions,
    moment()
      .subtract(1, 'month')
      .startOf('month')
  );

  let PREAData = [
    businessPerfomance7Days,
    businessPerfomance30Days,
    businessPerformanceThisMonth,
    businessPerformanceLastMonth
  ];
  PREAData = PREAData.map(data => ({
    data,
    averageSales: getAverageSales(data)
  }));

  PREAData = PREAData.map(dataArray => {
    dataArray.data = dataArray.data.map(performance => ({
      Profit: performance.profit,
      Revenue: performance.revenue,
      Expenses: performance.expenses
    }));
    return dataArray;
  });

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Sales and Income</Typography>
      </div>
      <Paper className={classes.paper}>
        <Chart
          title="Average sales in the last 12 months"
          data={annualPerformance}
          dataKeyX="month"
          dataKeysY={['Revenue']}
        />
      </Paper>
      <Paper className={classes.paper}>
        <PREChart data={PREAData} />
      </Paper>
    </Container>
  );
};

export default Sales;
