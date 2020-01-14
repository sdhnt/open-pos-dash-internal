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

const useStyles = makeStyles(theme => ({
  sales: {
    marginBottom: theme.spacing(1),
    float: 'left'
  },
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 160,
    float: 'right'
  }
}));

const PREChart = props => {
  const classes = useStyles();
  const { data } = props;
  const [chartData, setChartData] = useState(data[0]);
  const [index, setIndex] = useState(0);

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
    </div>
  );
};

export default PREChart;
