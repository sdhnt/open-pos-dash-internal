import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  getProductData,
  getOrderData,
  getInventoryTransactionsData
} from './functions';
import Table from './Table';
import InventoryTransactionsChart from './InventoryTransactionsChart';

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  },
  table: {
    margin: theme.spacing(1)
  }
}));

const Inventory = props => {
  const classes = useStyles();
  const { business } = props;

  const rawProductData = getProductData(business.products, [
    { title: 'Retail', priceType: 'price' },
    { title: 'Wholesale', priceType: 'wholesale_price' }
  ]);

  const productData = rawProductData.map(data => ({
    ...data,
    margin: `${data.margin}%`
  }));

  const orderData = getOrderData(business.transactions, 6);

  const transactionsData = getInventoryTransactionsData(business.transactions);

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Inventory</Typography>
      </div>
      <Paper className={classes.paper}>
        <Typography variant={'h6'}>Profit margins</Typography>
        <Table
          headers={[
            {
              key: 'title',
              text: 'Price type'
            },
            {
              key: 'averageSaleValue',
              text: 'Average sale value'
            },
            {
              key: 'margin',
              text: 'Average margin'
            },
            {
              key: 'totalInventoryValue',
              text: 'Total inventory value'
            },
            {
              key: 'countedProducts',
              text: 'Counted number of products'
            }
          ]}
          rows={productData}
        />

        <Typography variant={'h6'}>Inventory order size</Typography>
        <Table
          headers={[
            {
              key: 'month',
              text: 'Month'
            },
            {
              key: 'total',
              text: 'Total'
            },
            {
              key: 'average',
              text: 'Average'
            },
            {
              key: 'largest',
              text: 'Largest'
            },
            {
              key: 'orderCount',
              text: 'Order count'
            }
          ]}
          rows={orderData}
        />
      </Paper>

      <Paper className={classes.paper}>
        <InventoryTransactionsChart data={transactionsData} />
      </Paper>
    </Container>
  );
};

export default Inventory;
