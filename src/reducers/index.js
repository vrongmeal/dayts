import { combineReducers } from "redux";
import calendar from "./calendarReducer";
import events from "./eventsReducer";

const rootReducer = combineReducers({
  calendar,
  events
});

export default rootReducer;
