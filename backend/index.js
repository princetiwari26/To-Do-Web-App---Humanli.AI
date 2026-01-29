import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import boardRoutes from "./routes/board.routes.js";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});