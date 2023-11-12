import Attendance from "../models/attendanceModal.js";
import { resolve } from "path";
import xlsx from "xlsx";




export const addAttandance = async (req, res, next) => {
  try {
    const { e_id, date } = req.body;
    const existingAttendance = await Attendance.findOne({ e_id, date });
    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already marked for today" });
    }
    const newAttendance = new Attendance({
      e_id: req.body.e_id,
      name: req.body.name,
      date: req.body.date,
      leavingTime: new Date(req.body.date + "T16:00:00"), 
      IncommingTime: req.body.IncommingTime,
      status: req.body.status,
      file_upload: req.body.file_upload, 
    });
    if (req.file) {
      const fileUrl = `${process.env.BACK_END}/uploads/${req.file.filename}`;
      newAttendance.file_upload = fileUrl;
    }
    const savedAttendance = await newAttendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    next(error);
  }
};

export const singleAttandance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    let query = { e_id: id };

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const userAttendance = await Attendance.find(query);
    res.status(200).json(userAttendance);
  } catch (error) {
    next(error);
  }
};

export const selectAttendanceUsers = async (req, res, next) => {
  try {
    const attendanceUsers = await usersModal.find({ userType: "attendance-user" });
    res.status(200).json(attendanceUsers);
  } catch (error) {
    next(error);
  }
};

export const allAttandance = async (req, res, next) => {
  try {
    const AllAttandance = await Attendance.find();
    res.status(200).json(AllAttandance);
  } catch (error) {
    next(error);
  }
};

export const updateAttandance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { leavingTime } = req.body; 
    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    if (attendance.leavingTimeUpdates >= 1) {
      return res.status(400).json({ message: "You cannot update Leaving Time now" });
    }
    attendance.leavingTimeUpdates += 1;
    attendance.leavingTime = leavingTime || new Date().toISOString();
    const updatedAttendance = await attendance.save();
    res.status(200).json(updatedAttendance);
  } catch (error) {
    next(error);
  }
};

export const exportAttandance = async (req, res, next) => {
  try {
    const { selectedUser, startDate, endDate } = req.query;
    if (!Date.parse(startDate) || !Date.parse(endDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    const query = {
      e_id: selectedUser,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    };
    const userAttendance = await Attendance.find(query);
    if (userAttendance.length === 0) {
      return res
        .status(404)
        .json({ message: "Attendance not found for the selected user and date range." });
    }
    const formattedData = userAttendance.map((item) => ({
      Name: item.name,
      Date: item.date ? formatDate(item.date) : "N/A",
      "Time In": item.IncommingTime ? formatTime(item.IncommingTime) : "N/A",
      "Time Out": item.leavingTime ? formatTime(item.leavingTime) : "N/A",
      Status: item.status,
      file_upload: item.file_upload,
    }));
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(formattedData);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Attendance");
    const excelData = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=attendance.xlsx`);
    res.setHeader("Content-Length", excelData.length);
    res.end(excelData);
  } catch (error) {
    next(error);
  }
};

function formatTime(timeString) {
  const date = new Date(timeString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}
