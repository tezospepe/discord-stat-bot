const { tokensGetTokenTransfers } = require('@tzkt/sdk-api');
const { config } = require('../config');
const { reduceWagers, sortWagers } = require('../util/wagers');

const getPot = async (timestamp) => {
  const contract = 'KT1MZg99PxMDEENwB4Fi64xkqAVh5d1rv8Z9';
  const limit = 1000;
  const fields = [
    'from.address',
  ];

  const { betAmount, burnAmount } = config.parameters;

  const res = await tokensGetTokenTransfers({
    token: {
      contract: {
        eq: contract,
      },
    },
    to: {
      eq: 'KT1PL7hfBVCvWn5bHJnxRUaixGJWD8UxYw2W',
    },
    timestamp: {
      gt: timestamp,
    },
    limit,
    select: {
      fields,
    },
  });

  const totalBurned = res.length * burnAmount;

  const wagers = reduceWagers(res, betAmount);
  const sorted = sortWagers(wagers);

  return { totalBurned, wagers: sorted };
};

module.exports = {
  getPot,
};
