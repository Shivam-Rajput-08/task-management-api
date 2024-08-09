const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");

dotenv.config();
connectDB();
const app = express();
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
module.exports = app;
