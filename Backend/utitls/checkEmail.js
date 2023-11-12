
import Reset from "../models/Reset.js";
import jwt from "jsonwebtoken";

export const checkEmail = async (req, res) => {
  console.log(req.query);
  const { email, otp } = req.query;
  try {
    const savedOtp = await Reset.findOne({ email, otp });
    if (savedOtp) {
      // If the OTP exists for the given email, send success response
      res.status(200).json({ success: true });
    } else {
      // If the OTP does not match or the email is not found, send failure response
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

