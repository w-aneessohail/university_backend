import Result from "../models/Result.js";
import Enrollment from "../models/Enrollment.js";
import Assessment from "../models/Assessment.js";

export const createResult = async (req, res) => {
  try {
    const { enrollment, assessment, marksObtained } = req.body;

    const enrollmentExists = await Enrollment.findById(enrollment);
    if (!enrollmentExists)
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });

    const assessmentExists = await Assessment.findById(assessment);
    if (!assessmentExists)
      return res
        .status(404)
        .json({ success: false, message: "Assessment not found" });

    if (String(assessmentExists.course) !== String(enrollmentExists.course))
      return res.status(400).json({
        success: false,
        message: "Assessment does not belong to the student's course",
      });

    const result = await Result.create({
      enrollment,
      assessment,
      marksObtained,
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate({
        path: "enrollment",
        populate: ["student", "course"],
      })
      .populate("assessment");

    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate({
        path: "enrollment",
        populate: ["student", "course"],
      })
      .populate("assessment");

    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Result not found" });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateResult = async (req, res) => {
  try {
    const { marksObtained } = req.body;

    const result = await Result.findByIdAndUpdate(
      req.params.id,
      { marksObtained },
      { returnDocument: "after", runValidators: true },
    )
      .populate({
        path: "enrollment",
        populate: ["student", "course"],
      })
      .populate("assessment");

    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Result not found" });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);

    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Result not found" });

    res.json({ success: true, message: "Result deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
