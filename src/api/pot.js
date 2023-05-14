const { tokensGetTokenTransfers } = require('@tzkt/sdk-api');
const { config } = require('../config');
const { reduceWagers, sortWagers } = require('../util/wagers');

const getBurned = async (timestamp) => {
  const limit = 10000;
  const fields = [
    'amount',
  ];

  const { burnAmount } = config.parameters;
  const { burner: burnContract, token: tokenContract, pot: potContract } = config.contracts;

  const res = await tokensGetTokenTransfers({
    token: {
      contract: {
        eq: tokenContract,
      },
    },
    to: {
      eq: burnContract,
    },
    $from: {
      eq: potContract,
    },
    timestamp: {
      gt: timestamp,
    },
    select: {
      fields,
    },
    limit,
  });

  return (res.length) * burnAmount;
};

const getPot = async (timestamp) => {
  const contract = 'KT1MZg99PxMDEENwB4Fi64xkqAVh5d1rv8Z9';
  const limit = 10000;
  const fields = [
    'from.address',
  ];

  const { betAmount } = config.parameters;

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
    amount: {
      eq: 250000,
    },
    limit,
    select: {
      fields,
    },
  });

  const totalBurned = await getBurned(timestamp);

  const wagers = reduceWagers(res, betAmount);
  const sorted = sortWagers(wagers);

  return { totalBurned, wagers: sorted };
};

module.exports = {
  getPot,
  getBurned,
};
