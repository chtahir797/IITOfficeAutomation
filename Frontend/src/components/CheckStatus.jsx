import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import UserModal from "../modals/UserModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import BaseUrl from "./BaseUrl";
function CheckStatus() {
  const [complaintId, setComplaintId] = useState("");
  const [loading, setLoading] = useState(false);
  const [complaintDetails, setComplaintDetails] = useState(null);
  const [replyModal, setReplyModal] = useState(false);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const fetchComplaintDetails = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${BaseUrl}/complaints/${complaintId}`
      );

      if (response.data.success) {
        setLoading(false);
        setComplaintDetails(response.data.complaint);
        setReplyModal(true);
      } else {
        setLoading(false);
        setComplaintDetails(null);
        toast.error("Complaint not found"); // Display error message here
      }
      
    } catch (error) {
      setLoading(false);
      toast.error("Complaint not found");
      console.log(error);
      setComplaintDetails(null);
    }
  };

  const closeModal = async () => {
    setReplyModal(false);

    if (complaintDetails && complaintDetails.replies && complaintDetails.replies.length > 0) {
      try {
        await axios.delete(`${BaseUrl}/complaints/${complaintId}`);
        toast.success("Complaint deleted successfully.");
      } catch (error) {
        toast.error("An error occurred while deleting the complaint.");
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900 flex-grow flex justify-center items-center px-6 py-8 md:h-screen lg:py-0 lg:px-16">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Check Your Status Here
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchComplaintDetails();
                }}
              >
                <div>
                  <label
                    htmlFor="complaintId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Complaint ID
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Complaint ID"
                    value={complaintId}
                    onChange={(event) => setComplaintId(event.target.value)}
                    required
                  />
                </div>
                <button
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Check Status
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
      <UserModal isOpen={replyModal} onClose={() => setReplyModal(!replyModal)}>
        <div className="p-6">
          <div className="flex flex-wrap">
            <div className="">
              <div className="leading-loose">
                {complaintDetails && (
                  <div className="">
                    <h2 className="text-lg font-bold">Complaint Details:</h2>
                    <p>Complaint Nature: {complaintDetails.complaintNature}</p>
                    <p>Comment: {complaintDetails.comment}</p>
                    <h3 className="text-md font-semibold mt-4">Replies:</h3>
                    {complaintDetails.replies && complaintDetails.replies.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {complaintDetails.replies.map((reply, index) => (
                          <li key={index}>{reply.text}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No replies yet.</p>
                    )}
                    <button
                      className="px-4 py-1 mt-2 text-white font-light tracking-wider bg-gray-900 rounded"
                      type="submit"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </UserModal>
      <ToastContainer />
    </div>
  );
}

export default CheckStatus;
