import Result from "../models/Result.js";
import Enrollment from "../models/Enrollment.js";
import Assessment from "../models/Assessment.js";
import mongoose from "mongoose";

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

export const getResultReport = async (req, res) => {
  try {
    let pipeline = [];

    pipeline.push({
      $lookup: {
        from: "enrollments",
        localField: "enrollment",
        foreignField: "_id",
        as: "enrollment",
      },
    });

    pipeline.push({ $unwind: "$enrollment" });

    pipeline.push({
      $lookup: {
        from: "students",
        localField: "enrollment.student",
        foreignField: "_id",
        as: "student",
      },
    });

    pipeline.push({ $unwind: "$student" });

    pipeline.push({
      $lookup: {
        from: "courses",
        localField: "enrollment.course",
        foreignField: "_id",
        as: "course",
      },
    });

    pipeline.push({ $unwind: "$course" });

    pipeline.push({
      $lookup: {
        from: "assessments",
        localField: "assessment",
        foreignField: "_id",
        as: "assessment",
      },
    });

    pipeline.push({ $unwind: "$assessment" });

    let matchStage = {};

    if (req.query.courseId) {
      matchStage["course._id"] = new mongoose.Types.ObjectId(
        req.query.courseId,
      );
    }

    if (req.query.minMarks) {
      matchStage["marksObtained"] = { $gte: Number(req.query.minMarks) };
    }

    if (req.query.studentName) {
      matchStage["student.name"] = {
        $regex: req.query.studentName,
        $options: "i",
      };
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    pipeline.push({
      $project: {
        _id: 0,
        studentName: "$student.name",
        courseTitle: "$course.title",
        assessmentTitle: "$assessment.title",
        marksObtained: 1,
      },
    });

    const results = await Result.aggregate(pipeline);

    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
