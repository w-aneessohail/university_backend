import mongoose from "mongoose";
const { Schema, model } = mongoose;

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: true,
      trim: true,
    },
    head: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  { timestamps: true },
);

export default model("Department", departmentSchema);
