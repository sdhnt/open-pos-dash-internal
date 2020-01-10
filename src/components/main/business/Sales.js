import React from 'react';
import {
  makeStyles,
  Container,
  Typography,
  Paper,
  useTheme
} from '@material-ui/core';
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer
} from 'recharts';
import { getMonthlyPerformance } from './functions';

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2)
  },
  chart: {
    width: '100%',
    margin: 'auto',
    marginTop: theme.spacing(2)
  }
}));

const Sales = props => {
  const classes = useStyles();
  const { business } = props;
  const theme = useTheme();
  const color = theme.palette.primary.main;

  const data = getMonthlyPerformance(business.transactions);

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Sales and Income</Typography>
      </div>
      <Paper className={classes.paper}>
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
      </Paper>
    </Container>
  );
};

export default Sales;
