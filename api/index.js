import dotenv from "dotenv";
dotenv.config();

import "./config/cloudinary.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import carRouter from "./routes/car.route.js";
import orderRouter from "./routes/order.route.js";
import emailRouter from "./routes/email.route.js";
import adminRouter from "./routes/admin.route.js";
import commentsRouter from "./routes/comments.route.js";
import { pageVisitRouter } from "./routes/pageVisit.route.js";

// app config
// REQUIRED on Render
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

// Determine base URL
const isProduction = process.env.NODE_ENV === "production";

const BASE_URL = isProduction
  ? process.env.RENDER_EXTERNAL_URL || `https://exobilvard-1.onrender.com`
  : `http://localhost:${port}`;

// middleware, when request comes from frontend that will parse through json

// It adds middleware that converts URL-encoded request bodies into a usable JavaScript object stored in req.body
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5000", // admin
  "http://localhost:5173", // client

  // Vercel preview URLs
  "https://exobilvard-admin-git-main-bilal-jans-projects.vercel.app", // admin
  "https://exobilvard-client-git-main-bilal-jans-projects.vercel.app", // client

  // PRODUCTION DOMAIN
  "https://exobilvardscenter.se",
  "https://www.exobilvardscenter.se",

  // PRODUCTION Admin DOMAIN
  "https://admin.exobilvardscenter.se",
  "https://www.admin.exobilvardscenter.se",
];
// can get access to backend from any frontend to backend
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// DB connect
connectDB();

// api endpoints
app.use("/api/car", carRouter);
app.use("/images", express.static("uploads"));
app.use("/adminimage", express.static("uploads/adminimage"));
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/sendemail", emailRouter);
app.use("/api/comment", commentsRouter);
app.use("/api/tracker", pageVisitRouter);

// Serve static frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
