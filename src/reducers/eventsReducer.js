import initialState from "./initialState";
import * as actionTypes from "../constants/actionTypes";

const eventsReducer = (state = initialState.events, action) => {
  switch (action.type) {
    case actionTypes.CREATE_EVENT:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          date: action.date,
          month: action.month,
          year: action.year
        }
      ];
    case actionTypes.DELETE_EVENT:
      return state.filter(event => action.id != event.id);
    default:
      return state;
  }
};

export default eventsReducer;
