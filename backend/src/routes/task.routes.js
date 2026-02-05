import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id/status", updateTaskStatus);

export default router;
