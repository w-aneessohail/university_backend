import Course from "../models/course.model.js";

export const createCourse = async (data) => {
  return await Course.create(data);
};

export const getAllCourses = async () => {
  return await Course.find().populate("teacher");
};

export const getCourseById = async (id) => {
  return await Course.findById(id).populate("teacher");
};

export const updateCourse = async (id, data) => {
  return await Course.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};
