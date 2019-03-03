import React from "react";
import dateFns from "date-fns";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReminderModal from "./ReminderModal";
import RemindersListModal from "./RemindersListModal";
import {
	fetchReminders,
	updateSelectedReminder,
	updateSelectedDate,
	deleteReminder
} from "../actions";
import "./Calendar.css";

class Calendar extends React.Component {
	state = {
		currentMonth: new Date(),
		selectedDate: new Date(),
		selectedListDate: new Date(),
		showReminderModal: false,
		showRemindersListModal: false
	};

	componentDidMount() {
		this.props.fetchReminders();
	}

	renderHeader() {
		return (
			<div>
				<br />
				<div className="flex ui huge header">
					<i
						onClick={this.prevMonth}
						className="mini pointer chevron left icon"
					/>
					<span>
						{dateFns.format(this.state.currentMonth, "MMMM YYYY")}
					</span>
					<i
						onClick={this.nextMonth}
						className="mini pointer chevron right icon"
					/>
				</div>
			</div>
		);
	}

	renderDays() {
		const days = [];

		let startDate = dateFns.startOfWeek(this.state.currentMonth);

		for (let i = 0; i < 7; i++) {
			days.push(
				<th key={i}>
					{dateFns.format(dateFns.addDays(startDate, i), "dddd")}
				</th>
			);
		}

		return (
			<thead>
				<tr>{days}</tr>
			</thead>
		);
	}

	renderReminders(day) {
		return this.props.reminders
			.filter(reminder => {
				return dateFns.format(reminder.date, "D MMM") === day;
			})
			.sort((a, b) => parseInt(a.time) - parseInt(b.time))
			.map(dayReminder => {
				return (
					<div
						onClick={() => this.toggleReminder(dayReminder)}
						className="item"
						key={dayReminder._id}
					>
						<span
							className={`reminder-label pointer ui ${
								dayReminder.priority
							} label`}
						>
							{dayReminder.time} {dayReminder.reminder}
						</span>
					</div>
				);
			});
	}

	renderCells() {
		const { currentMonth, selectedDate } = this.state;
		const monthStart = dateFns.startOfMonth(currentMonth);
		const monthEnd = dateFns.endOfMonth(currentMonth);
		const startDate = dateFns.startOfWeek(monthStart);
		const endDate = dateFns.endOfWeek(monthEnd);

		const rows = [];

		let days = [];
		let day = startDate;
		let formattedDate = "";
		let filterDate = "";

		while (day <= endDate) {
			for (let i = 0; i < 7; i++) {
				formattedDate = dateFns.format(day, "D");
				filterDate = dateFns.format(day, "D MMM");
				const cloneDay = day;

				days.push(
					<td
						className={
							!dateFns.isSameMonth(day, monthStart)
								? "disabled"
								: dateFns.isSameDay(day, selectedDate)
								? "active"
								: ""
						}
						onClick={() =>
							this.onDateClick(dateFns.parse(cloneDay))
						}
						key={day}
					>
						<div style={{ height: "85px" }}>
							<div className="flex" style={{ height: "65px" }}>
								<div style={{ width: "20%" }}>
									{formattedDate}
								</div>
								<div
									className="reminders-list ui list"
									style={{
										overflowY: "hidden",
										width: "80%",
										margin: "0"
									}}
								>
									{this.renderReminders(filterDate)}
								</div>
							</div>
							{this.renderReminders(filterDate).length - 3 >=
							0 ? (
								<div
									onClick={() =>
										this.toggleRemindersList(cloneDay)
									}
									className="pointer"
								>
									{`${this.renderReminders(filterDate)
										.length - 2} more `}
									<i
										className={`angle ${
											this.state.showRemindersListModal
												? "up"
												: "down"
										} icon`}
									/>
								</div>
							) : (
								""
							)}
						</div>
					</td>
				);
				day = dateFns.addDays(day, 1);
			}
			rows.push(<tr key={day}>{days}</tr>);
			days = [];
		}
		return <tbody>{rows}</tbody>;
	}
	onDateClick = day => {
		this.setState({ selectedDate: day });
	};

	nextMonth = () => {
		this.setState({
			currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
		});
	};

	prevMonth = () => {
		this.setState({
			currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
		});
	};

	updateSelectedDate = () => {
		this.props.updateSelectedDate(this.state.selectedDate);
	};

	toggleRemindersList = day => {
		this.props.updateSelectedDate(day);
		this.setState({
			showRemindersListModal: !this.state.showRemindersListModal
		});
	};

	toggleReminder = reminder => {
		this.setState({ showReminderModal: !this.state.showReminderModal });
		this.props.updateSelectedReminder(reminder);
	};

	renderReminderContent() {
		return (
			<div className="flex" style={{ alignItems: "center" }}>
				<div
					onClick={() => this.setState({ showReminderModal: false })}
					className="pointer ui big right corner label"
				>
					<i className="close black icon" />
				</div>
				<i
					className={`calendar center check massive ${
						this.props.selectedReminder.priority
							? this.props.selectedReminder.priority
							: "grey"
					} icon`}
				/>
				<div>
					<div className="ui header">
						{dateFns.format(
							this.props.selectedReminder.date,
							"D MMM YYYY"
						)}{" "}
						- {this.props.selectedReminder.time}
					</div>
					<div className="ui header">
						{this.props.selectedReminder.reminder}
					</div>
				</div>
			</div>
		);
	}

	renderReminderActions() {
		return (
			<div className="ui two bottom attached buttons">
				<Link
					to={`/reminders/edit/${this.props.selectedReminder._id}`}
					className="ui button primary"
				>
					<i className="edit icon" /> Edit
				</Link>
				<button
					onClick={() =>
						this.deleteReminder(this.props.selectedReminder._id)
					}
					className="ui button negative"
				>
					<i className="trash alternate icon" /> Delete
				</button>
			</div>
		);
	}

	deleteReminder(id) {
		this.props.deleteReminder(id);
		this.setState({ showReminderModal: false });
		this.props.updateSelectedReminder(null);
	}

	onDismiss() {
		this.setState({
			showReminderModal: false,
			showRemindersListModal: false
		});
		this.props.updateSelectedReminder(null);
	}

	render() {
		return (
			<div className="calendar">
				{this.renderHeader()}
				<Link
					to="/reminders/new/"
					onClick={this.updateSelectedDate}
					className={`ui button primary ${this.state.disableButton}`}
				>
					New Reminder
				</Link>
				<table className="ui fixed celled table">
					{this.renderDays()}
					{this.renderCells()}
				</table>
				{this.state.showReminderModal ? (
					<ReminderModal
						content={this.renderReminderContent()}
						actions={this.renderReminderActions()}
						onDismiss={() => this.onDismiss()}
					/>
				) : (
					<div />
				)}
				{this.state.showRemindersListModal ? (
					<RemindersListModal onDismiss={() => this.onDismiss()} />
				) : (
					<div />
				)}
			</div>
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
	{
		fetchReminders,
		updateSelectedReminder,
		updateSelectedDate,
		deleteReminder
	}
)(Calendar);
