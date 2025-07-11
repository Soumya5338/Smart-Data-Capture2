const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const otpMap = new Map(); // Stores OTPs: key = email or phone
const users = new Map();  // Stores users: key = username

// Email OTP sender setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vinaymantha4@gmail.com',
    pass: 'fayx oznr kgaz nchg', // App password
  },
});

// === Send OTP ===
app.post('/send-otp', (req, res) => {
  const { email, phone } = req.body;
  const identifier = email || phone;
  if (!identifier) return res.status(400).send({ message: 'Missing email or phone' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpMap.set(identifier, otp);

  if (email) {
    const mailOptions = {
      from: 'vinaymantha4@gmail.com',
      to: email,
      subject: 'Smart Capture OTP',
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(500).send({ message: 'Email failed to send' });
      console.log(`📧 OTP ${otp} sent to ${email}`);
      res.send({ message: 'OTP sent to email' });
    });
  } else {
    // Simulate SMS sending
    console.log(`📲 OTP ${otp} sent to ${phone}`);
    res.send({ message: 'OTP sent to phone (check console)' });
  }
});

// === Verify OTP ===
app.post('/verify-otp', (req, res) => {
  const { email, phone, otp } = req.body;
  const identifier = email || phone;

  if (!identifier || !otp) {
    return res.status(400).json({ verified: false, message: 'Missing email/phone or OTP' });
  }

  const storedOtp = otpMap.get(identifier);
  if (storedOtp === otp) {
    otpMap.delete(identifier);
    console.log(`✅ OTP verified for ${identifier}`);
    res.json({ verified: true });
  } else {
    res.json({ verified: false, message: 'Invalid OTP' });
  }
});

// === Register ===
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  if (users.has(username)) {
    return res.json({ success: false, message: 'Username already exists' });
  }

  users.set(username, { password, email });
  console.log(`👤 Registered: ${username}`);
  res.json({ success: true });
});

// === Login ===
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);

  if (user && user.password === password) {
    return res.json({ success: true });
  }
  res.json({ success: false, message: 'Invalid credentials' });
});

// === Test Endpoint ===
app.get('/', (req, res) => {
  res.send('🚀 Smart Capture OTP Server is running!');
});

// === Start Server ===
app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
