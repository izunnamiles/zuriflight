const express = require("express");
const { json, urlencoded } = require("express");
const dbConfig = require('./db.config.js');
const mongoose = require('mongoose');
const routes = require("./routes/flightRoute");

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));


// Connecting to the database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {useNewUrlParser: true})
.then(() => {  
	console.log("Successfully connected to the database");
})
.catch(err => {  console.log('Could not connect to the database.', err);  
	process.exit();
});

app.use("/api/v1/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
