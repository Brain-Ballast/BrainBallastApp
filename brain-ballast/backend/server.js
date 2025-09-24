import express from "express";
import cors from "cors";
import fs from "node:fs";
import dotenv from "dotenv";
import { CSV_PATH } from "./config.js";
import apiRouter from "./routes/api.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));

// Log whether the CSV exists at startup
if (fs.existsSync(CSV_PATH)) {
  console.log(`CSV file found at: ${CSV_PATH}`);
} else {
  console.error(`CSV file NOT found at: ${CSV_PATH}`);
}

// Mount all API routes under /api
app.use("/api", apiRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` CSV API (hardcoded file) running on http://localhost:${PORT}`);
  console.log(` Using CSV path: ${CSV_PATH}`);
});