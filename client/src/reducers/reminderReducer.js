import _ from "lodash";

export default (state = {}, action) => {
	switch (action.type) {
		case "FETCH_REMINDERS":
			return { ...state, ..._.mapKeys(action.payload, "_id") };
		case "CREATE_REMINDER":
			return { ...state, [action.payload.id]: action.payload };
		case "EDIT_REMINDER":
			return { ...state, [action.payload.id]: action.payload };
		case "DELETE_REMINDER":
			return _.omit(state, action.payload);
		default:
			return state;
	}
};
