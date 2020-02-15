import React from 'react';
import Container from '@material-ui/core/Container';
import { getExpensesData } from './functions';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Paper } from '@material-ui/core';
import Table from './Table';

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  },
  table: {
    margin: theme.spacing(1)
  }
}));

const Expenses = props => {
  const classes = useStyles();
  const { business } = props;
  const data = getExpensesData(business.transactions);

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Expenses</Typography>
      </div>
      <Paper className={classes.paper}>
        <Table
          headers={[
            {
              key: 'category',
              text: 'Category'
            },
            {
              key: 'sevenDays',
              text: 'Last 7 days'
            },
            {
              key: 'thirtyDays',
              text: 'Last 30 days'
            },
            {
              key: 'thisMonth',
              text: 'This month'
            },
            {
              key: 'lastMonth',
              text: 'Last month'
            },
            {
              key: 'threeMonths',
              text: 'Last 3 months'
            },
            {
              key: 'sixMonths',
              text: 'Last 6 months'
            }
          ]}
          rows={data}
        />
      </Paper>
    </Container>
  );
};

export default Expenses;
