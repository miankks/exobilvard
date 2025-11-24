import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { connectDB } from './config/db.js';
import userRouter from './routes/user.route.js';
import 'dotenv/config';
import cartRouter from './routes/cart.route.js';
import carRouter from './routes/car.route.js';
import orderRouter from './routes/order.route.js';
import emailRouter from './routes/email.route.js'
import bodyParser from 'body-parser';
import { protectAdmin } from "../middleware/auth.js";

dotenv.config();

// app config
const app = express();
const port = 3000;

// middleware, when request comes from frontend that will parse through json
app.use(express.json());

// It adds middleware that converts URL-encoded request bodies into a usable JavaScript object stored in req.body
app.use(express.urlencoded({ extended: true }));

// can get access to backend from any frontend to backend
app.use(cors());
// app.use(bodyParser.json())

// DB connect
connectDB();

// api endpoints
app.use('/api/car', carRouter)
app.use('/images', express.static('uploads'));
app.use("/api/user", userRouter)
app.use('/api/cart', cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/sendemail",bodyParser.json(), emailRouter)
// Only admin can fetch completed orders
orderRouter.get("/completedorders", protectAdmin, getCompletedOrders);
app.get("/", (req, res) => {
    res.send("API working")
})

// export default app

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    
})


// retryWrites=true&w=majority&appName=Cluster0
