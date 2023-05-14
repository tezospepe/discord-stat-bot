const { truncateMiddle } = require('./address');

const wagersToTextList = (wagers) => {
  let list = '';

  wagers.slice(0, 25).forEach((degen, index) => {
    const user = degen[0];
    const stats = degen[1];

    const userAddress = truncateMiddle(user, 12);

    if (index === 0) {
      list += '👑 ';
    }

    list += userAddress;
    list += ` Bets: ${stats.bets}, Wagered: ${stats.amount}\n`;
  });

  return list;
};

const reduceWagers = (wagers, betAmount) => Object.entries(wagers.reduce((acc, curr) => {
  if (!acc[curr]) {
    acc[curr] = {
      bets: 1,
      amount: betAmount,
    };
  } else if (acc[curr]) {
    acc[curr] = {
      bets: acc[curr].bets + 1,
      amount: acc[curr].amount + betAmount,
    };
  }

  return acc;
}, {}));

const sortWagers = (wagers) => wagers.sort((a, b) => {
  if (a[1].amount > b[1].amount) {
    return -1;
  }

  if (a[1].amount < b[1].amount) {
    return 1;
  }

  return 0;
});

module.exports = {
  wagersToTextList,
  reduceWagers,
  sortWagers,
};
