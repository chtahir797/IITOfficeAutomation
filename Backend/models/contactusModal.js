// import mongoose from "mongoose";
// const { Schema } = mongoose; // Use destructuring to get Schema from mongoose.

// const contactUsSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     subject: {
//         type: String,
//         required: true,
//     },
//     userAvatar: {
//         type: String, // You might store the file path or other relevant information
//     },
//     message: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const ContactModal = mongoose.model('ContactUs', contactUsSchema);

// export default ContactModal;

// contactUsModel.js
import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
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
  message: {
    type: String,
    required: true,
  },
  replies: [
    {
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

export default ContactUs;
