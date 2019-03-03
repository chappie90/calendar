const mongoose = require("mongoose");
const { Schema } = mongoose;

const reminderSchema = new Schema({
	date: String,
	time: String,
	reminder: String,
	priority: String,
	id: Number
});

mongoose.model("reminders", reminderSchema);
