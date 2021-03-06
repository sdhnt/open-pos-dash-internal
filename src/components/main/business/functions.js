import moment from 'moment';
import { expenseCategories, periods } from './constants';

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
    const transactionAmount = Number(transaction.totalatax);
    if (isNaN(transactionAmount)) return;
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
  Object.entries(performance).forEach(([key, value]) => {
    performance[key] = Math.round(value);
  });
  return performance;
};

export const getAverageSales = data => {
  let totalSales = 0;
  data.forEach(dailyData => {
    const amount = dailyData.Revenue;
    if (amount > 0) totalSales += amount;
  });
  return Math.round((totalSales / data.length) * 100) / 100;
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

export const getPerformanceData = transactions => {
  const callback = (transactionsThisDay, day) => {
    const rawPerformance = getBusinessPerformance(transactionsThisDay);
    const performance = {
      Revenue: rawPerformance.revenue,
      Profit: rawPerformance.profit,
      Expenses: -1 * rawPerformance.expenses
    };
    return { date: moment(day).format('D'), ...performance };
  };
  return getDataOverPeriod(transactions, callback);
};

export const getCashFlowData = transactions => {
  const inOrderCallback = (transactionsThisDay, day) => {
    const rawPerformance = getBusinessPerformance(transactionsThisDay);
    const performance = {
      ...rawPerformance,
      expenses: -1 * rawPerformance.expenses
    };
    return { date: moment(day).format('D'), ...performance };
  };
  const postOrderCallback = data => {
    return data.map((periodData, periodIndex) => {
      let totalRevenue = 0;
      let totalExpenses = 0;
      periodData.data.forEach(dateData => {
        totalRevenue += dateData.revenue;
        totalExpenses += dateData.expenses;
      });
      return {
        period: periods[periodIndex],
        netCashFlow: totalRevenue - totalExpenses
      };
    });
  };
  return getDataOverPeriod(transactions, inOrderCallback, postOrderCallback);
};

export const getExpensesData = transactions => {
  const inOrderCallback = (transactionsThisDay, day) => {
    const data = {};
    expenseCategories.forEach(category => {
      data[category] = 0;
    });
    transactionsThisDay.forEach(transaction => {
      const transactionAmount = Number(transaction.totalatax);
      if (isNaN(transactionAmount)) return;
      if (
        transactionAmount < 0 &&
        transaction.itemslist.length &&
        transaction.itemslist[0].code === 'EXPENSE'
      ) {
        transaction.itemslist.forEach(item => {
          data[item.cat] += -1 * Number(item.price);
        });
      }
    });
    data.date = moment(day).format('D');
    return data;
  };
  const postOrderCallback = rawData => {
    const periods = [
      'sevenDays',
      'thirtyDays',
      'thisMonth',
      'lastMonth',
      'threeMonths',
      'sixMonths'
    ];
    const nullPeriodData = {};
    periods.forEach(period => {
      nullPeriodData[period] = 0;
    });
    const data = expenseCategories
      .concat(['Daily average', 'Total over period'])
      .map(category => ({
        category,
        ...nullPeriodData
      }));
    rawData.forEach((periodData, index) => {
      const period = periods[index];
      periodData.data.forEach(dateData => {
        Object.entries(dateData).forEach(([key, value]) => {
          if (expenseCategories.includes(key)) {
            const categoryData = data.find(element => element.category === key);
            categoryData[period] += value;
            data[data.length - 1][period] += value;
          }
        });
      });
      data[data.length - 2][period] = Math.round(
        data[data.length - 1][period] / periodData.data.length
      );
    });
    return data;
  };
  return getDataOverPeriod(transactions, inOrderCallback, postOrderCallback);
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
      month: month.format('MMM'),
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

export const getInventoryTransactionsData = transactions => {
  const callback = (transactionsThisDay, day) => {
    let totalOrderAmount = 0;
    transactionsThisDay.forEach(transaction => {
      const transactionAmount = Number(transaction.totalatax);
      if (isNaN(transactionAmount)) return;
      if (
        transactionAmount < 0 &&
        transaction.itemslist.length > 0 &&
        transaction.itemslist[0].code !== 'EXPENSE'
      )
        totalOrderAmount += transactionAmount;
    });
    return {
      date: moment(day).format('D'),
      totalOrderAmount: -1 * totalOrderAmount
    };
  };
  return getDataOverPeriod(transactions, callback);
};

const getDataOverPeriod = (
  transactions,
  inOrderCallback,
  postOrderCallback
) => {
  const daysLastMonth = moment()
    .subtract(1, 'month')
    .daysInMonth();
  const daysThisMonth = Number(moment().format('D'));
  let totalDays = daysThisMonth;
  for (let i = 1; i < 6; i++)
    totalDays += moment()
      .subtract(i, 'month')
      .daysInMonth();

  const rawData = [];
  for (let i = totalDays - 1; i > 0; i--) {
    const day = moment()
      .startOf('day')
      .subtract(i, 'day');
    const transactionsThisDay = filterTransactionsByDay(transactions, day);
    const element = inOrderCallback(transactionsThisDay, day);
    rawData.push(element);
  }

  const length = rawData.length;
  const periods = [
    { start: length - 7 },
    { start: length - 30 },
    { start: length - daysThisMonth + 1 },
    {
      start: length - daysThisMonth - daysLastMonth + 1,
      end: length - daysThisMonth + 1
    },
    {
      start:
        length -
        (daysThisMonth +
          daysLastMonth +
          moment()
            .subtract(2, 'month')
            .daysInMonth()) +
        1
    },
    {
      start: 0
    }
  ];
  const data = periods.map(({ start, end }) => ({
    data: rawData.slice(start, end)
  }));
  if (!postOrderCallback) return data;
  return postOrderCallback(data);
};
