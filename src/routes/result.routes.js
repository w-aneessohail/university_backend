import express from "express";
import {
  createResult,
  getResults,
  getResultById,
  updateResult,
  deleteResult,
  getResultReport,
} from "../controllers/result.controller.js";

const router = express.Router();

router.get("/report", getResultReport);
router.post("/", createResult);
router.get("/", getResults);
router.get("/:id", getResultById);
router.put("/:id", updateResult);
router.delete("/:id", deleteResult);

export default router;
