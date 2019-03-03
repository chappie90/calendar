import React from "react";
import { connect } from "react-redux";
import dateFns from "date-fns";
import { Link } from "react-router-dom";
import { createReminder, updateSelectedDate } from "../../actions";
import ReminderForm from "./ReminderForm";

class CreateReminder extends React.Component {
	onSubmit = formValues => {
		this.props.createReminder(formValues);
	};

	render() {
		return (
			<div>
				<br />
				<Link to="/" className="ui header">
					<i className="home icon" />
				</Link>
				<div className="ui center aligned large header">
					Create a Reminder
				</div>
				<ReminderForm
					initialValues={{
						date: dateFns.format(new Date(), "YYYY-MM-DD")
					}}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

export default connect(
	mapStateToProps,
	{ createReminder, updateSelectedDate }
)(CreateReminder);
