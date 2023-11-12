import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Otp from "../models/Otp.js";
import {EMAIL, PASSWORD} from "../.env.js"



//send otp
export const userotp = async (req, res) => {
    const { email } = req.body; // Get the email from the request body
  console.log(email);
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp);
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"IIT Office 👻" <admin@iitoffice.com>', // sender address
    to: email, // list of receivers
    subject: "Your otp code for verification", // Subject line
    text: `Your OTP for verification is ${otp}. Please enter it on the verification page to proceed.`, // plain text body
    html: `Your OTP for verification is ${otp}. Please enter it on the verification page to proceed.`, // html body
  });
  const token = req.cookies.access_token;
  const decodedToken = jwt.verify(token, process.env.JWT);
  const uid = decodedToken.id;
  await Otp.deleteMany({ uid });
  const newOtp = new Otp({ otp, uid });
  try {
    const saveOtp = await newOtp.save();
    res.status(201).json(newOtp);
  } catch (error) {
    console.log(error);
  }
};

