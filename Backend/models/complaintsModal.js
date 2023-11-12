import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const complaintSchema = new Schema({
  complaintNature: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  replies: [
    {
      text: String,
      createdAt: Date,
    },
  ],
});

complaintSchema.plugin(mongoosePaginate);

const ComplaintModal = mongoose.model("Complaint", complaintSchema);
export default ComplaintModal;





