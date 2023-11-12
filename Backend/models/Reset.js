import mongoose from "mongoose";
import { Schema } from "mongoose";
const reset = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    otp: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Reset = mongoose.model("Reset", reset);
export default Reset;
