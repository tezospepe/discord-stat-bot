const { tokensGetTokens } = require('@tzkt/sdk-api');

const getHolders = async () => {
  const contract = 'KT1MZg99PxMDEENwB4Fi64xkqAVh5d1rv8Z9';
  const tokenId = 0;
  const limit = 1;
  const fields = [
    'holdersCount',
  ];

  const res = await tokensGetTokens({
    contract: {
      eq: contract,
    },
    tokenId: {
      eq: tokenId,
    },
    limit,
    select: {
      fields,
    },
  });

  return res;
};

module.exports = {
  getHolders,
};
