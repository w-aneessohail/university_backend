import mongoose from "mongoose";
const { Schema, model } = mongoose;

const resultSchema = new Schema(
  {
    enrollment: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    assessment: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },
    marksObtained: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

resultSchema.index({ enrollment: 1, assessment: 1 }, { unique: true });

export default model("Result", resultSchema);
