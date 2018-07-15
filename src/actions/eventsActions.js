import * as actionTypes from "../constants/actionTypes";

let index = 0;

export const createEvent = (title, date, month, year) => ({
  type: actionTypes.CREATE_EVENT,
  id: index++,
  title,
  date,
  month,
  year
});

export const deleteEvent = id => ({
  type: actionTypes.DELETE_EVENT,
  id
});
