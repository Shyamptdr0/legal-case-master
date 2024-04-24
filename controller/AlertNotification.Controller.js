const nodemailer = require('nodemailer');
const Case = require('../models/Cases'); 

// Function to send email using nodemailer
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Function to check for cases with dates tomorrow and send email alerts
const checkAndSendAlerts = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Set the date to tomorrow

  try {
    const cases = await Case.find({ 'dates.date': tomorrow });

    cases.forEach(async (caseItem) => {
      const userEmail = caseItem.userEmail; // Assuming each case has a user email
      const subject = 'Case Date Alert';
      const text = `You have a case scheduled for tomorrow: ${caseItem.name}`;
      await sendEmail(userEmail, subject, text);
    });
  } catch (error) {
    console.error('Error fetching cases:', error);
  }
};
