// importing the package
const mongoose = require("mongoose");

// creating a function
const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("database connected");
  });
};

// exporting the function
module.exports = connectDB;
