import * as actionTypes from "../constants/actionTypes";

export const setDate = value => ({
  type: actionTypes.SET_DATE,
  value
});

export const setMonth = value => ({
  type: actionTypes.SET_MONTH,
  value
});

export const setYear = value => ({
  type: actionTypes.SET_YEAR,
  value
});
