const router = require("express").Router();

const express = require("express");
const nodemailer = require("nodemailer");
const User = require("../models/userModels");
const userControllers = require("../controller/userControllers");
const sendOtpControllers = require("../controller/sendOtpControllers");
const verifyOtpControllers = require("../controller/verifyOtpControllers");
const resetPasswordControllers = require("../controller/resetPasswordControllers");
// Make a create user API
//api/users
router.post("/create", userControllers.createUser);

// Login user API
router.post("/login", userControllers.loginUser);

// // Send OTP route

router.post("/send-otp", sendOtpControllers.sendOtp);

// Verify OTP route
router.post("/verify-otp", verifyOtpControllers.verifyOtp);

// Reset Password route
router.post("/reset-password", resetPasswordControllers.resetPassword);

module.exports = router;
