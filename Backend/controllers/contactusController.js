import ContactUs from '../models/contactusModal.js';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { EMAIL, PASSWORD } from "../.env.js";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const file_upload = req.file ? `${process.env.BACK_END}/uploads/${req.file.filename}` : null;

    const newSubmission = await ContactUs.create({ name, email, subject, message, file_upload });

    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(500).json({ message: 'Submission failed.' });
  }
};



export const submitContactReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const contact = await ContactUs.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    contact.replies.push({ text });
    await contact.save();
    const emailTemplate = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #007bff;">IIT Office - Reply to Your Query</h2>
      
      <h3>Our Reply</h3>
      <p>${text}</p>
      <h3>Your Information:</h3>
      <p>Name: ${contact.name}</p>
      <p>Email: ${contact.email}</p>
      <p>Subject: ${contact.subject}</p>
      <p>Message: ${contact.message}</p>
    </div>
  `;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

    // Check if file_upload exists before proceeding
    if (contact.file_upload) {
      const moduleFilePath = fileURLToPath(import.meta.url);
      const fileName = path.basename(contact.file_upload);
      const uploadsDirectory = path.join(path.dirname(moduleFilePath), '../uploads');
      const filePath = path.join(uploadsDirectory, fileName);

      // Read the file content
      const attachmentContent = await fs.readFile(filePath);

      const mailOptions = {
        from: '"IIT Office 👻" <admin@iitoffice.com>',
        to: contact.email,
        subject: 'Reply',
        html: emailTemplate,
        attachments: [
          {
            filename: fileName,
            content: attachmentContent,
          },
        ],
      };

      await transporter.sendMail(mailOptions);

      // Delete the file using the fs module after sending the email
      // await fs.unlink(filePath);
    }else {
      // If there's no attachment, send the email without the attachment
      const mailOptions = {
        from: '"IIT Office 👻" <admin@iitoffice.com>',
        to: contact.email,
        subject: 'Reply',
        html: emailTemplate,
      };
    
      await transporter.sendMail(mailOptions);
    }

    // await ContactUs.findByIdAndDelete(id);
    res.status(200).json({ message: 'Reply submitted successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit reply.' });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await ContactUs.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch complaints.' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await ContactUs.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    const fileUrl = deletedContact.file_upload;

    if (fileUrl) {
      const moduleFilePath = fileURLToPath(import.meta.url);
      const fileName = path.basename(fileUrl);
      const uploadsDirectory = path.join(path.dirname(moduleFilePath), '../uploads');
      const filePath = path.join(uploadsDirectory, fileName);

      // Check if the file exists before attempting to delete
      try {
        await fs.access(filePath);
        // File exists, so delete it
        await fs.unlink(filePath);
      } catch (error) {
        console.error('File not found or could not be deleted:', error);
      }
    }

    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Failed to delete contact.' });
  }
};



// export const deleteContact = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedContact = await ContactUs.findByIdAndDelete(id);

//     if (!deletedContact) {
//       return res.status(404).json({ message: 'Contact not found.' });
//     }

//     // Assuming 'fileUrl' is the field in your schema containing the file URL
//     const fileUrl = deletedContact.file_upload;

//     // Convert the module URL to a file path
//     const moduleFilePath = fileURLToPath(import.meta.url);
    
//     // Construct the full path to the file
//     const fileName = path.basename(fileUrl);
//     const uploadsDirectory = path.join(path.dirname(moduleFilePath), '../uploads');
//     const filePath = path.join(uploadsDirectory, fileName);

//     // Delete the file using the fs module
//     await fs.unlink(filePath);

//     res.status(200).json({ message: 'Contact deleted successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to delete contact.' });
//   }
// };