import mongoose from "mongoose";
const { Schema } = mongoose; // Use destructuring to get Schema from mongoose.

const dispatchRegisterSchema = new Schema({
  number: {
    type: Number,
    required: true, // Use "required" instead of "require".
  },
  designation: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  file_upload: {
    type: String,
    require: true,
  },
  dateAndTime: { 
    type: Date, 
    required: true },
});

const dispatchModal = mongoose.model("dispatchModal", dispatchRegisterSchema);
export default dispatchModal;
