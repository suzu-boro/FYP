const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const { generatePassword } = require("./userControllers");

// Reset Password controller function
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log("Received data:", req.body);

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const { salt, hash } = generatePassword(newPassword);

    user.salt = salt;
    user.password = hash;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  resetPassword,
};
