import mongoose from "mongoose";

const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creditHours: {
      type: Number,
      required: true,
      min: 1,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
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
