import React, { useState } from "react";
import { sendOtpApi, verifyOtpApi, resetPasswordApi } from "../../Api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await sendOtpApi(email);
      if (response.data.success) {
        toast.success(response.data.message);
        setOtpSent(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtpApi(email, otp);
      if (response.data.success) {
        toast.success(response.data.message);
        setOtpVerified(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error verifying OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await resetPasswordApi(email, newPassword);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="center-card">
        <h1>Forgot Password</h1>
        {!otpSent && (
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button onClick={handleSendOtp}>Send OTP</button>
          </div>
        )}
        {otpSent && !otpVerified && (
          <div className="form-group">
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </div>
        )}
        {otpVerified && (
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <button onClick={handleResetPassword}>Reset Password</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
