import initialState from "./initialState";
import * as actionTypes from "../constants/actionTypes";

const calendarReducer = (state=initialState.calendar, action) => {
  switch (action.type) {
    case actionTypes.SET_DATE:
      return Object.assign({}, state, { date: action.value });
    case actionTypes.SET_MONTH:
      return Object.assign({}, state, { month: action.value });
    case actionTypes.SET_YEAR:
      return Object.assign({}, state, { year: action.value });
    default:
      return state
  }
};

export default calendarReducer;
