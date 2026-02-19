import express from "express";
import {
  enrollStudent,
  getEnrollments,
  updateEnrollment,
  deleteEnrollment,
} from "../controllers/enrollment.controller.js";

const router = express.Router();

router.post("/", enrollStudent);
router.get("/", getEnrollments);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);

export default router;
