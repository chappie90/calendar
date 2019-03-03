import React from "react";
import { Field, reduxForm } from "redux-form";
import dateFns from "date-fns";

class ReminderForm extends React.Component {
	state = { editDate: this.props.initialValues.date };

	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderTextInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" maxLength="30" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderDateInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input
					{...input}
					value={this.state.editDate}
					type="date"
					min={dateFns.format(new Date(), "YYYY-MM-DD")}
				/>
				{this.renderError(meta)}
			</div>
		);
	};

	renderSelectTime = ({ input, label, meta }) => {
		const time = [];

		for (let i = 0; i < 24; i++) {
			if (i < 10) {
				time.push(
					<option key={i} value={`0${i}:00`}>
						0{i}:00
					</option>
				);
			} else {
				time.push(
					<option key={i} value={`${i}:00`}>
						{i}:00
					</option>
				);
			}
		}

		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<select {...input}>
					<option />
					{time}
				</select>
				{this.renderError(meta)}
			</div>
		);
	};

	onInputChange = event => {
		this.setState({ editDate: event.target.value });
	};

	onSubmit = formValues => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				className="ui form"
			>
				<Field
					onChange={this.onInputChange}
					name="date"
					component={this.renderDateInput}
					label="Select date"
				/>
				<br />
				<Field
					name="time"
					component={this.renderSelectTime}
					label="Select time"
				/>
				<br />
				<Field
					name="reminder"
					component={this.renderTextInput}
					label="Enter reminder"
				/>
				<br />
				{/* Could also use html input type color */}
				<div className="field">
					<label>Select priority level</label>
					<Field name="priority" component="select">
						<option />
						<option value="green">Low</option>
						<option value="yellow">Medium</option>
						<option value="red">High</option>
					</Field>
				</div>
				<br />
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = formValues => {
	const errors = {};

	if (!formValues.reminder) {
		errors.reminder = "You must enter a reminder";
	}

	if (!formValues.time) {
		errors.time = "You must select a time";
	}

	if (!formValues.date) {
		errors.date = "You must select a date";
	}

	return errors;
};

export default reduxForm({ form: "ReminderForm", validate })(ReminderForm);
