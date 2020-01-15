import React from 'react';
import { makeStyles, Container, Typography, Paper } from '@material-ui/core';
import {
  getAverageSales,
  getAnnualPerformance,
  getPerformanceData,
  getCashFlowData
} from './functions';
import MonthlyChart from './MonthlyChart';
import PREChart from './PREChart';
import CashFlow from './CashFlow';

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

  let PREAData = getPerformanceData(business.transactions);
  PREAData = PREAData.map(periodData => ({
    data: periodData.data,
    averageSales: getAverageSales(periodData.data)
  }));

  const cashFlowData = getCashFlowData(business.transactions);

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
      <Paper className={classes.paper}>
        <CashFlow data={cashFlowData} />
      </Paper>
    </Container>
  );
};

export default Revenue;
