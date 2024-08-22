const express = require('express');
const router = express.Router();
const Contact = require('../models/Contactmodel');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'shivam33dimri@gmail.com', 
    pass: 'gwll xcsl gwln ufts', 
  },
});

router.post('/', async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    const newContact = new Contact({ email, subject, message });
    await newContact.save();

    
    const mailOptions = {
      from: 'your-email@gmail.com', 
      to: 'shivam33dimri@gmail.com', 
      subject: `New Message: ${subject}`, 
      text: `You have received a new message from ${email}:\n\n${message}`, 
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to send message' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(201).json({ message: 'Your message has been sent to the Admin successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
