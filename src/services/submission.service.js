import Submission from "../models/submission.model.js";

export const submitAssignment = async (data) => {
  return await Submission.create(data);
};

export const getSubmissionsByAssignment = async (assignmentId) => {
  return await Submission.find({ assignment: assignmentId })
    .populate("student")
    .populate("assignment");
};

export const gradeSubmission = async (id, grade) => {
  return await Submission.findByIdAndUpdate(id, { grade }, { new: true });
};
