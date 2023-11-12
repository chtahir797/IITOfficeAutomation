import express from 'express';
import multer from "multer";
import { submitContactForm, submitContactReply, getAllComplaints, deleteContact } from '../controllers/contactusController.js';
import { verifyToken } from "../utitls/verifyToken.js";
import { verifyUserRole } from "../controllers/verifyuserController.js";
//Multer Middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../api/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();
router.post('/submitContactForm', upload.single('file_upload'), submitContactForm);
router.post("/:id/reply", verifyToken, verifyUserRole(["director", "admin", "contact-manager"]), submitContactReply);
router.get("/",verifyToken, verifyUserRole(["director", "admin", "contact-manager"]), getAllComplaints)
router.delete('/:id', deleteContact);

export default router;
