// src/app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
// import cookieParser if you will use cookies
// import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  credentials: true // allow cookies if using them
}));

app.use(express.json());
// app.use(cookieParser());

// mount routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Backend is working"));

export default app;
