import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));

const PREChart = props => {
  const classes = useStyles();
  const { data } = props;
  const [chartData, setChartData] = useState(data[0]);

  console.log(chartData);

  return (
    <div>
      <Typography>Average sales:</Typography>
    </div>
  );
};

export default PREChart;
