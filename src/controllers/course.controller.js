import Course from "../models/Course.js";
import Department from "../models/Department.js";
import Teacher from "../models/Teacher.js";

export const createCourse = async (req, res) => {
  try {
    const { title, code, creditHours, semester, department, teacher } =
      req.body;

    const dept = await Department.findById(department);
    if (!dept) {
      return res.status(400).json({
        success: false,
        message: "Department does not exist",
      });
    }

    if (teacher) {
      const teacherDoc = await Teacher.findById(teacher);
      if (!teacherDoc) {
        return res.status(400).json({
          success: false,
          message: "Teacher does not exist",
        });
      }

      if (teacherDoc.department.toString() !== department) {
        return res.status(400).json({
          success: false,
          message: "Teacher does not belong to this department",
        });
      }
    }

    const course = await Course.create({
      title,
      code,
      creditHours,
      semester,
      department,
      teacher: teacher || null,
    });

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("department")
      .populate("teacher");

    res.json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("department")
      .populate("teacher");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { department, teacher } = req.body;

    if (department) {
      const dept = await Department.findById(department);
      if (!dept) {
        return res.status(400).json({
          success: false,
          message: "Department does not exist",
        });
      }
    }

    if (teacher) {
      const teacherDoc = await Teacher.findById(teacher);
      if (!teacherDoc) {
        return res.status(400).json({
          success: false,
          message: "Teacher does not exist",
        });
      }

      const courseDept =
        department || (await Course.findById(req.params.id)).department;

      if (teacherDoc.department.toString() !== courseDept.toString()) {
        return res.status(400).json({
          success: false,
          message: "Teacher does not belong to this department",
        });
      }
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    })
      .populate("department")
      .populate("teacher");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
