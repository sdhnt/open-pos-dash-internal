import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { FirebaseDB as db } from '../../../constants/firebase';
import Revenue from './Revenue';
import Inventory from './Inventory';

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
  const businessId = sessionStorage.getItem('businessId');
  const [business, setBusiness] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await db
        .collection('users-archive')
        .doc(businessId)
        .get()
        .then(doc => {
          setBusiness(doc.data());
        });
    };
    fetchData();
  }, [businessId]);

  if (!business) return <>Loading</>;

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
          <Inventory business={business} />
        </div>
      </div>
    </div>
  );
};

export default Business;
