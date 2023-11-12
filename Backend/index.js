import https from 'https';
import fs from 'fs';
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import complaintsRoute from "./routes/complaintsRoute.js";
import usersRoute from "./routes/usersRoute.js"
import authRoute from "./routes/authRoute.js";
import dispatchRoute from "./routes/dispatchRoute.js"
import peonRoute from "./routes/peonRoute.js"
import attendanceRoute from "./routes/attendanceRoute.js"
import contactRoute from './routes/contactRoute.js'; 
import { createError } from "./utitls/error.js";
import { verifyToken } from "./utitls/verifyToken.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

// Load environment variables from .env file
dotenv.config();

// connect to database
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database!");
  } catch (error) {
    console.error("Connection error:", error.message);
  }
};

// checking database connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB!");
});

// middlewares
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // Make sure to set this to true if you are including credentials (e.g., cookies) with your requests.
};

const verifyUserRole = (allowedRoles) => (req, res, next) => {
  // console.log("User role:", req.user.userType); // Use consistent property name
  console.log("Allowed roles:", allowedRoles);

  if (req.user && req.user.userType && allowedRoles.includes(req.user.userType)) {
    next();
  } else {
    return next(createError(403, "You are not authorized."));
  }
};




app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

// Add other routes here if needed
app.get("/backend/data", (req, res) => {
  res.set("Cache-control", `Public, max-age=1`);
  res.send("data");
});


app.use(express.static('dist'));
app.use('/backend/contact', contactRoute);
app.use('/contactfiles', express.static('contactfiles'));
app.use("/uploads", express.static("../backend/uploads"));
app.use("/backend/attendance", attendanceRoute);
app.use("/backend/dispatchRegister",verifyToken, verifyUserRole(["diary-manager", "director", "admin"]), dispatchRoute);
app.use("/backend/peonBook", peonRoute);
app.use("/backend/complaints", complaintsRoute);
app.use("/backend/users", usersRoute);
app.use("/backend/auth", authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";
  console.error("Error:", err); 
  return res.status(errStatus).json({
    success: false,
    message: errMsg,
  });
});
// const options = {
//   key: fs.readFileSync(path.resolve(__dirname, 'ssl', 'localhost-key.pem')),
//   cert: fs.readFileSync(path.resolve(__dirname, 'ssl', 'localhost.pem')),
// };

// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/dist/index.html');
// });

// Start the server

// const PORT = 443;
// const server = https.createServer(options, app);
// server.listen(PORT, () => {
//   connect();
//   console.log(`Server is running on port ${PORT}`);
// });


const PORT = 8080;
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});





























