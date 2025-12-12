import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from "url";
import { connectDB } from './config/db.js';
import userRouter from './routes/user.route.js';
import 'dotenv/config';
import cartRouter from './routes/cart.route.js';
import carRouter from './routes/car.route.js';
import orderRouter from './routes/order.route.js';
import emailRouter from './routes/email.route.js'
import bodyParser from 'body-parser';
import adminRouter from './routes/admin.route.js';
import commentsRouter from './routes/comments.route.js';

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 3000;

// Determine base URL
const isProduction = process.env.NODE_ENV === "production";

const BASE_URL = isProduction? process.env.RENDER_EXTERNAL_URL || `https://exobilvard-1.onrender.com` : `http://localhost:${port}`

// middleware, when request comes from frontend that will parse through json
app.use(express.json());

// It adds middleware that converts URL-encoded request bodies into a usable JavaScript object stored in req.body
app.use(express.urlencoded({ extended: true }));

// can get access to backend from any frontend to backend
app.use(cors(
    {
    origin: [
        "http://localhost:5000",    // admin
        "http://localhost:5173",    // client
        "https://exobilvard-mje6-git-main-bilal-jans-projects.vercel.app", // admin
        "https://exobilvard-client-git-main-bilal-jans-projects.vercel.app",  // client
    ],
    credentials: true
}
));

// DB connect
connectDB();

// api endpoints
app.use('/api/car', carRouter)
app.use('/images', express.static('uploads'));
app.use('/adminimage', express.static('uploads/adminimage'));
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use('/api/cart', cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/sendemail",bodyParser.json(), emailRouter)
app.use("/api/comment", commentsRouter)

// export default app


// app.get("/", (req, res) => {
//     res.send(`server is running at: ${BASE_URL}`)
// })
// app.listen(port, () => {
//     console.log(`Server started on: ${port}`);
// })

// export default app
// Serve static frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/", express.static(path.join(__dirname, "../client/dist")));

// API routes should be above the wildcard
app.use("/api/admin", adminRouter);
// ... other API routes

// Wildcard fallback for client-side routing
app.get(/^\/(?!api|admin).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Optional root route for testing server
app.get("/", (req, res) => {
  res.send(`Server is running at: ${BASE_URL}`);
});

app.listen(port, () => {
  console.log(`Server started on: ${port}`);
});

