import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Chart from './Chart';
import Table from './Table';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  button: {
    float: 'right'
  }
}));

const MonthlyChart = props => {
  const classes = useStyles();
  const { data } = props;
  const [show, setShow] = useState(false);

  return (
    <>
      <Chart
        title="Total sales in the last 12 months"
        data={data}
        dataKeyX="month"
        dataKeysY={['Revenue']}
      />
      <Button
        color="primary"
        className={classes.button}
        onClick={() => setShow(!show)}
      >
        Show table
      </Button>
      <div style={{ clear: 'both' }} />
      {show ? (
        <Table
          size="small"
          headers={[
            {
              key: 'month',
              text: 'Month'
            },
            {
              key: 'Revenue',
              text: 'Total sales'
            }
          ]}
          rows={data}
        />
      ) : null}
    </>
  );
};

export default MonthlyChart;
