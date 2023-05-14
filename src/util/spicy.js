const calculateDayAgg = () => {
  const aggStart = new Date();
  aggStart.setDate(aggStart.getDate() - 7);
  return Math.floor(aggStart.getTime() / 1000);
};

module.exports = {
  calculateDayAgg,
};
