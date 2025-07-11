const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const otpMap = new Map(); // key = email or phone
const users = new Map();  // key = username

// Dummy user for testing reset password (REMOVE IN PRODUCTION)
users.set('vinaymantha', { password: 'oldpassword', email: 'vinaymantha4@gmail.com' });

// === Email Transporter ===
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vinaymantha4@gmail.com',
    pass: 'fayx oznr kgaz nchg', // App password
  },
});

// === Send OTP (Email or Phone) ===
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
      if (err) return res.status(500).send({ message: 'Failed to send email' });
      console.log(`📧 OTP ${otp} sent to ${email}`);
      res.send({ message: 'OTP sent to email' });
    });
  } else {
    console.log(`📲 OTP ${otp} sent to phone ${phone}`);
    res.send({ message: 'OTP sent to phone (check console)', otp }); // For dev only
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

// === Reset Password ===
app.post('/reset-password', (req, res) => {
  const { email, password } = req.body;
  console.log('🔁 Reset request:', req.body);

  const userEntry = Array.from(users.entries()).find(([_, user]) => user.email === email);
  if (!userEntry) {
    console.log('❌ No user found for this email');
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const [username, userData] = userEntry;
  users.set(username, { ...userData, password });
  console.log(`✅ Password updated for ${username}`);
  res.json({ success: true });
});

// === Register ===
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  if (users.has(username)) {
    return res.json({ success: false, message: 'Username exists' });
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

app.get('/', (req, res) => {
  res.send('🚀 Smart Capture OTP Server is running!');
});

app.listen(3000, () =>
  console.log('✅ Server running on http://localhost:3000')
);
