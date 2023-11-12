import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ImagePopup } from "./Useful"
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FiClock, FiUpload, FiCheck, FiX } from "react-icons/fi";
import BaseUrl from "./BaseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const data = JSON.parse(localStorage.getItem("data"));
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fileAttached, setFileAttached] = useState(false);
  const [timeOutClicked, setTimeOutClicked] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentDate(new Date().toISOString().slice(0, 10));
    fetchAllUsers();
  }, []);
  const handleOpenImagePopup = (imageUrl) => {
    setShowImagePopup(true);
    setPopupImageUrl(imageUrl);
  };
  // Function to close the image popup
  const handleCloseImagePopup = () => {
    setShowImagePopup(false);
    setPopupImageUrl("");
  };

  const fetchAllUsers = () => {
    axios
      .get(`${BaseUrl}/users/`, { withCredentials: true })
      .then((response) => {
        const attendanceUsers = response.data.filter((users) => users.userType === "attendance-user");
        setAllUsers(attendanceUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    setIsUserSelected(!!userId);
    fetchAttendance(userId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentDate = currentTime.toISOString().slice(0, 10);

    if (currentHours < 16) {
      if (selectedUser && (selectedUser.userType === "attendance-manager" || selectedUser.userType === "director")) {
        // window.alert("You cannot mark attendance for yourself.");
        toast.error('You cannot mark attendance for yourself.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else {
        confirmAlert({
          title: "Attendance Confirmation",
          message: "Please Mark The Attendance?",
          buttons: [
            {
              label: "Time In",
              onClick: () => markAttendance(selectedUser._id, "Present"),
            },
            {
              label: "Absent",
              onClick: () => markAttendance(selectedUser._id, "Absent"),
            },
            {
              label: "Leave",
              onClick: () => {
                setShowConfirmation(true);
              },
            },
          ],
        });
      }
    } else {
      toast.warn('Attendance cannot be marked after 4 PM.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      // window.alert("Please select a file before submitting.");
      toast.error('Please select a file before submitting.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }

    setShowConfirmation(false);
    setFileAttached(true);
    markAttendance(selectedUser._id, "On Leave", file); // Pass the file object directly
  };



  const markAttendance = (userId, status, fileData) => {
    const currentTime = new Date();
    const currentDate = currentTime.toISOString().slice(0, 10);
  
    if (!selectedUser) {
      console.error("No selected user.");
      return;
    }
  
    const attendanceData = new FormData(); // Use FormData to handle file uploads
    attendanceData.append("e_id", userId);
    attendanceData.append("name", selectedUser.name);
    attendanceData.append("date", currentDate);
    attendanceData.append("IncommingTime", currentTime.toISOString());
    attendanceData.append("status", status);
    attendanceData.append("longitude", longitude);
    attendanceData.append("latitude", latitude);
    if (status === "On Leave") {
      attendanceData.append("file_upload", fileData); // Append the file data
    }
  
    axios
      .post(`${BaseUrl}/attendance`, attendanceData, {
        withCredentials: true, // This is important
      })
      .then((response) => {
        // window.alert("Attendance Added");
        toast.success('Attendance Added', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        localStorage.setItem("attendanceDate", currentDate);
        setShowConfirmation(false);
        setFileAttached(false);
        fetchAttendance(userId);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // window.alert("Attendance already marked for today");
          toast.error('Attendance already marked for today', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        } else if (error.response && error.response.data && error.response.data.status === false) {
          // window.alert("You are not in the university area!");
          toast.warn('You are not in the university area!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        } else {
          console.log(error);
        }
      });
  };
  

  const handleTimeOut = (attendanceId) => {
    const sevenTwentyPMTime = new Date();
    sevenTwentyPMTime.setHours(16, 0, 0, 0);
    const currentTime = new Date();
    const isBeforeSevenTwentyPM = currentTime < sevenTwentyPMTime;
    if (currentDayAttendance[0].leavingTimeUpdates >= 1) {
      // window.alert("TimeOut already Set");
      toast.warn('TimeOut already Set', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }

    if (isBeforeSevenTwentyPM) {
      confirmAlert({
        title: "Time Out Confirmation",
        message: "Are you sure you want to set Time Out?",
        buttons: [
          {
            label: "Yes",
            onClick: () => setLeavingTime(attendanceId, currentTime.toISOString()),
          },
          {
            label: "No",
          },
        ],
      });
    }
  };


  const setLeavingTime = (attendanceId, leavingTime) => {
    axios
      .put(`${BaseUrl}/attendance/${attendanceId}`, {
        leavingTime,
      }, {
        withCredentials: true, // This is important
      })
      .then((response) => {
        const updatedAttendance = attendance.map((item) =>
          item._id === attendanceId ? { ...item, leavingTime } : item
        );
        setAttendance(updatedAttendance);
        const updatedTimeOutClicked = { ...timeOutClicked, [attendanceId]: true };
        setTimeOutClicked(updatedTimeOutClicked);
        localStorage.setItem("timeOutStatus", JSON.stringify(updatedTimeOutClicked));
        // window.alert(`Time Out set to ${formatTime(leavingTime)}.`);
        toast.info('Time Out set to ${formatTime(leavingTime)}.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const newDate = currentTime.toISOString().slice(0, 10);
      if (newDate !== currentDate) {
        setCurrentDate(newDate);
        if (selectedUser) {
          fetchAttendance(selectedUser._id);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentDate, selectedUser]);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  const fetchAttendance = (userId) => {
    axios
      .get(`${BaseUrl}/attendance/${userId}`, {
        params: {
          startDate: currentDate,
          endDate: currentDate,
        },
        withCredentials: true, // Corrected placement of withCredentials
      })
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        console.log(error);
      });


    axios
      .get(`${BaseUrl}/users/${userId}`, {
        withCredentials: true, // This is important
      })
      .then((response) => {
        setSelectedUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    const timeOutStatus = JSON.parse(localStorage.getItem("timeOutStatus")) || {};
    setTimeOutClicked(timeOutStatus);
  }, []);

  const currentDayAttendance = selectedUser
    ? attendance.filter(
      (item) => item.e_id === selectedUser._id && item.date.slice(0, 10) === currentDate
    )
    : [];


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {selectedUser ? `You have selected user ${selectedUser.name}` : "Welcome to Attendance System"}
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white p-6 shadow sm:rounded-lg">
          {!selectedUser && (
            <div className="flex items-center justify-center mt-4 mb-2 text-xl">
              Please select a user to load relevant data.
            </div>
          )}
          <div className="flex items-center justify-center">
            <div className="mt-1">

              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={handleUserChange}
                value={selectedUser ? selectedUser._id : ""}
              >
                <option value="">All Users</option>
                {allUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* {selectedUser && (
            <div className="flex items-center justify-center mt-4 mb-2 text-xl">
              Name: {selectedUser.name}, Email: {selectedUser.email}
            </div>
          )} */}
          {selectedUser && (
            <div className="mt-4  flex justify-between">
              <button
                onClick={handleSubmit}
                className={`flex items-center justify-center py-2 px-4 rounded-md shadow-lg hover:shadow-xl ${!isUserSelected ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"
                  }`}
                disabled={!isUserSelected}
              >
                <FiCheck className="mr-2" /> Add Attendance
              </button>
              {currentDayAttendance.length > 0 && currentDayAttendance[0].status === "Present" && (
                <button
                  onClick={() => handleTimeOut(currentDayAttendance[0]._id)}
                  className={`flex items-center justify-center py-2 px-4 ml-2 rounded-md shadow-lg hover:shadow-xl ${timeOutClicked[currentDayAttendance[0]._id] ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"
                    }`}
                  disabled={timeOutClicked[currentDayAttendance[0]._id]}
                >
                  <FiClock className="mr-2" /> Time Out
                </button>
              )}
            </div>
          )}
          {selectedUser && (
            <div className="mt-6 overflow-x-auto max-h-80">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentDayAttendance.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No attendance records found for the current day.
                      </td>
                    </tr>
                  ) : (
                    currentDayAttendance.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {format(new Date(item.date), "MMMM dd, yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatTime(item.IncommingTime)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.leavingTime ? formatTime(item.leavingTime) : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.file_upload && <img src={item.file_upload} onClick={() => handleOpenImagePopup(item.file_upload)} alt="" className="h-8 w-8" />}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {showConfirmation && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75"
            onClick={() => setShowConfirmation(false)}
          >
            <div className="bg-white p-4 rounded-lg shadow-md" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-semibold mb-4">Upload Leave Picture</h2>
              <div className="mt-2">
                <label className="text-sm text-gray-600" htmlFor="file-upload">
                  File Upload
                </label>
                <input
                  className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                  type="file"
                  name="myFile"
                  id="file-upload"
                  accept=".jpeg,.jpg,.png"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
              </div>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  markAttendance("On Leave", acceptedFiles[0]);
                }}
                disabled={!fileAttached}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {/* New ImagePopup component */}
        {showImagePopup && (
          <ImagePopup imageUrl={popupImageUrl} onClose={handleCloseImagePopup} />
        )}

      </main>
      <ToastContainer />
    </div>
  );
}
export default MyAttendance;




