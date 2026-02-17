import mongoose from "mongoose";

const { Schema, model } = mongoose;

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
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
