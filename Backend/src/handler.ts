import dotenv from "dotenv";

dotenv.config();
import serverless from "serverless-http";
import app from "./app.js";
import { connectDB } from "./config/db.js";

let initialized = false;

export const handler = async (event: any, context: any) => {
  if (!initialized) {
    await connectDB();
    initialized = true;
  }

  return serverless(app)(event, context);
};

