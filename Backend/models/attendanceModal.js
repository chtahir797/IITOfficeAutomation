import mongoose from "mongoose";
const { Schema } = mongoose;

const attendanceSchema = new Schema(
  {
    e_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    leavingTime: {
      type: Date,
      default: null, // Initialize leavingTime as null
    },
    leavingTimeUpdates: {
      type: Number,
      default: 0, // Initialize leavingTimeUpdates counter as 0
    },
    IncommingTime: { // Changed from timeIn to IncommingTime
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "On Leave"],
      required: true,
    },
    file_upload: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
