const mongoose = require("mongoose");
const keys = require("../config/keys");

const Reminder = mongoose.model("reminders");

module.exports = app => {
	app.get("/reminders", async (req, res) => {
		const reminder = await Reminder.find();
		res.send(reminder);
	});
	app.post("/reminders/create", async (req, res) => {
		const reminder = await new Reminder({
			date: req.body.date,
			time: req.body.time,
			reminder: req.body.reminder,
			priority: req.body.priority
		}).save();
		res.send();
	});
	app.patch("/reminders/edit/:id", async (req, res) => {
		const reminder = await Reminder.findByIdAndUpdate(req.params.id, {
			$set: req.body
		});
		res.send();
	});
	app.delete("/reminders/delete/:id", async (req, res) => {
		const reminder = await Reminder.findByIdAndRemove(req.params.id);
		res.send();
	});
};
