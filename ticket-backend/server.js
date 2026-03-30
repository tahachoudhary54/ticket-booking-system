// server.js
// Entry point — connects to DB then starts the server

import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

// First connect to MongoDB, then start Express server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});