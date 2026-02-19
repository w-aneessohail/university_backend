import Enrollment from "../models/Enrollment.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";

export const enrollStudent = async (req, res) => {
  try {
    const { student, course, semester } = req.body;

    const studentExists = await Student.findById(student);
    if (!studentExists)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });

    const courseExists = await Course.findById(course);
    if (!courseExists)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    let enrollment = await Enrollment.findOne({ student, course, semester });

    if (enrollment) {
      if (enrollment.status === "dropped") {
        enrollment.status = "enrolled";
        enrollment.grade = null;
        await enrollment.save();

        return res.json({
          success: true,
          message: "Enrollment reactivated",
          data: enrollment,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Student already enrolled in this course for this semester",
      });
    }

    enrollment = await Enrollment.create({ student, course, semester });

    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student")
      .populate({
        path: "course",
        populate: ["department", "teacher"],
      });

    res.json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true },
    )
      .populate("student")
      .populate("course");

    if (!enrollment)
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });

    res.json({ success: true, data: enrollment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

    if (!enrollment)
      return res
        .status(404)
        .json({ success: false, message: "Enrollment not found" });

    res.json({ success: true, message: "Enrollment removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
