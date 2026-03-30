import express from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  deleteAllTickets
} from "../controllers/ticketController.js";

const router = express.Router();

// routes
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);
router.put("/:id", updateTicket);

// delete all tickets
router.delete("/all", deleteAllTickets);

// delete single ticket
router.delete("/:id", deleteTicket);

export default router;