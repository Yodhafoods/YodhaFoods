// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
    credentials: true // allow cookies to be sent from browser
  })
);

app.use(express.json());
app.use(cookieParser());

// Mount routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Backend is working"));

export default app;
