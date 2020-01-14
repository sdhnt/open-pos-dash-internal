import moment from 'moment';

const filterTransactionsByDay = (transactions, day) => {
  return transactions.filter(
    transaction =>
      moment(transaction.datetime).isSameOrAfter(moment(day).startOf('day')) &&
      moment(transaction.datetime).isBefore(
        moment(day)
          .add(1, 'day')
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
  return Math.round((totalSales / performances.length) * 100) / 100;
};

export const getAnnualPerformance = transactions => {
  const annualPerformance = [];
  for (let i = 11; i >= 0; i--) {
    const month = moment()
      .subtract(i, 'month')
      .startOf('month');
    const filteredTransactions = filterTransactionsByMonth(transactions, month);
    const thisMonthPerformance = getBusinessPerformance(filteredTransactions);
    thisMonthPerformance.month = month.format('MMM');
    annualPerformance.push(thisMonthPerformance);
  }
  return annualPerformance;
};

export const getMonthlyPerformance = (transactions, month) => {
  const monthlyPerformance = [];
  const length = moment(month).daysInMonth();
  for (let i = 0; i < length; i++) {
    const day = moment(month)
      .startOf('month')
      .add(i, 'day');
    const transactionsThisDay = filterTransactionsByDay(transactions, day);
    if (day.isBefore(moment().startOf('day'))) {
      const businessPerformance = getBusinessPerformance(transactionsThisDay);
      businessPerformance.date = day.format('D');
      monthlyPerformance.push(businessPerformance);
    }
  }
  return monthlyPerformance;
};

export const getPerformanceByDays = (performances, days) => {
  const filteredPerformances = performances.slice(
    performances.length - days - 1
  );
  filteredPerformances.pop();
  let date = moment()
    .subtract(days + 1, 'day')
    .startOf('day');
  filteredPerformances.forEach(performance => {
    performance.date = date.format('D');
    date = date.add(1, 'day');
  });
  return filteredPerformances;
};

export const getProductData = (products, marginTypes) => {
  return marginTypes.map(marginType => {
    let totalSaleValue = 0;
    let profitMargins = 0;
    let totalInventoryValue = 0;
    let countedProducts = 0;
    products.forEach(product => {
      const price = Number(product[marginType.priceType]);
      const cost = Number(product.cost);
      const quantity = Number(product.stock_qty);
      if (!isNaN(price) && !isNaN(cost) && !isNaN(quantity) && price > cost) {
        const saleValue = price - cost;
        totalSaleValue += saleValue;
        profitMargins += saleValue / price;
        totalInventoryValue += price * quantity;
        countedProducts++;
      }
    });
    return {
      ...marginType,
      averageSaleValue:
        countedProducts !== 0
          ? Math.round((totalSaleValue / countedProducts) * 100) / 100
          : 0,
      margin:
        countedProducts !== 0
          ? Math.round((profitMargins / countedProducts) * 1000) / 10
          : 0,
      totalInventoryValue,
      countedProducts
    };
  });
};

export const getOrderData = (transactions, period) => {
  const monthlyData = [];
  for (let i = period - 1; i >= 0; i--) {
    const month = moment()
      .subtract(i, 'month')
      .startOf('month');
    const filteredTransactions = filterTransactionsByMonth(transactions, month);
    let total = 0;
    let largest = 0;
    let orderCount = 0;
    filteredTransactions.forEach(transaction => {
      const transactionAmount = transaction.totalatax;
      if (
        transactionAmount < 0 &&
        transaction.itemslist.length > 0 &&
        transaction.itemslist[0].code !== 'EXPENSE'
      ) {
        total += transactionAmount;
        largest = transactionAmount < largest ? transactionAmount : largest;
        orderCount++;
      }
    });
    monthlyData.push({
      month: month.toDate(),
      total: -1 * total,
      average:
        orderCount !== 0
          ? (-1 * Math.round((total / orderCount) * 100)) / 100
          : 0,
      largest: -1 * largest,
      orderCount
    });
  }
  return monthlyData;
};
