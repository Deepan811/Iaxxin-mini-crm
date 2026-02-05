import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead
} from "../controllers/lead.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLeadById);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
