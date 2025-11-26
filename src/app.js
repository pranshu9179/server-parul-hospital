import cors from "cors";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//! Import routes
import userRouter from "./routes/user.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";

import ErrorHandling from "./middleware/error.middleware.js";

const app = express();

//! static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//! CORS setup
const allowedOrigins = [
  "http://localhost:5173",   // Vite React
  "http://127.0.0.1:5173",   // sometimes Vite uses 127.0.0.1
  "http://localhost:3000",   // CRA React
  "http://127.0.0.1:3000",   // CRA alternative
  "https://www.yourdomain.com" // Live frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies / authorization headers
  })
);

//! Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! routes
app.get("/", (req, res) => {
  res.send("✅ Server is working fine!");
});

app.use("/api/user", userRouter);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/inquiries", inquiryRoutes);

//! error Handling
app.use(ErrorHandling);

//! 404 handler
app.use((req, res, next) => {
  res.status(404).send(`❌ Requested URL not found: ${req.url}`);
});

export default app;
