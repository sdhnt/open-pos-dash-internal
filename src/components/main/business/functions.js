import moment from 'moment';

const filterTransactionsByDays = (transactions, days) => {
  return transactions.filter(transaction =>
    moment(transaction.datetime).isSameOrAfter(
      moment()
        .subtract(days, 'day')
        .startOf('day')
    )
  );
};

export const filterTransactionsByMonth = (transactions, month) => {
  return transactions.filter(
    transaction =>
      moment(transaction.datetime).isSameOrAfter(
        moment(month).startOf('month')
      ) &&
      moment(transaction.datetime).isBefore(
        moment(month)
          .startOf('month')
          .add(1, 'month')
      )
  );
};

export const getBusinessPerformance = transactions => {
  const performance = { revenue: 0, profit: 0, expenses: 0 };
  transactions.forEach(transaction => {
    const transactionAmount = transaction.totalatax;
    if (transactionAmount > 0) {
      performance.revenue += transactionAmount;
      let transactionCost = 0;
      if (transaction.itemslist)
        transaction.itemslist.forEach(item => {
          const cost = Number(item.cost);
          const qty = Number(item.qty);
          if (!isNaN(cost) && !isNaN(qty)) transactionCost += cost * qty;
        });
      performance.profit += transactionAmount - transactionCost;
    } else performance.expenses += transactionAmount;
  });
  return performance;
};

export const getAverageSales = performances => {
  let totalSales = 0;
  performances.forEach(performance => {
    const amount = performance.revenue;
    if (amount > 0) totalSales += amount;
  });
  return Math.round((totalSales / 30) * 100) / 100;
};

export const getMonthlyPerformance = transactions => {
  const monthlyPerformance = [];
  for (let i = 11; i >= 0; i--) {
    const month = moment()
      .subtract(i, 'month')
      .startOf('month');
    const thisMonthPerformance = getPerformanceByMonth(transactions, month);
    thisMonthPerformance.month = month.toDate();
    monthlyPerformance.push(thisMonthPerformance);
  }
  return monthlyPerformance;
};

export const getPerformanceByDays = (performances, days) => {
  return performances.slice(performances.length - days);
};

export const getPerformanceByMonth = (transactions, month) => {
  const filteredTransactions = filterTransactionsByMonth(transactions, month);
  return getBusinessPerformance(filteredTransactions);
};

export const getProfitMargins = (products, { priceType }) => {
  let profitMargins = 0;
  let countedProducts = 0;
  products.forEach(product => {
    const price = Number(product[priceType]);
    const cost = Number(product.cost);
    if (!isNaN(price) && !isNaN(cost) && price > cost) {
      profitMargins += (price - cost) / price;
      countedProducts++;
    }
  });
  return {
    margin: Math.round((profitMargins / countedProducts) * 1000) / 1000,
    countedProducts
  };
};
