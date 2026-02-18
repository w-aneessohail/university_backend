import mongoose from "mongoose";

const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Course code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    creditHours: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default model("Course", courseSchema);
