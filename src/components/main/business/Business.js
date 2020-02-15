import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { FirebaseDB as db } from '../../../constants/firebase';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Revenue from './Revenue';
import Expenses from './Expenses';
import Inventory from './Inventory';
import Loan from './Loan';
import Financial from './Financial';
import Loading from '../../complement/Loading';

const useStyles = makeStyles(theme => ({
  root: {
    margin: `auto`
  },
  header: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2)
  },
  content: {
    margin: theme.spacing(2)
  },
  section: {
    marginTop: theme.spacing(1)
  }
}));

const Business = () => {
  const classes = useStyles();
  const { id: businessId } = useParams();
  const [business, setBusiness] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const userDoc = await db
        .collection('users')
        .doc(businessId)
        .get();
      const user = userDoc.data();

      // products
      if (user.productMigrated) {
        const snapshot = await db
          .collection(`/users/${businessId}/products`)
          .orderBy('index')
          .get();
        user.products = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          user.products.push(...data.products);
        });
      }

      // transactions
      const url =
        'https://us-central1-open-fintech.cloudfunctions.net/data/transactions';
      const params = {
        id: businessId,
        start: new Date('2000-01-01T00:00:00.000Z'),
        end: new Date()
      };
      const response = await axios.get(url, { params });
      if (response.data && response.data.transactions)
        user.transactions = response.data.transactions;
      setBusiness(user);
    };
    fetchData().then(() => console.log(`data loaded from ${businessId}`));
  }, [businessId]);

  if (!business) return <Loading />;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h3">{business.business_name}</Typography>
      </div>
      <div className={classes.content}>
        <div className={classes.section}>
          <Revenue business={business} />
        </div>
        <div className={classes.section}>
          <Expenses business={business} />
        </div>
        <div className={classes.section}>
          <Inventory business={business} />
        </div>
        <div className={classes.section}>
          <Loan businessId={business.id} />
        </div>
        <div className={classes.section}>
          <Financial />
        </div>
      </div>
    </div>
  );
};

export default Business;
