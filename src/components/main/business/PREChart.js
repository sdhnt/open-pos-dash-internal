import React, { useState } from 'react';
import {
  makeStyles,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import Chart from './Chart';
import Button from '@material-ui/core/Button';
import Table from './Table';

const useStyles = makeStyles(theme => ({
  sales: {
    marginBottom: theme.spacing(1),
    float: 'left'
  },
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 160,
    float: 'right'
  },
  button: {
    float: 'right'
  }
}));

const PREChart = props => {
  const classes = useStyles();
  const { data } = props;
  const [chartData, setChartData] = useState(data[0]);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  const handleChange = event => {
    const { value } = event.target;
    setIndex(value);
    setChartData(data[value]);
  };

  return (
    <div>
      <div>
        <div className={classes.sales}>
          <Typography>Average sales: {chartData.averageSales}</Typography>
        </div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="period">Period</InputLabel>
          <Select
            labelId="period"
            id="period"
            value={index}
            onChange={handleChange}
            labelWidth={50}
          >
            <MenuItem value={0}>Last 7 Days</MenuItem>
            <MenuItem value={1}>Last 30 Days</MenuItem>
            <MenuItem value={2}>This Month</MenuItem>
            <MenuItem value={3}>Last Month</MenuItem>
            <MenuItem value={4}>Last 3 Months</MenuItem>
            <MenuItem value={5}>Last 6 Months</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ clear: 'both' }} />
      <Chart
        title="Revenue, Profit and Expenses"
        data={chartData.data}
        dataKeyX="date"
        dataKeysY={['Revenue', 'Profit', 'Expenses']}
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
              key: 'date',
              text: 'Date'
            },
            {
              key: 'Revenue',
              text: 'Total sales'
            },
            {
              key: 'Profit',
              text: 'Profit'
            },
            {
              key: 'Expenses',
              text: 'Expenses'
            }
          ]}
          rows={chartData.data}
        />
      ) : null}
    </div>
  );
};

export default PREChart;
