import mongoose from "mongoose";
const { Schema } = mongoose;

const peonBookSchema = new Schema({
  number: {
    type: Number,
    required: true, // Use "required" instead of "require".
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  
  description: {
    type: String,
    required: true,
  },
  file_upload: {
    type: String,
    require: true,
  },
  dateAndTime: {
    type: Date,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
});

const peonModal = mongoose.model("peonModal", peonBookSchema);
export default peonModal;
