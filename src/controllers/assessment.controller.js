import Assessment from "../models/Assessment.js";
import Course from "../models/Course.js";

export const createAssessment = async (req, res) => {
  try {
    const { title, type, totalMarks, weightage, course, dueDate, description } =
      req.body;

    const courseExists = await Course.findById(course);
    if (!courseExists)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    const assessment = await Assessment.create({
      title,
      type,
      totalMarks,
      weightage,
      course,
      dueDate,
      description,
    });

    res.status(201).json({ success: true, data: assessment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find().populate("course");
    res.json({ success: true, count: assessments.length, data: assessments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id).populate(
      "course",
    );
    if (!assessment)
      return res
        .status(404)
        .json({ success: false, message: "Assessment not found" });

    res.json({ success: true, data: assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAssessment = async (req, res) => {
  try {
    const { course } = req.body;

    if (course) {
      const courseExists = await Course.findById(course);
      if (!courseExists)
        return res
          .status(404)
          .json({ success: false, message: "Course not found" });
    }

    const assessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true },
    ).populate("course");

    if (!assessment)
      return res
        .status(404)
        .json({ success: false, message: "Assessment not found" });

    res.json({ success: true, data: assessment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndDelete(req.params.id);

    if (!assessment)
      return res
        .status(404)
        .json({ success: false, message: "Assessment not found" });

    res.json({ success: true, message: "Assessment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
