import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "🎟️ Ticket Booking API is running!" });
});

app.use("/api/tickets", ticketRoutes);

export default app;