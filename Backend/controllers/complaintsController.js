

import ComplaintModal from "../models/complaintsModal.js";
import mongoose from 'mongoose';
import cache from "memory-cache";

const isComplaintLimitExceeded = (ip) => {
  const submissionInfo = cache.get(ip);

  if (!submissionInfo) {
    return false; 
  }

  const { count, lastSubmissionTime } = submissionInfo;
  const now = Date.now();
  const timeDifference = now - lastSubmissionTime;
  const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000;
  return count >= 3 && timeDifference < twelveHoursInMilliseconds;
};


export const submitComplaint = async (req, res) => {
  try {
    const { complaintNature, comment, ip } = req.body;
    const blockedComplaint = await ComplaintModal.findOne({ ip, isBlocked: true });
    if (blockedComplaint) {
      return res.json({ success: false, blocked: true });
    }

    if (isComplaintLimitExceeded(ip)) {
      return res.json({ success: false, message: "You can only submit 3 complaints within 12 hours." });
    }

    const newComplaint = new ComplaintModal({
      complaintNature,
      comment,
      ip,
      isBlocked: false,
    });

    const savedComplaint = await newComplaint.save();
    const submissionInfo = cache.get(ip) || { count: 0, lastSubmissionTime: 0 };
    submissionInfo.count += 1;
    submissionInfo.lastSubmissionTime = Date.now();
    cache.put(ip, submissionInfo);
    return res.json({ success: true, complaint: savedComplaint });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }, 
    };

    const complaints = await ComplaintModal.paginate({}, options);
    return res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const deletedComplaint = await ComplaintModal.findByIdAndDelete(complaintId);
    if (!deletedComplaint) {
      return res.status(404).json({ error: "Complaint not found." });
    }
    return res.json({ message: "Complaint deleted successfully." });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const blockComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    if (!complaintId || !mongoose.isValidObjectId(complaintId)) {
      return res.status(400).json({ error: "Invalid complaintId." });
    }

    const updatedComplaint = await ComplaintModal.findByIdAndUpdate(
      complaintId,
      { $set: { isBlocked: true } }, 
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found." });
    }

    return res.json({ message: "Complaint blocked successfully.", complaint: updatedComplaint });
  } catch (error) {
    console.error("Error blocking complaint:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const unblockComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    if (!complaintId || !mongoose.isValidObjectId(complaintId)) {
      return res.status(400).json({ error: "Invalid complaintId." });
    }

    const updatedComplaint = await ComplaintModal.findByIdAndUpdate(
      complaintId,
      { $set: { isBlocked: false } }, 
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found." });
    }

    return res.json({ message: "Complaint unblocked successfully.", complaint: updatedComplaint });
  } catch (error) {
    console.error("Error unblocking complaint:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


export const checkBlockStatus = async (req, res) => {
  try {
    const { ip } = req.query;
    if (!ip) {
      return res.status(400).json({ error: "IP address is required." });
    }

    const blockedComplaint = await ComplaintModal.findOne({ ip, isBlocked: true });
    return res.json({ blocked: !!blockedComplaint });
  } catch (error) {
    console.error("Error checking block status:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getComplaintDetails = async (req, res) => {
  try {
    const { complaintId } = req.params;

    if (!mongoose.isValidObjectId(complaintId)) {
      return res.status(400).json({ error: "Invalid complaintId." });
    }

    const complaint = await ComplaintModal.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found." });
    }

    return res.json({ success: true, complaint });
  } catch (error) {
    console.error("Error fetching complaint details:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const submitReply = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { reply } = req.body;

    if (!mongoose.isValidObjectId(complaintId)) {
      return res.status(400).json({ error: "Invalid complaintId." });
    }

    const updatedComplaint = await ComplaintModal.findByIdAndUpdate(
      complaintId,
      { $push: { replies: { text: reply, createdAt: new Date() } } },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found." });
    }

    return res.json({ success: true, message: "Reply submitted successfully.", complaint: updatedComplaint });
  } catch (error) {
    console.error("Error submitting reply:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
