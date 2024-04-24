const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();
const cors = require("cors");
app.use(express.json());
const cron = require('node-cron');
app.use(cookieParser());
const path = require("path");
const { checkAndSendAlerts } = require('./controller/AlertNotification.Controller');

app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  credentials: true,
})
);

// Connect to MongoDB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MDB_CONNECT)
  .then(() => {
    console.log('Mongodb connected');
  })
  .catch((err) => {
    console.log(err);
  })

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/legal', require('./routes/legal'));

app.use(express.static('client/dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'));
});

// Schedule the alert controller to run at 12 o'clock daily
cron.schedule('0 12 * * *', async () => {
  console.log('Running alert controller...');
  await checkAndSendAlerts();
});

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server started on port: ${PORT}`);
});