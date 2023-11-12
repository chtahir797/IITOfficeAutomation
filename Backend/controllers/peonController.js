import peonModal from "../models/peonModal.js";
import jwt from "jsonwebtoken";
import generateVerificationLink from "../utitls/checkVerification.js";

export const createpeonBook = async (req, res, next) => {
  try {
    const newpeonBook = new peonModal(req.body);
    const { email, _id } = newpeonBook;
    const { success, message } = await generateVerificationLink(email, _id, req.body, req.file);

    if (!success) {
      return res.status(500).json({ success: false, message });
    }

    if (req.file) {
      const fileUrl = `${process.env.BACK_END}/uploads/${req.file.filename}`;
      newpeonBook.file_upload = fileUrl;
    }
    newpeonBook.verificationToken = message;
    await newpeonBook.save();
    res.status(201).json({ success: true, message: "Record added successfully! Verification email sent." });
  } catch (error) {
    next(error);
  }
};

export const updatepeonBook = async (req, res, next) => {
  try {
    const updatepeonBook = await peonModal.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatepeonBook);
  } catch (error) {
    next(error);
  }
};

export const deletepeonBook = async (req, res, next) => {
  try {
    await peonModal.findByIdAndDelete(req.params.id);
    res.status(200).send("Post deleted");
  } catch (error) {
    next(error);
  }
};

export const onepeonBook = async (req, res, next) => {
  try {
    const onepeonBook = await peonModal.findById(req.params.id);
    res.status(200).json(onepeonBook);
  } catch (error) {
    next(error);
  }
};

export const peonBooks = async (req, res, next) => {
  try {
    const allpeonBook = await peonModal.find();
    res.status(200).json(allpeonBook);
  } catch (error) {
    next(error);
  }
};




