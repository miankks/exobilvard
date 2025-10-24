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

dotenv.config();

// app config
const app = express();
const port = 3000;

// middleware, when request comes from frontend that will parse through json
app.use(express.json());
// can get access to backend from any frontend to backend
app.use(cors());

// DB connect
connectDB();

// let isConnected = false
// export const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         isConnected = true;
//         console.log("Connected to MongoDB");
        
//     } catch (error) {
//         console.log(err, "there is an error connecting");
//     }
// }
// add middleware
// app.use((req, res, next) => {
//     if (!isConnected) {
//         connectDB();
//     }
//     next();
// })

// api endpoints
app.use('/api/car', carRouter)
app.use('/images', express.static('uploads'));
app.use("/api/user", userRouter)
app.use('/api/cart', cartRouter)

app.get("/", (req, res) => {
    res.send("API working")
})

// module.exports = app

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    
})


// retryWrites=true&w=majority&appName=Cluster0
