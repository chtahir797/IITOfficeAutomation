import User from "../models/usersModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utitls/error.js";

export const login = async (req, res, next) => {
  //Checking email and password 
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "User not found"));
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) return next(createError("400", "Password is wrong!"));
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        userType: user.userType, // Make sure userType is included here
      },
      process.env.JWT
    );
    // extract password and isAdmin detail
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
    .cookie("access_token", token, {
      httpOnly: false,
      expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
      secure: false, // Add this line
    })
    res.status(200)
    .json({ ...otherDetails });
  
  } catch (error) {
    next(error);
  }
};
//clear cookies after logout
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).send("You are logged out");
  } catch (error) {
    next(error);
  }
};

// export const logout = async (req, res, next) => {
//   try {
//     res.clearCookie("access_token");
//     res.status(200).send("you are logout");
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
