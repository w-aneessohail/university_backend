import mongoose from "mongoose";
const { Schema, model } = mongoose;

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Teacher name is required"],
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    teachesCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true },
);

export default model("Teacher", teacherSchema);
