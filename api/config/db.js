import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO;

  if (!MONGO_URI) {
    throw new Error("❌ MONGO environment variable is not defined");
  }

  console.log("Connecting to MongoDB...");

  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
        // critical for serverless: prevent hanging sockets
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        keepAlive: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

// // /config/db.js
// import mongoose from "mongoose";

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export const connectDB = async () => {
//   const MONGO_URI = process.env.MONGO; // <-- read inside function

//   if (!MONGO_URI) {
//     throw new Error("❌ MONGO environment variable is not defined");
//   }

//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGO_URI, { bufferCommands: false })
//       .then((mongoose) => {
//         console.log("✅ MongoDB connected");
//         return mongoose;
//       });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// };
