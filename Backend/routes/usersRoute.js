import express from "express";
import {
  addUsers,
  allUsers,
  deleteUser,
  oneUser,
  updatePassword,
  updateUser,
  selectAttendanceUsers,
} from "../controllers/usersController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utitls/verifyToken.js";
import { verifyUserRole } from "../controllers/verifyuserController.js";
import { userotp } from "../utitls/userotp.js";
import { checkOtp } from "../utitls/checkOtp.js";
import { resetPassword } from "../utitls/reset.js";
import { checkEmail } from "../utitls/checkEmail.js";

const router = express.Router();

router.post("/",verifyToken, verifyUserRole(["director", "admin",]), addUsers);
router.get("/otp", verifyToken, verifyUserRole(["director", "admin", "attendance-manager"]), userotp);
router.get("/checkOtp/:otp", verifyToken, checkOtp);
router.get("/reset/:email", resetPassword);
router.get("/checkEmail", checkEmail);
router.post("/otp", userotp);
router.patch("/updatePassword/:email",  updatePassword);
router.get("/selectAttendanceUsers", verifyToken, verifyUserRole(["director", "admin", "attendance-manager"]), selectAttendanceUsers);
router.get("/", verifyToken, verifyUserRole(["director", "admin", "attendance-manager"]), allUsers);
router.get("/:id", verifyToken, verifyUserRole(["director", "admin", "attendance-manager"]), oneUser);
router.patch("/:id",verifyToken, verifyUserRole(["director", "admin",]), updateUser);
router.delete("/:id", verifyToken, verifyUserRole(["director", "admin",]), deleteUser);
export default router;
