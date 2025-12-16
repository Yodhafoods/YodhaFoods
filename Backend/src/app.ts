import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import addressRoutes from "./routes/address.routes.js";
import cartRoutes from "./routes/cart.routes.js";

import passport from "./config/passport.js";

const app = express();

app.use(passport.initialize());

/* ----------------------------------------------------
    1. SECURITY: HTTP Headers (Helmet)
---------------------------------------------------- */
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for APIs
  })
);

/* ----------------------------------------------------
    2. CORS (Production safe)
---------------------------------------------------- */
app.use(
  cors({
    origin: [process.env.FRONTEND_ORIGIN || "http://localhost:3000", "http://localhost:3000"],
    credentials: true, // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

/* ----------------------------------------------------
    3. Logging (Morgan)
---------------------------------------------------- */
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined")); // production logs
}

/* ----------------------------------------------------
    4. Body Parser + cookie parser
---------------------------------------------------- */
app.use(express.json({ limit: "10mb" })); // avoid large payload attacks
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ----------------------------------------------------
    5. Compression (performance)
---------------------------------------------------- */
app.use(compression());

/* ----------------------------------------------------
    6. Rate Limiting (prevent brute force / abuse)
---------------------------------------------------- */
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests/min for auth routes
  message: { message: "Too many requests, please try again later" },
});

app.use("/api/auth", authLimiter);

/* ----------------------------------------------------
    7. Routes
---------------------------------------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/cart", cartRoutes);


app.get("/", (req, res) => res.send("Backend is running 🚀"));

/* ----------------------------------------------------
    8. Centralized Error Handler (Production Safe)
---------------------------------------------------- */
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Global Error:", err);

    return res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
);

/* ----------------------------------------------------
    9. Disable x-powered-by (security best practice)
---------------------------------------------------- */
app.disable("x-powered-by");

export default app;
