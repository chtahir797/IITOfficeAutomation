import mongoose from "mongoose";
import { Schema } from "mongoose";
const otp = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Otp = mongoose.model("Otp", otp);
export default Otp;
