require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();


require("./config")(app);


const projectName = "Ski-crew";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;



//string de conexión mongo atlas//       mongodb + srv://Mats:1234@cluster0.qm0tz.mongodb.net/Ski-crew//
