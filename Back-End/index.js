const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectDb = require("./confiq/ConnectDb");
const path = require("path");

const Auth = require("./Route/Auth/Auth.Route");
const post = require("./Route/post.route");
const user = require("./Route/User/genneral.route");
const order = require("./Route/order/Order.route");
const googleRouter = require("./controllerRoute/Auth/passport");
const { app, server } = require("./socket/socket");

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000",process.env.CLIENT_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// Static File Serving
app.use("/assets", express.static(path.join(__dirname, "./assets")));

// Routes
// app.use("/api/auth", googleRouter);
// app.use("/api/user", common);
// app.use("/api/post", post);
app.use("/api/v1", Auth);
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Error Middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Something went wrong";

  res.status(statusCode).json({
    message,
    statusCode,
    success: false,
    error: true,
  });
});

// Passport Configuration
require("./confiq/passport")(app);

// Database Connection & Server Start
ConnectDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  });
