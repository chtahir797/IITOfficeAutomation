import User from "../models/usersModal.js";
import bcrypt from "bcryptjs";
export const addUsers = async (req, res, next) => {
  try {
    const { name, email, password, userType, phoneNo } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
    const existingPhone = await User.findOne({ phoneNo });
    if (existingPhone) {
      return res.status(410).json({ message: "Phone number already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      name,
      email,
      phoneNo,
      password: hash,
      userType,      
    });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    next(error);
  }
};

export const allUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted");
  } catch (error) {
    next(error);
  }
};
export const oneUser = async (req, res, next) => {
  try {
    const UserData = await User.findById(req.params.id);
    res.status(200).json(UserData);
  } catch (error) {
    next(error);
  }
};
export const updatePassword = async (req, res, next) => {
  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const email = req.params.email;
    console.log(email);
    console.log(req.body.password);
    const updateUser = await User.findOneAndUpdate(
      { email },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};
export const selectAttendanceUsers = async (req, res, next) => {
  try {
    const attendanceUsers = await User.find({ userType: "attendance-user" });
    res.status(200).json(attendanceUsers);
  } catch (error) {
    next(error);
  }
};