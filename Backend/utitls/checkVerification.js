

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { EMAIL, PASSWORD, } from "../.env.js";

const generateVerificationLink = async (email, uid, formdata, file) => {
  const verificationToken = jwt.sign({ email, uid }, process.env.JWT, {
    expiresIn: "2h", // Verification token expires in 2 hour
  });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  try {
    const verificationLink = `${process.env.BACK_END}/api/peonBook/verify/${verificationToken}`;

    const fileLink = file ? `${process.env.BACK_END}/uploads/${file.filename}` : "";

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #007bff;">IIT Office - Document Verification</h2>
        <p>Please click on the following link to verify your document:</p>
        <button style="background-color: #007bff; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
  <a href="${verificationLink}" style="color: inherit; text-decoration: none;">Click here to verify</a>
</button>

        
        <h3 style="color: #007bff; margin-top: 20px;">Form Data:</h3>
        <ul style="list-style-type: none; padding-left: 0;">
          <li><strong>Number:</strong> ${formdata.number}</li>
          <li><strong>Name:</strong> ${formdata.name}</li>
          <li><strong>Description:</strong> ${formdata.description}</li>
          <button style="background-color: #007bff; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
  <a href="${fileLink}" style="color: inherit; text-decoration: none;">Click here view document</a>
</button>
          
         
        </ul>
      </div>
    `;

    let info = await transporter.sendMail({
      from: '"IIT Office 👻" <admin@iitoffice.com>',
      to: email,
      subject: "Verification Link and Form Data",
      text: "Please click on the following link to verify your document: " + verificationLink,
      html: emailTemplate,
    });

    return {
      success: true,
      message: verificationLink,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to send verification link and form data." };
  }
};

export default generateVerificationLink;












