import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

let isConnected = false;

export const connectDB = async () => {
  try {
    if(isConnected) return ;
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI not set");

    await mongoose.connect(uri);
    isConnected=true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

