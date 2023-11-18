class Comment {
	constructor(name, email, phone, address, subject, message) {
		this.id = uuidv4();
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.subject = subject;
		this.message = message;
	}
}

const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const comments = [];

function checkInputs(req, res, next) {
	const { name, email, phone, address, subject, message } = req.body;

	if (!name || !email || !phone || !address || !subject || !message) {
		return res.status(403).json({
			error: 'Fill in all fields!',
		});
	}

	return next();
}

app.post('/comment', checkInputs, (req, res, next) => {
	try {
		const { name, email, phone, address, subject, message } = req.body;

		const comment = new Comment(
			name,
			email,
			phone,
			address,
			subject,
			message
		);

		comments.push(comment);

		return res.status(201).json(comment);
	} catch (err) {
		console.log(`${err}`);
		return res.status(500).send('Something went wrong!');
	}
});

app.get('/comment', (req, res, next) => {
    try {
        return res.status(200).json(comments);
    } catch (err) {
        console.log(`${err}`);
        return res.status(500).send('Something went wrong!');
    }
});

module.exports = app;
