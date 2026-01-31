import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { json } from "express";

import { authRouter } from "./modules/auth/auth.routes";
import { alumniRouter } from "./modules/alumni/alumni.routes";
import { adminRouter } from "./modules/admin/admin.routes"; // Import the new admin router

dotenv.config();

export const app = express();

// Basic security hardening
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "*", // later set to your frontend URL
    credentials: false
  })
);
app.use(json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "rankit-alumni-backend" });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/alumni", alumniRouter);
app.use("/api/admin", adminRouter); // Add the admin router

// Global error handler
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
);