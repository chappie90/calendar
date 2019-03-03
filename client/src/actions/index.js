import axios from "axios";
import history from "../history";

export const updateSelectedDate = selectedDate => {
	return {
		type: "UPDATE_SELECTED_DATE",
		payload: selectedDate
	};
};

export const updateSelectedReminder = reminder => {
	return {
		type: "UPDATE_SELECTED_REMINDER",
		payload: reminder
	};
};

export const fetchReminders = () => async dispatch => {
	const response = await axios.get("/reminders");
	dispatch({ type: "FETCH_REMINDERS", payload: response.data });
};

export const createReminder = formValues => async dispatch => {
	const response = await axios.post("/reminders/create", formValues);

	dispatch({ type: "CREATE_REMINDER", payload: response.data });
	history.push("/");
};

export const editReminder = (id, formValues) => async dispatch => {
	const response = await axios.patch(`/reminders/edit/${id}`, formValues);

	dispatch({ type: "EDIT_REMINDER", payload: response.data });
	history.push("/");
};

export const deleteReminder = id => async dispatch => {
	await axios.delete(`/reminders/delete/${id}`);

	dispatch({ type: "DELETE_REMINDER", payload: id });
};
