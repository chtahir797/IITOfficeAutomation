import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Login from "./pages/Login";
import Admin from "./pages/admin";
import Complaints from "./pages/complaints";
import Users from "./pages/users";
import Register from "./pages/register";
import Peon from "./pages/peon";
import Attandance from "./pages/attandance";
import LogoutPage from "./pages/logout";
import Forgot from "./pages/forgot";
import ComplaintForm from "./pages/ComplaintForm";
import RegisterDispatch from "./pages/DiaryDispatch";
import PeonRegister from "./pages/DiaryPeon"
import MarkAttandance from "./pages/MarkAttandance";
import ShowAttandance from "./pages/ViewAttandance";
import SeeAttandance from "./pages/SeeAttandance";
import VerifiedPage from "./pages/VerifiedPage";
import NotVerifiedPage from "./pages/NotVerifiedPage";
import authService from "./components/authService";
import CheckStatus from "./components/CheckStatus";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import ContactForm from "./pages/ContactUs";
import ContactManager from "./pages/ContactManager";
import ComplaintManager from "./pages/ComplaintManager";
import AboutUs from "./pages/AboutUs";
const PrivateRoute = ({ element, userType, ...rest }) => {
  const userData = authService.getUserData();
  if (authService.isAuthenticated() && userData.userType === userType) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Routes for every users  */}
      <Route path="/" exact element={<App />}></Route>
      <Route path="*" element={<main>Nothing to show here. ....</main>} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/checkstatus" element={<CheckStatus />}></Route>
      <Route path="/logout" element={<LogoutPage />}></Route>
      <Route path="/resetPassword" element={<Forgot />}></Route>
      <Route path="/complaintform" element={<ComplaintForm />} />
      <Route path="/contactus" element={<ContactForm />} />
      <Route path="/verified" element={<VerifiedPage />} />
      <Route path="/notverified" element={<NotVerifiedPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      {/* admin routes  */}
      <Route path="/admin" element={<PrivateRoute userType="director" element={<Admin />} />} />
      <Route path="/users" element={<PrivateRoute userType="director" element={<Users />} />} />
      <Route path="/complaints" element={<PrivateRoute userType="director" element={<Complaints />} />} />
      <Route path="/register" element={<PrivateRoute userType="director" element={<Register />} />} />
      <Route path="/peon" element={<PrivateRoute userType="director" element={<Peon />} />} />
      <Route path="/allattandance" element={<PrivateRoute userType="director" element={<Attandance />} />} />
      <Route path="/seeattandance" element={<PrivateRoute userType="director" element={<SeeAttandance />} />} />
      {/* ... existing routes ... */}
      {/* New for Diary Manager */}
      <Route path="/peonBook" element={<PrivateRoute userType="diary-manager" element={<PeonRegister />} />} />
      <Route path="/dispatchRegister" element={<PrivateRoute userType="diary-manager" element={<RegisterDispatch />} />} />
      {/* New for Contact Manager */}
      <Route path="/viewcontacts" element={<PrivateRoute userType="contact-manager" element={<ContactManager/>} />} />
      <Route path="/viewcomplaints" element={<PrivateRoute userType="contact-manager" element={<ComplaintManager />} />} />
      {/* ... existing routes ... */}
      {/* New for Attendance Manager */}
      <Route path="/attendancemanager" element={<PrivateRoute userType="attendance-manager" element={<MarkAttandance />} />} />
      <Route path="/viewattandance" element={<PrivateRoute userType="attendance-manager" element={<ShowAttandance />} />} />
    </Routes>
  </BrowserRouter>
);










