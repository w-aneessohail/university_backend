import express from "express";
import {
  createResult,
  getResults,
  getResultById,
  updateResult,
  deleteResult,
} from "../controllers/result.controller.js";

const router = express.Router();

router.post("/", createResult);
router.get("/", getResults);
router.get("/:id", getResultById);
router.put("/:id", updateResult);
router.delete("/:id", deleteResult);

export default router;
