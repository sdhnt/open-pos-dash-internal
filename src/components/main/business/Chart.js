import React from 'react';
import { makeStyles, Typography, useTheme } from '@material-ui/core';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const useStyles = makeStyles(theme => ({
  chart: {
    width: '100%',
    margin: 'auto',
    marginTop: theme.spacing(2)
  }
}));

const Chart = props => {
  const classes = useStyles();
  const { data } = props;

  const theme = useTheme();
  const color = theme.palette.primary.main;

  return (
    <>
      <Typography variant={'body1'}>
        Average sales in the last 12 months
      </Typography>
      <div className={classes.chart}>
        <ResponsiveContainer width={'90%'} height={250}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="averageSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis dataKey="revenue" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={color}
              fillOpacity={1}
              fill="url(#averageSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
