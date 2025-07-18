require('dotenv').config(); // load environment variables from .env file
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// define the contact form endpoint
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please fill in all fields' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'jodonydunn@gmail.com', // my email address
        subject: `New Contact Form Message from ${name}`,
        html: `<p>You have a new message from your website contact form.</p>
               <h3>Contact Details:</h3>
               <ul>
                   <li><strong>Name:</strong> ${name}</li>
                   <li><strong>Email:</strong> ${email}</li>
               </ul>
               <h3>Message:</h3>
               <p>${message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        res.status(200).json({ msg: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ msg: 'Failed to send message.', error: error.message });
    }
});

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

