import Otp from "../models/Otp.js";
import jwt from "jsonwebtoken";

export const checkOtp = async (req, res) => {
  const token = req.cookies.access_token;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT);
    const uid = decodedToken.id;
    const otp = req.params.otp;
    try {
      const oneOtp = await Otp.findOne({ uid, otp });
      if (oneOtp) {
        // otp verified
        res.status(200).json(true);
      } else {
        // otp not verified
        res.status(400).json(false);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(false);
    }
  } else {
     // unauthorized access
    res.status(401).json(false);
  }
};
