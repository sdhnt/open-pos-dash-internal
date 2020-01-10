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
  const { title, data, dataKeyX, dataKeysY } = props;

  const theme = useTheme();
  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.tertiary.main
  ];

  const yAxisKeys = [];
  for (let i = 0; i < dataKeysY.length; i++) {
    yAxisKeys.push({ dataKey: dataKeysY[i], color: colors[i] });
  }

  return (
    <>
      <Typography variant={'body1'}>{title}</Typography>
      <div className={classes.chart}>
        <ResponsiveContainer width={'90%'} height={250}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <defs>
              {yAxisKeys.map(key => (
                <linearGradient
                  id={key.dataKey}
                  key={key.dataKey}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={key.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={key.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <XAxis dataKey={dataKeyX} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {yAxisKeys.map(key => (
              <Area
                type="monotone"
                dataKey={key.dataKey}
                key={key.dataKey}
                stroke={key.color}
                fillOpacity={1}
                fill={`url(#${key.dataKey})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
