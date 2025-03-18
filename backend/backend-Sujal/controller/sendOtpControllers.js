const User = require("../models/userModels");
const nodemailer = require("nodemailer");

// Configure nodemailer

// Generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP controller function
const sendOtp = async (req, res) => {
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASS);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  console.log(transporter);
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  const otp = generateOtp();
  user.otp = otp;
  user.otpExpiry = Date.now() + 3600000; // 1 hour expiry
  await user.save();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP for Password Reset",
    text: `Your OTP for password reset is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Error sending email" });
    }
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  });
};

module.exports = {
  sendOtp,
};
