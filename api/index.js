import "dotenv/config"; // MUST be first
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import serverless from "serverless-http";

import { connectDB } from "./config/db.js";

// Routes
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";
import carRouter from "./routes/car.route.js";
import orderRouter from "./routes/order.route.js";
import emailRouter from "./routes/email.route.js";
import adminRouter from "./routes/admin.route.js";
import commentsRouter from "./routes/comments.route.js";
import { pageVisitRouter } from "./routes/pageVisit.route.js";

const app = express();

/* -------------------- Middleware -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:5173",
  "https://exobilvard-admin-git-main-bilal-jans-projects.vercel.app",
  "https://exobilvard-client-git-main-bilal-jans-projects.vercel.app",
  "https://exobilvardscenter.se",
  "https://www.exobilvardscenter.se",
  "https://admin.exobilvardscenter.se",
  "https://www.admin.exobilvardscenter.se",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* -------------------- DB -------------------- */
// serverless-safe DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

/* -------------------- Routes -------------------- */
app.use("/api/car", carRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/sendemail", bodyParser.json(), emailRouter);
app.use("/api/comment", commentsRouter);
app.use("/api/tracker", pageVisitRouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* -------------------- Export ONLY -------------------- */
export default serverless(app);
