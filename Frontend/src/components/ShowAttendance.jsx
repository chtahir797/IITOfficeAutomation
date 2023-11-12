import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiDownload } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImagePopup } from "./Useful"
import BaseUrl from "./BaseUrl";
function ShowAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dataNotFound, setDataNotFound] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/users/`, {
        withCredentials: true,
      });
      const attendanceUsers = response.data.filter(
        (user) => user.userType === "attendance-user"
      );
      setAllUsers(attendanceUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
  };

  const handleDateRangeSubmit = () => {
    if (!selectedUser) {
      toast.error("Please select a user before showing attendance.");
      return;
    }

    fetchAttendance(selectedUser, startDate, endDate);
  };


  const fetchAttendance = (userId, startDate, endDate) => {
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();

    axios
      .get(`${BaseUrl}/attendance/${userId}`, {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
        withCredentials: true,
      }, )
      .then((response) => {
        setDataNotFound(response.data.length === 0);
        setAttendance(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const exportAttendance = () => {
    setIsExporting(true);

    const formattedStartDate = startDate ? new Date(startDate).toISOString() : "";
    let formattedEndDate = endDate ? new Date(endDate).toISOString() : "";
    

    

    axios
      .get(`${BaseUrl}/attendance/export`, {
        params: {
          selectedUser,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }, 
        withCredentials: true,
        responseType: "blob", // Set the response type to 'blob' to get binary data
      })
      .then((response) => {
        setIsExporting(false);

        // Create a Blob from the response data
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "attendance.xlsx");
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Cleanup the URL and link
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        setIsExporting(false);
        console.log(error);
      });
  };

  const formatTime = (timeString, type) => {
    const date = new Date(timeString);
    if (type === "date") {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    } else if (type === "time") {
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      return formattedTime;
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">View Attendance</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white p-6 shadow sm:rounded-lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                Select User
              </label>
              <select
                id="user"
                name="user"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={handleUserChange}
                value={selectedUser}
              >
                <option value="">All Users</option>
                {allUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-input py-2 px-4 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="form-input py-2 px-4 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              className={`flex-shrink-0 px-4 py-2 border rounded-md ${!startDate || !endDate || isExporting
                  ? "bg-indigo-200 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-800"
                }`}
              onClick={handleDateRangeSubmit}
              disabled={!startDate || !endDate || isExporting}
            >
              Show Attendance
            </button>
            <button
              className={`flex-shrink-0 ml-4 px-4 py-2 border rounded-md ${isExporting
                  ? "bg-indigo-200 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 active:bg-indigo-800"
                }`}
              onClick={exportAttendance}
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : <FiDownload className="mr-2 inline-block" />} Export
            </button>
          </div>
          {dataNotFound ? (
            <div className="mt-6 text-xl text-center text-red-500">Data not found.</div>
          ) : (
            <div className="mt-6 overflow-x-auto max-h-80">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Time In
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Time Out
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      File
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendance.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatTime(item.date, "date")}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatTime(item.IncommingTime, "time")}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatTime(item.leavingTime, "time")}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.file_upload && (
                          <img
                            src={item.file_upload}
                            alt=""
                            onClick={() => handleOpenImagePopup(item.file_upload)}
                            className="cursor-pointer max-h-10 w-auto"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
            </div>
          )}
          {/* New ImagePopup component */}
          {showImagePopup && (
            <ImagePopup imageUrl={popupImageUrl} onClose={handleCloseImagePopup} />
          )}
        </div>
      </main>
    </div>
  );
}
export default ShowAttendance;
