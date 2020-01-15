import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from './Table';

const CashFlow = props => {
  const { data } = props;

  return (
    <>
      <Typography variant={'h6'}>Net cash flow</Typography>
      <Table
        headers={[
          {
            key: 'period',
            text: 'Period'
          },
          {
            key: 'netCashFlow',
            text: 'Net cash flow'
          }
        ]}
        rows={data}
      />
    </>
  );
};

export default CashFlow;
