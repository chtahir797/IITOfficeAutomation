import express from "express";
import { verifyToken } from "../utitls/verifyToken.js";
import { verifyUserRole } from "../controllers/verifyuserController.js";
const router = express.Router();
import {
  getComplaintDetails, 
  submitComplaint,
  getAllComplaints,
  deleteComplaint,
  blockComplaint,
  unblockComplaint,
  checkBlockStatus,
  submitReply,
} from "../controllers/complaintsController.js";
router.patch("/:complaintId/block",verifyToken, verifyUserRole(["director", "admin", "contact-manager"]), blockComplaint);
router.patch("/:complaintId/unblock", verifyToken, verifyUserRole(["director", "admin", "contact-manager"]), unblockComplaint);
router.post("/submit", submitComplaint);
router.get("/all", verifyToken, verifyUserRole(["director", "admin", "contact-manager"]), getAllComplaints);
router.delete("/:complaintId", deleteComplaint);
router.get("/block-status", checkBlockStatus);
router.get("/:complaintId", getComplaintDetails);
router.post("/:complaintId/reply",verifyToken, verifyUserRole(["director", "admin", "contact-manager"]), submitReply);
export default router;
