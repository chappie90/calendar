import React from "react";
import ReactDOM from "react-dom";
import dateFns from "date-fns";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	fetchReminders,
	updateSelectedReminder,
	deleteReminder
} from "../actions";

class RemindersListModal extends React.Component {
	componentDidMount() {
		this.props.fetchReminders();
	}

	updateSelectedReminder = reminder => {
		this.props.updateSelectedReminder(reminder);
	};

	renderReminders(day) {
		return this.props.reminders
			.filter(reminder => {
				return dateFns.format(reminder.date, "D MMM") === day;
			})
			.sort((a, b) => parseInt(a.time) - parseInt(b.time))
			.map(dayReminder => {
				const { _id, time, reminder, priority } = dayReminder;
				return (
					<div
						onClick={() => this.updateSelectedReminder(dayReminder)}
						className="item"
						key={_id}
					>
						<span
							className={`reminder-label pointer ui large ${priority} label`}
						>
							{time} {reminder}
						</span>
					</div>
				);
			});
	}

	deleteReminder(id) {
		this.props.deleteReminder(id);
		this.props.updateSelectedReminder(null);
	}

	render() {
		return ReactDOM.createPortal(
			<div
				onClick={this.props.onDismiss}
				className="ui page dimmer modals visible active"
			>
				<div
					onClick={e => e.stopPropagation()}
					className="ui standard small modal visible active"
				>
					<div className="content">
						<div className="ui stackable grid">
							<div className="seven wide column">
								<div className="ui list">
									{this.renderReminders(
										dateFns.format(
											this.props.selectedDate,
											"D MMM"
										)
									)}
								</div>
							</div>
							<div className="nine wide column">
								{this.props.selectedReminder ? (
									<div>
										<div className="ui header">
											{dateFns.format(
												this.props.selectedReminder
													.date,
												"D MMM YYYY"
											)}{" "}
											- {this.props.selectedReminder.time}
										</div>
										<div className="ui header">
											{
												this.props.selectedReminder
													.reminder
											}
										</div>
										<div className="ui two bottom attached buttons">
											<Link
												to={`/reminders/edit/${
													this.props.selectedReminder
														._id
												}`}
												className="ui button primary"
											>
												<i className="edit icon" /> Edit
											</Link>
											<button
												onClick={() =>
													this.deleteReminder(
														this.props
															.selectedReminder
															._id
													)
												}
												className="ui button negative"
											>
												<i className="trash alternate icon" />{" "}
												Delete
											</button>
										</div>
									</div>
								) : (
									<div className="ui header">
										No reminder selected
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>,
			document.querySelector("#modal")
		);
	}
}

const mapStateToProps = state => {
	return {
		reminders: Object.values(state.reminders),
		selectedDate: state.calendar.selectedDate,
		selectedReminder: state.calendar.selectedReminder
	};
};

export default connect(
	mapStateToProps,
	{ fetchReminders, updateSelectedReminder, deleteReminder }
)(RemindersListModal);
