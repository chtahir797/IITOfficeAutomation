import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Reset from "../models/Reset.js";
import {EMAIL, PASSWORD} from "../.env.js"

//send otp
export const resetPassword = async (req, res) => {
  const email = req.params.email;
  const otp = Math.floor(100000 + Math.random() * 900000);
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    },
  });
  // send mail to email fetching from form
  let info = await transporter.sendMail({
    from: '"IIT Office 👻" <admin@iitoffice.com>', 
    to: email, 
    subject: "Your otp code for verification", 
    text: `Your OTP for verification is ${otp}. Please enter it on the verification page to proceed.`, 
    html: `Your OTP for verification is ${otp}. Please enter it on the verification page to proceed.`, 
  });
  
  await Reset.deleteMany({ email });
  const newOtp = new Reset({ otp, email });

  try {
    const saveOtp = await newOtp.save();
    res.status(201).json({ otp: otp, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Error occurred while generating OTP" });
  }
};
