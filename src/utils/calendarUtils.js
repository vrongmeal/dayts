/**
 * checks if year is leap or not
 *
 * @param {Number} year
 *
 * @returns {Boolean}
 */
export const isLeap = year => {
  if (year % 4 !== 0) return false;
  else if (year % 100 !== 0) return true;
  else if (year % 400 !== 0) return false;
  else return true;
}

/**
 * get Number of days in a month
 *
 * @param {Number} month
 * @param {Number} year to check if leap year
 *
 * @returns {Number}
 */
export const getNumDaysInMonth = (month, year) => {
  switch (month) {
    case 1: return 31;
    case 2:
      if (isLeap(year)) return 29;
      else return 28;
    case 3: return 31;
    case 4: return 30;
    case 5: return 31;
    case 6: return 30;
    case 7: return 31;
    case 8: return 31;
    case 9: return 30;
    case 10: return 31;
    case 11: return 30;
    case 12: return 31;
    default: return 0;
  }
}

/**
 * get day of month
 *
 * @param {Number} date
 * @param {Number} month
 * @param {Number} year > 1752
 *
 * @returns {Number} as
 * 0: sunday
 * 1: monday ...
 */
export const getDayOfMonth = (date, month, year) => {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  year -= month < 3 ? month : 0;
  return (
    (year + Math.floor(year / 4) - Math.floor(year / 100) +
    Math.floor(year / 400) + t[month - 1] + date) % 7
  );
}

/**
 * Checks if current date is valid or not
 *
 * @param {Number} date
 * @param {Number} month
 * @param {Number} year
 *
 * @returns {Boolean}
 */
export const isValidDate = (date, month, year) => {
  if (year < 1753) return false;
  else if (month < 1 || month > 12) return false;
  else if (date < 1 || date > getNumDaysInMonth(month, year)) return false;
  return true;
}

/**
 * Returns name of month
 *
 * @param {Number} month
 *
 * @returns {String}
 */
export const nameOfMonth = month => {
  switch(month) {
    case 1: return "january";
    case 2: return "february";
    case 3: return "march";
    case 4: return "april";
    case 5: return "may";
    case 6: return "june";
    case 7: return "july";
    case 8: return "august";
    case 9: return "september";
    case 10: return "october";
    case 11: return "november";
    case 12: return "december";
    default: return "invalid month";
  }
};


/**
 * Returns previous month
 * 
 * @param {Number} month
 * @param {Number} year
 * 
 * @returns {Array}
 * [date, month, year]
 */
export const previousMonth = (date, month, year) => {
  let ans = [date, month, year];
  if (month === 1) {
    ans[1] = 12;
    ans[2] = year - 1;
  } else ans[1] = month - 1;
  if (date > getNumDaysInMonth(ans[1])) ans[0] = getNumDaysInMonth(ans[1]);
  return ans;
};

/**
 * Returns Next month
 * 
 * @param {Number} month
 * @param {Number} year
 * 
 * @returns {Array}
 * [date, month, year]
 */
export const nextMonth = (date, month, year) => {
  let ans = [date, month, year];
  if (month === 12) {
    ans[1] = 1;
    ans[2] = year + 1;
  } else ans[1] = month + 1;
  if (date > getNumDaysInMonth(ans[1])) ans[0] = getNumDaysInMonth(ans[1]);
  return ans;
};
