const checkFriday = () => {
  let date = new Date();
  let friday = false;
  if (date.getDay() === 5 && date.getHours() === 17) {
    friday = true;
  }
  return friday;
};

module.exports = { checkFriday };
