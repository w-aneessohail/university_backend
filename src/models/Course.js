import mongoose from "mongoose";
const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
    },
    creditHours: {
      type: Number,
      required: true,
      min: 1,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true },
);

export default model("Course", courseSchema);
