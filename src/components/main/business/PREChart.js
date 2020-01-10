import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Chart from './Chart';

const useStyles = makeStyles(theme => ({
  sales: {
    marginBottom: theme.spacing(1)
  }
}));

const PREChart = props => {
  const classes = useStyles();
  const { data } = props;
  const [chartData, setChartData] = useState(data[0]);

  console.log(chartData);

  return (
    <div>
      <div className={classes.sales}>
        <Typography>Average sales: {chartData.averageSales}</Typography>
      </div>
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
