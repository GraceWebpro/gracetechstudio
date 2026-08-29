import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import generationRoutes from "./routes/generation.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "GraceTech AI backend is running.",
  });
});

app.use("/api", generationRoutes);

app.listen(PORT, () => {
  console.log(
    `Backend running on http://localhost:${PORT}`
  );
});