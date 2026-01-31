// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { json } from "express";

import { authRouter } from "../../src/modules/auth/auth.routes";
import { alumniRouter } from "../../src/modules/alumni/alumni.routes";

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

// Global error handler
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
);
