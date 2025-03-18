const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const router = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const esewaRouter = require("./routes/esewa");
const fileUpload = require("express-fileupload");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// File Upload Config
app.use(fileUpload());
app.use(express.static("public"));

// CORS Config
const corsOptions = {
  origin: true,
  credentials: true, // dont forget 's'
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("HEllo");
});
// 4. Creating a test route or endpoint
app.get("/test", (req, res) => {
  res.send("Test Api is Working ...!");
});
app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/esewa", require("./routes/esewa"));

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello from MERN stack");
});
