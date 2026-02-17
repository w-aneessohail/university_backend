import Assignment from "../models/assignment.model.js";

export const createAssignment = async (data) => {
  return await Assignment.create(data);
};

export const getAssignmentsByCourse = async (courseId) => {
  return await Assignment.find({ course: courseId }).populate("course");
};

export const getAssignmentById = async (id) => {
  return await Assignment.findById(id).populate("course");
};

export const updateAssignment = async (id, data) => {
  return await Assignment.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAssignment = async (id) => {
  return await Assignment.findByIdAndDelete(id);
};
