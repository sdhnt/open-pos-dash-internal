import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { financial } from '../../data/financial';
import Table from './Table';

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  },
  buttonGroup: {
    float: 'right'
  }
}));

const Financial = () => {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Business Financial</Typography>
      </div>
      <Paper className={classes.paper}>
        <Table
          headers={[
            {
              key: 'ratio',
              text: 'Ratio'
            },
            {
              key: 'threeMonths',
              text: '3 months'
            },
            {
              key: 'sixMonths',
              text: '6 months'
            }
          ]}
          rows={financial}
        />
      </Paper>
    </Container>
  );
};

export default Financial;
