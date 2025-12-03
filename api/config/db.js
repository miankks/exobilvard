import mongoose from "mongoose";

let isConnected = false; // track connection across function invocations

export const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err; // re-throw so Vercel can log it
  }
};







// import mongoose from "mongoose";


// export const connectDB = async () => {
//     await mongoose.connect(process.env.MONGO).then(() => {
//         console.log("Connected to MongoDB");
//     }).catch((err) => {
//         console.log(err, "there is an error connecting");

//     }
//     )
// }


