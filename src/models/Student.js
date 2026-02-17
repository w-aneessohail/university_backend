import mongoose from "mongoose";
const { Schema, model } = mongoose;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    age: {
      type: Number,
      min: 0,
    },
    enrolledCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true },
);

export default model("Student", studentSchema);
