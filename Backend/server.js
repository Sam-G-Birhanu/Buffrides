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

app.post("/api/book", async (req, res) => {
	const {
		name,
		phone_number,
		email_id,
		day,
		start_time,
		pickup_location,
		destination,
	} = req.body;

	const travelDurationInMinutes = await getTravelDurationInMinutes(
		pickup_location,
		destination,
		googleMapsApiKey
	);

	const startTime = new Date(`${day}T${start_time}`); // Create Date object from string

	// Format startTime into 'YYYY-MM-DD HH:MM:SS' format
	const startTimeFormatted = startTime
		.toISOString()
		.slice(0, 19)
		.replace("T", " ");

	// Calculate end time (adding travel duration in minutes)
	const endTime = new Date(
		startTime.getTime() + travelDurationInMinutes * 60000
	);

	// Format endTime into 'YYYY-MM-DD HH:MM:SS' format
	const endTimeFormatted = endTime.toISOString().slice(0, 19).replace("T", " ");

	// Generate a 4-digit random number for booking_ref
	const bookingRef = `${Math.floor(Date.now() / 1000) % 10000}${Math.floor(
		Math.random() * 1000
	)}`; // Random number with timestamp

	try {
		const db = await pool.connect();

		// // Save user data in the `Users` table
		// const user = await db.query(
		//   'INSERT INTO "Users" (name, phone_number, email_id) VALUES ($1, $2, $3) RETURNING *',
		//   [name, phone_number, email_id]
		// );

		// const userId = user.rows[0].user_id;

		let user = await db.query('SELECT * FROM "Users" WHERE email_id = $1', [
			email_id,
		]);

		let userId;

		if (user.rows.length > 0) {
			// If the user exists, use the existing user_id
			userId = user.rows[0].user_id;
		} else {
			// If the user doesn't exist, create a new user
			user = await db.query(
				'INSERT INTO "Users" (name, phone_number, email_id) VALUES ($1, $2, $3) RETURNING *',
				[name, phone_number, email_id]
			);
			userId = user.rows[0].user_id;
		}

		// Save booking data in the `Bookings` table
		const booking = await db.query(
			'INSERT INTO "Bookings" (user_id, day, start_time, end_time, pickup_location, destination, status, booking_ref) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
			[
				userId,
				day,
				startTimeFormatted,
				endTimeFormatted,
				pickup_location,
				destination,
				"confirmed",
				bookingRef,
			]
		);

		const { start_time, booking_ref } = booking.rows[0];

		// Send email confirmation
		const mailOptions = {
			from: '"Buffrides Ride Service" <service@buffrides.com>',
			to: email_id,
			subject: "Booking Confirmation",
			html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #4E784D;">Booking Confirmation</h2>
      <p>Dear Customer,</p>
      <p>Thank you for choosing Buffrides Ride Service. Your ride has been successfully booked with the following details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Pickup Time:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${formatDateTimeTo12Hour(
						start_time
					)}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Pickup Location:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${pickup_location}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Destination:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${destination}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Booking Reference:</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${booking_ref}</td>
        </tr>
      </table>
      <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
      <p>We appreciate your trust in Buffrides and look forward to serving you!</p>
      <p style="color: #B48D44;">Best regards,<br>Buffrides Ride Service Team</p>
    </div>
  `,
		};

		await transporter.sendMail(mailOptions);

		const mailOptionsDriver = {
			from: '"Buffrides Ride Service" <service@buffrides.com>',
			to: "adminservices@buffrides.com",
			subject: "Booking Confirmation",
			text: `A ride has been successfully booked.

Details:
Name: ${name}
Phone Number: ${phone_number}
Email: ${email_id}
Start Time: ${formatDateTimeTo12Hour(start_time)}
Pickup Location: ${pickup_location}
Destination: ${destination}
Booking Reference: ${booking_ref}`,
		};

		// Send email to driver
		await transporter.sendMail(mailOptionsDriver);

		res
			.status(201)
			.json({ message: "Booking confirmed", booking: booking.rows[0] });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred while booking the ride" });
	}
});

app.post("/api/cancel_booking", async (req, res) => {
	const { booking_ref } = req.body;

	try {
		// Connect to the database
		const db = await pool.connect();

		// Delete the booking and get its details
		const booking = await db.query(
			`DELETE FROM "Bookings" WHERE booking_ref = $1 RETURNING *`,
			[booking_ref]
		);

		if (booking.rowCount === 0) {
			return res.status(404).json({ error: "Booking not found" });
		}

		// Extract user_id from the deleted booking
		const { user_id, start_time, pickup_location, destination } =
			booking.rows[0];

		// Fetch user details based on user_id
		const userResult = await db.query(
			`SELECT name, phone_number, email_id FROM "Users" WHERE user_id = $1`,
			[user_id]
		);

		if (userResult.rowCount === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		// Extract user details
		const { name, phone_number, email_id } = userResult.rows[0];

		// Format the start_time
		const formattedStartTime = formatDateTimeTo12Hour(start_time);

		// Prepare email options
		const mailOptionsDriver = {
			from: '"Buffrides Ride Service" <service@buffrides.com>',
			to: "adminservices@buffrides.com",
			subject: "Booking Cancelled",
			text: `A ride with the below details has been cancelled.

    Details:
    Name: ${name}
    Phone Number: ${phone_number}
    Email: ${email_id}
    Start Time: ${formattedStartTime}
    Pickup Location: ${pickup_location}
    Destination: ${destination}
    Booking Reference: ${booking_ref}`,
		};

		// Send email to the driver
		await transporter.sendMail(mailOptionsDriver);

		const mailOptionsUser = {
			from: '"Buffrides Ride Service" <service@buffrides.com>',
			to: email_id,
			subject: "Your Booking Has Been Canceled",
			text: `Hello ${name},

        Your booking with the following details has been successfully canceled:
        
        - Name: ${name}
        - Phone Number: ${phone_number}
        - Email: ${email_id}
        - Start Time: ${formattedStartTime}
        - Pickup Location: ${pickup_location}
        - Destination: ${destination}
        - Booking Reference: ${booking_ref}
        
        If you have any questions or require further assistance, feel free to contact us.
        
        Thank you,
        Buffrides Ride Service Team
        service@buffrides.com`,
		};

		// Send email to the user
		await transporter.sendMail(mailOptionsUser);

		// Respond with success
		res.status(200).json({
			message: "Booking canceled",
			booking: booking.rows[0],
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while canceling the booking" });
	}
});

async function getTravelDurationInMinutes(origin, destination, apiKey) {
	try {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
				origin
			)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`
		);

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		const data = await response.json();
		const travelTimeInSeconds = data.rows[0].elements[0].duration.value; // Time in seconds
		return Math.ceil(travelTimeInSeconds / 60); // Convert to minutes and round up
	} catch (error) {
		console.error("Error fetching travel duration:", error.message);
		throw new Error("Could not calculate travel duration.");
	}
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
