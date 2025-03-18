const userModel = require("../models/userModels");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// Function to generate hashed password
function generatePassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: genHash,
  };
}

// Function to validate password
function validPassword(password, hash, salt) {
  const checkHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === checkHash;
}

const createUser = async (req, res) => {
  console.log("Create user api hit");
  const { firstName, lastName, email, password } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already Exists!",
      });
    }

    // Generate hashed password
    const { salt, hash } = generatePassword(password);

    // Save the user in the database
    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      salt: salt,
    });

    await newUser.save();
    console.log("Create user api success");

    // Send the success response
    res.json({
      userData: newUser,
      success: true,
      message: "User Created Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found!",
      });
    }
    console.log(user);
    // Validate the password
    if (!validPassword(password, user.password, user.salt)) {
      return res.json({
        success: false,
        message: "Incorrect Password!",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, is_admin: user.isAdmin },
      process.env.JWT_SECRET
    );

    // Send the token, userData, and success message to the user
    res.json({
      success: true,
      message: "Login Successful!",
      token: token,
      userData: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  generatePassword,
};
