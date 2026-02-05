import express from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById
} from "../controllers/company.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createCompany);
router.get("/", getCompanies);
router.get("/:id", getCompanyById);

export default router;
