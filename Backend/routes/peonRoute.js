import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import peonModal from "../models/peonModal.js";
import { verifyToken } from "../utitls/verifyToken.js";
import { verifyUserRole } from "../controllers/verifyuserController.js";
import { createpeonBook, updatepeonBook, deletepeonBook, onepeonBook, peonBooks, } from "../controllers/peonController.js";

// Middleware
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
router.post("/", upload.single("file_upload"), createpeonBook);
router.get("/",verifyToken, verifyUserRole(["diary-manager", "director", "admin"]), peonBooks);
router.patch("/:id",verifyToken, verifyUserRole(["diary-manager", "director", "admin"]), updatepeonBook);
router.delete("/:id",verifyToken, verifyUserRole(["diary-manager", "director", "admin"]), deletepeonBook);
router.get("/:id",verifyToken, verifyUserRole(["diary-manager", "director", "admin"]), onepeonBook);

router.get("/verify/:token", async (req, res, next) => {
  const { token } = req.params;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT);
    const { email, uid } = decodedToken;
    const record = await peonModal.findOneAndUpdate(
      { email, _id: uid, isVerified: false },
      { isVerified: true, verificationToken: "" }
    );
    if (!record) {
      // Redirect the user to the specified URL
      return res.redirect(`${process.env.FRONT_END}/notverified`);
    }
    res.redirect(`${process.env.FRONT_END}/verified`); // Redirect to the frontend home page or any other suitable page.
  } catch (error) {
    next(error);
  }
});

export default router;
