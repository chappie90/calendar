const INITIAL_STATE = {
	selectedDate: new Date(),
	selectedReminder: null
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case 'UPDATE_SELECTED_DATE':
			return { ...state, selectedDate: action.payload };
		case 'UPDATE_SELECTED_REMINDER':
			return { ...state, selectedReminder: action.payload }
	default:
		return state;
	}
};