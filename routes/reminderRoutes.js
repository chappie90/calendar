const mongoose = require("mongoose");
const keys = require("../config/keys");

const Reminder = mongoose.model("reminders");

module.exports = app => {
	app.get("/reminders", async (req, res) => {
		const reminder = await Reminder.find();
		res.send(reminder);
	});
	app.get("/reminders/create", async (req, res) => {
		const reminder = await new Reminder({
			date: "04-06-2019",
			time: "11:00",
			reminder: "Hey ho",
			priority: "Low",
			id: 5
		}).save();
		res.send(reminder);
	});
};
