import React from 'react';
import { makeStyles, Container, Typography, Paper } from '@material-ui/core';
import moment from 'moment';
import {
  getAverageSales,
  getAnnualPerformance,
  getPerformanceByDays,
  getMonthlyPerformance
} from './functions';
import MonthlyChart from './MonthlyChart';
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

const Revenue = props => {
  const classes = useStyles();
  const { business } = props;

  let annualPerformance = getAnnualPerformance(business.transactions);
  annualPerformance = annualPerformance.map(performance => ({
    month: performance.month,
    Revenue: performance.revenue
  }));

  const businessPerformance7Days = getPerformanceByDays(
    business.businessPerformance,
    7
  );
  const businessPerformance30Days = getPerformanceByDays(
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
    businessPerformance7Days,
    businessPerformance30Days,
    businessPerformanceThisMonth,
    businessPerformanceLastMonth
  ];
  PREAData = PREAData.map(data => ({
    data,
    averageSales: getAverageSales(data)
  }));

  PREAData = PREAData.map(dataArray => {
    dataArray.data = dataArray.data.map(performance => ({
      date: performance.date,
      Profit: performance.profit,
      Revenue: performance.revenue,
      Expenses: -1 * performance.expenses
    }));
    return dataArray;
  });

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Revenue</Typography>
      </div>
      <Paper className={classes.paper}>
        <MonthlyChart data={annualPerformance} />
      </Paper>
      <Paper className={classes.paper}>
        <PREChart data={PREAData} />
      </Paper>
    </Container>
  );
};

export default Revenue;
