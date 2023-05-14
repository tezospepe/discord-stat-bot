const { contractsGetStorage } = require('@tzkt/sdk-api');
const { config } = require('../config');

const getWtzRatio = async () => {
  const { wtz: wtzContract } = config.contracts;

  const res = await contractsGetStorage(wtzContract);
  const text = await res.text();
  const json = JSON.parse(text);

  const swapRatio = Number(json.swapRatio) / 10 ** 18;

  return swapRatio;
};

module.exports = {
  getWtzRatio,
};
