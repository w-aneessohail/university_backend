import mongoose from "mongoose";
const { Schema, model } = mongoose;

const assessmentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Assessment title is required"],
    },

    type: {
      type: String,
      enum: [
        "quiz",
        "assignment",
        "midterm",
        "final",
        "project",
        "presentation",
        "lab",
        "viva",
        "other",
      ],
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },

    weightage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    dueDate: {
      type: Date,
    },

    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model("Assessment", assessmentSchema);
