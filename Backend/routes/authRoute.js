import express from "express";
import { login, logout } from "../controllers/authController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utitls/verifyToken.js";
const router = express.Router();

router.post("/login", login);
router.get("/logout", verifyToken, logout);

router.post("/", verifyToken, (req, res) => {
  res.send("You are logedin");
});
router.post("/verify/:id", verifyToken, verifyUser, (req, res) => {
  res.status(201).send("User is verified");
});
router.post("/admin/:id", verifyAdmin, (req, res) => {
  res.send("User is admin");
});
export default router;

