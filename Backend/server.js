require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// const { Client } = require("pg"); // PostgreSQL
const { google } = require("googleapis");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());

// Database connection using environment variables
const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const cors = require("cors");

const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Email setup using environment variables
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER, // Use email user from env
		pass: process.env.EMAIL_PASS, // Use email pass from env
	},
});

const formatDateTimeTo12Hour = (dateTime) => {
	if (!(typeof dateTime === "string")) {
		// Convert to string if it's a Date object
		dateTime = new Date(dateTime).toISOString().replace("T", " ").slice(0, 19);
	}

	const [date, time] = dateTime.split(" ");
	const [year, month, day] = date.split("-");
	const [hour, minute, second] = time.split(":");

	const dateObject = new Date(year, month - 1, day, hour, minute, second);

	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true,
	};

	return new Intl.DateTimeFormat("en-US", options).format(dateObject);
};

// API: Book a Ride

app.get("/", async (req, res) => {
	res.set("Content-Type", "text/plain; charset=utf-8");
	res.send("Server is running");
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
