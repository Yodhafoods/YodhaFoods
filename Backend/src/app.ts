// src/app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";


const app = express();


app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

export default app;
