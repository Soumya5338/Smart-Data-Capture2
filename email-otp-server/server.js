const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const otpMap = new Map(); // key: identifier (email or phone), value: OTP

// Gmail transporter (email OTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vinaymantha4@gmail.com',
    pass: 'fayx oznr kgaz nchg', // ✅ Your Gmail app password
  },
});

// === EMAIL OTP ===
app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpMap.set(email, otp); // store per email

  const mailOptions = {
    from: 'vinaymantha4@gmail.com',
    to: email,
    subject: 'Your OTP for Smart Capture Login',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return res.status(500).send('Email send failed');
    console.log(`📧 OTP ${otp} sent to ${email}`);
    res.send('Email OTP sent');
  });
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const stored = otpMap.get(email);

  if (otp === stored) {
    otpMap.delete(email);
    return res.json({ verified: true });
  }
  res.json({ verified: false });
});

// === PHONE OTP ===
app.post('/send-phone-otp', (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpMap.set(phone, otp); // store per phone
  console.log(`📲 OTP ${otp} sent to ${phone} (simulated)`); // simulate SMS
  res.send({ message: 'Phone OTP sent (check server console)' });
});

app.post('/verify-phone-otp', (req, res) => {
  const { phone, otp } = req.body;
  const stored = otpMap.get(phone);

  if (otp === stored) {
    otpMap.delete(phone);
    return res.json({ verified: true });
  }
  res.json({ verified: false });
});

app.get('/', (req, res) => {
  res.send('🚀 Combined OTP Server Running');
});

app.listen(3000, () => console.log('✅ Server on http://localhost:3000'));
