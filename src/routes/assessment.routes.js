import express from "express";
import {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
} from "../controllers/assessment.controller.js";

const router = express.Router();

router.post("/", createAssessment);
router.get("/", getAssessments);
router.get("/:id", getAssessmentById);
router.put("/:id", updateAssessment);
router.delete("/:id", deleteAssessment);

export default router;
