const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/Reminder");

mongoose.connect(keys.mongoURI);

const app = express();

require("./routes/reminderRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
