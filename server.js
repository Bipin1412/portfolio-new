// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to enable CORS and parse form data
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

// POST route to handle the form submission
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Create transporter with your email configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com', // Replace with your email
            pass: 'your_email_password' // Replace with your email password or app password
        }
    });

    // Email options
    let mailOptions = {
        from: email,
        to: 'your_email@gmail.com', // Replace with your email
        subject: `Contact form submission: ${subject}`,
        text: `You have received a new message from ${name} (${email}): \n\n${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error while sending email:', error); // Log error details
            return res.status(500).send('Error sending message');
        }
        console.log('Message sent: %s', info.messageId); // Log message ID
        res.status(200).send('Message sent successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
