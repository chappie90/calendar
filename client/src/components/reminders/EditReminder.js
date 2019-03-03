import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editReminder, updateSelectedReminder } from "../../actions";
import ReminderForm from "./ReminderForm";

class EditReminder extends React.Component {
	onSubmit = formValues => {
		this.props.editReminder(this.props.selectedReminder._id, formValues);
	};

	render() {
		return (
			<div>
				<br />
				<Link
					onClick={() => this.props.updateSelectedReminder(null)}
					to="/"
					className="ui header"
				>
					<i className="home icon" />
				</Link>
				<div className="ui center aligned large header">
					Edit a Reminder
				</div>
				<ReminderForm
					initialValues={_.pick(
						this.props.selectedReminder,
						"date",
						"time",
						"reminder",
						"priority"
					)}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		selectedReminder: state.calendar.selectedReminder
	};
};

export default connect(
	mapStateToProps,
	{ editReminder, updateSelectedReminder }
)(EditReminder);
