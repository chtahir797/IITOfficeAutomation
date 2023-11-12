import express from "express";
import multer from "multer";
import {
  createdispatchRegister,
  updatedispatchRegister,
  deletedispatchRegister,
  onedispatchRegister,
  dispatchRegisters,
} from "../controllers/dispatchController.js";
const router = express.Router();
// Define the multer storage and upload middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../api/uploads"); // Save images in the "api/uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });
// to create a dispatchRegister (Dregister)
// router.post("/", createdispatchRegister);
router.post("/", upload.single("file_upload"), createdispatchRegister);

// to fetch all dispatchRegisters
router.get("/", dispatchRegisters);

// update data
router.patch("/:id", updatedispatchRegister);

// delete data
router.delete("/:id", deletedispatchRegister);

// to fetch a single dispatchRegister (Dregister) by ID
router.get("/:id", onedispatchRegister);

export default router;
