import mongoose from "mongoose";
const { Schema, model } = mongoose;

const assignmentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Assignment title is required"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    grade: {
      type: Number,
      min: 0,
      max: 100,
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default model("Assignment", assignmentSchema);
