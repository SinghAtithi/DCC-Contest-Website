const calculateCurrDays = () => {
  const target = new Date(2023, 9, 17);
  const todayIstMil =
    new Date().getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
  const todayIst = new Date(todayIstMil);
  const diff = Math.floor((todayIst - target) / (1000 * 60 * 60 * 24));
  // console.log(diff);
  return diff;
};

module.exports = calculateCurrDays;
