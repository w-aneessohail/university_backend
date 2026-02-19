import mongoose from "mongoose";

const { Schema, model } = mongoose;

const enrollmentSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    status: {
      type: String,
      enum: ["enrolled", "dropped", "completed"],
      default: "enrolled",
    },
    grade: {
      type: String,
      enum: ["A", "B", "C", "D", "F", null],
      default: null,
    },
  },
  { timestamps: true },
);

enrollmentSchema.index(
  { student: 1, course: 1, semester: 1 },
  { unique: true },
);

export default model("Enrollment", enrollmentSchema);
