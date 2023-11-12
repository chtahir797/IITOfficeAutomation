import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "./Useful";
import BaseUrl from "./BaseUrl";

function Complaint() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7; // Number of complaints to show per page

  // State to manage reply popup
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  const openReplyPopup = (complaintId) => {
    setSelectedComplaintId(complaintId);
    setShowReplyPopup(true);
  };

  const closeReplyPopup = () => {
    setSelectedComplaintId(null);
    setReplyText("");
    setShowReplyPopup(false);
  };


  const submitReply = () => {
    if (!replyText.trim()) {
      toast.error("Please enter a valid reply.");
      return;
    }

    // Make an API call to submit the reply for selectedComplaintId
    axios
      .post(
        `${BaseUrl}/complaints/${selectedComplaintId}/reply`,
        { reply: replyText },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Reply submitted successfully.");
        // Filter out the complaint that was replied to
        // setComplaints(complaints.filter(complaint => complaint._id !== selectedComplaintId));
        closeReplyPopup();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to submit reply.");
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/complaints/all`, { withCredentials: true });
      console.log("API Response:", response.data);
      if (response.data && response.data.docs) {
        // Sort the complaints in descending order based on createdAt
        const sortedComplaints = response.data.docs.reverse();
        const reversedData = response.data.docs;

        setComplaints(reversedData);
      } else {
        console.log("Invalid API response format");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const handleDelete = (complaintId) => {
    axios
      .delete(`${BaseUrl}/complaints/${complaintId}`, { withCredentials: true, })
      .then(() => {
        fetchData(); // Fetch updated complaints after successful deletion
        toast.success('Deleted Successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleBlock = (complaintId) => {
    axios
      .patch(`${BaseUrl}/complaints/${complaintId}/block`, null, { withCredentials: true })
      .then(() => {
        fetchData();
        toast.success('Blocked Successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Block Failed');
      });
  };

  const handleUnblock = (complaintId) => {
    axios
      .patch(`${BaseUrl}/complaints/${complaintId}/unblock`, null, { withCredentials: true })
      .then(() => {
        fetchData();
        toast.success('Unblocked Successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Unblock Failed');
      });
  };


  // Get current complaints based on currentPage
  const indexOfLastComplaint = currentPage * usersPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - usersPerPage;
  const currentComplaints = complaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  const hasMoreNextComplaints = complaints.length > usersPerPage * currentPage;
  const hasPreviousComplaints = currentPage > 1;

  // Next page button
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Previous page button
  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <div className="w-full">
          <p className="text-xl pb-3 flex items-center">
            <i className="fas fa-list mr-3"></i> All Complaints
          </p>
          {loading ? (
            <Loader />
          ) : (
            <div className="bg-white overflow-auto">
              <table className="min-w-full bg-white">
                {/* Table headers */}
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      IP
                    </th>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Complaint Nature
                    </th>
                    <th className=" w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Comment
                    </th>
                    <th className=" w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-gray-700">
                  {currentComplaints.map((item, index) => (
                    <tr key={index}>
                      <td className="text-left py-3 px-4">{item.ip}</td>
                      <td className="w-1/3 text-left py-3 px-4">
                        {item.complaintNature}
                      </td>
                      <td className="text-left py-3 px-4">{item.comment}</td>
                      <td className="text-left py-3 px-4 flex">
                        {!item.isBlocked ? (
                          <>
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-green-600 rounded mr-2"
                              type="button"
                              onClick={() => openReplyPopup(item._id)}
                            >
                              Reply
                            </button>
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-red-600 rounded mr-2"
                              type="button"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-yellow-600 rounded"
                              type="button"
                              onClick={() => handleBlock(item._id)}
                            >
                              Block
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-red-600 rounded mr-2"
                              type="button"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-green-600 rounded"
                              type="button"
                              onClick={() => handleUnblock(item._id)}
                            >
                              Unblock
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-between items-center">
            <Navigate
              handlePreviousPage={handlePreviousPage}
              showPreviousButton={hasPreviousComplaints}
            />
            <Navigate
              handleNextPage={handleNextPage}
              showNextButton={hasMoreNextComplaints}
            />
          </div>
        </div>
      </main>
      {/* {showReplyPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Enter Reply</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded text-white"
                onClick={closeReplyPopup}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 rounded text-white"
                onClick={submitReply}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )} */}

      {showReplyPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Enter Reply</h2>
            <textarea
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded mb-4 resize-none focus:outline-none focus:ring focus:border-blue-500"
              rows="4"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here..."
            />
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-white font-semibold bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-500"
                onClick={closeReplyPopup}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white font-semibold bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500"
                onClick={submitReply}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Complaint;