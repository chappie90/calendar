import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import calendarReducer from "./calendarReducer";
import reminderReducer from "./reminderReducer";

export default combineReducers({
	calendar: calendarReducer,
	form: formReducer,
	reminders: reminderReducer
});
