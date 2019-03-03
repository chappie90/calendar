const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/Reminder");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

require("./routes/reminderRoutes")(app);

if (process.env.NODE_ENV === "production") {
	// Express will serve production assets, e.g. main.js or main.css
	app.use(express.static("client/build"));

	// Express will serve index.html file
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
