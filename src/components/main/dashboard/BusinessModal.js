import React from 'react';
import {
  makeStyles,
  Modal,
  Typography,
  Button,
  TableCell,
  TableRow,
  TableBody,
  Table
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    position: 'absolute',
    top: '10vh',
    margin: 'auto',
    width: '80vw',
    maxWidth: 'calc(700px + 10vw)',
    maxHeight: '80vh',
    background: 'white',
    borderRadius: '20px',
    padding: '2vh 2vw'
  },
  topBar: {
    margin: `${theme.spacing(2)} auto`
  },
  left: {
    float: 'left'
  },
  right: {
    float: 'right'
  },
  table: {
    minWidth: '500px'
  },
  text: {
    margin: '4px auto'
  }
}));

const stringFields = [
  { id: 'business_address', key: 'Address' },
  { id: 'businesstype', key: 'Type' },
  { id: 'owner_name', key: 'Owner' },
  { id: 'ph_no', key: 'Phone' },
  { id: 'cash_balance', key: 'Cash Balance' },
  { id: 'discount', key: 'Usual Discount %' },
  { id: 'taxrate', key: 'Usual Tax %' }
];

const arrayFields = [
  { id: 'categories', key: 'Number of Categories' },
  { id: 'products', key: 'Number of Products' },
  { id: 'transactions', key: 'Number of Transactions' }
];

const BusinessModal = props => {
  const { open, user, handleClose } = props;
  const classes = useStyles();

  let displayedFields = stringFields.map(field => ({
    ...field,
    value: user[field.id]
  }));
  arrayFields.forEach(field => {
    const value = user[field.id] ? user[field.id].length : 0;
    displayedFields.push({ ...field, value });
  });

  return (
    <Modal
      aria-labelledby="title"
      open={open}
      onClose={handleClose}
      className={classes.modal}
    >
      <div className={classes.paper}>
        <div className={classes.topBar}>
          <div className={classes.left}>
            <Typography variant={'h4'} aria-label="title">
              {user.business_name}
            </Typography>
          </div>
          <div className={classes.right}>
            <Button
              color="primary"
              component={Link}
              to={`/details`}
              onClick={() => sessionStorage.setItem('businessId', user.id)}
            >
              More details
            </Button>
          </div>
        </div>
        <div style={{ clear: 'both' }} />
        <Table className={classes.table} aria-label="table">
          <TableBody>
            {displayedFields.map(field => (
              <TableRow key={field.id}>
                <TableCell>{field.key}</TableCell>
                <TableCell align="right">{field.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Modal>
  );
};

export default BusinessModal;
