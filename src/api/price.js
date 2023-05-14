const { calculateDayAgg } = require('../util/spicy');
const { getWtzRatio } = require('./wtz');

const SPICY_API_URL = 'https://spicyb.sdaotools.xyz/api/rest';

const getPrice = async () => {
  const tag = 'KT1MZg99PxMDEENwB4Fi64xkqAVh5d1rv8Z9:0';
  const req = `/TokenList?_ilike=${tag}&day_agg_start=${calculateDayAgg()}`;

  const wtzRatio = await getWtzRatio();
  const res = await fetch(`${SPICY_API_URL}${req}`);
  const data = await res.json();

  const derivedXtz = data.tokens[0].derivedxtz / wtzRatio;
  return derivedXtz.toFixed(6);
};

module.exports = {
  getPrice,
};
