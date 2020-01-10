import React from 'react';
import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { getProfitMargins } from './functions';

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  }
}));

const Inventory = props => {
  const classes = useStyles();
  const { business } = props;

  const data = getProfitMargins(business.products, { priceType: 'price' });
  console.log(data);

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Inventory</Typography>
      </div>
      <Paper className={classes.paper}>
        <Typography variant={'body1'}>
          Average retail profit margin: {data.margin * 100}%
        </Typography>
        <Typography variant={'body1'}>
          Counted number of products: {data.countedProducts}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Inventory;
