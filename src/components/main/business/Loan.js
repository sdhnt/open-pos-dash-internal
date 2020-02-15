import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { FirebaseDB as db } from '../../../constants/firebase';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  }
}));

const Loan = props => {
  const classes = useStyles();
  const { businessId } = props;
  const [loan, setLoan] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await db
        .collection('loan_apps')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().user && doc.data().user.id === businessId)
              setLoan(doc.data());
          });
        });
    };
    fetchData();
  }, [businessId]);

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">Loan Application</Typography>
      </div>
      <Paper className={classes.paper}>
        {loan ? (
          <>
            <Typography variant={'h6'}>Details</Typography>
            <div>
              {loan.loan_details
                ? loan.loan_details.map((set, index) => (
                    <Paper key={index} className={classes.paper} elevation={1}>
                      <Typography variant="body1">{set.q}</Typography>
                      <Typography variant="body1">{set.a}</Typography>
                    </Paper>
                  ))
                : null}
            </div>
          </>
        ) : (
          <Typography variant="body1">
            This business has not filed an application with us.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Loan;
