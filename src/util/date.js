const getStartOfDay = () => {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  return startOfDay;
};

module.exports = {
  getStartOfDay,
};
