const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000,
  max: 100,
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", limiter, taskRoutes);

module.exports = app;
