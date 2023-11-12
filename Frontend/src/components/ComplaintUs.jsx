import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import Header from "./Header";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserModal from "../modals/UserModal";

import BaseUrl from "./BaseUrl";


function ComplaintUs() {

  const [complaintNature, setComplaintNature] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedComplaintId, setSubmittedComplaintId] = useState(null); // State for storing the complaint ID
  const [idModal, setIdModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (complaintNature.trim() === "" || comment.trim() === "") {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      // Fetch the user's IP address using a public IP address API using ipify
      const response = await axios.get("https://api.ipify.org?format=json");
      const ipAddress = response.data.ip;

      // Check if the user is blocked
      const blockedResponse = await axios.get(`${BaseUrl}/complaints/block-status?ip=${ipAddress}`);
      if (blockedResponse.data.blocked) {
        // If the user is blocked, display an error message
        setErrorMessage("You are blocked and cannot submit a complaint.");
        setTimeout(() => {
          setErrorMessage("");
        }, 4000); // 4000 milliseconds = 4 seconds
        return;
      }

      // Make API request to submit the complaint with isBlocked set to false
      const submitResponse = await axios.post(`${BaseUrl}/complaints/submit`, {
        complaintNature,
        comment,
        ip: ipAddress, // Pass the user's IP address to the server
      });

      if (submitResponse.data.success) {
        // Clear form fields after successful submission
        setComplaintNature("");
        setComment("");
        setIdModal(true);
        // Update the state with the submitted complaint ID
        setSubmittedComplaintId(submitResponse.data.complaint._id);
        console.log("Complaint submitted successfully!");
        toast.success("Complaint submitted successfully!");
      } else {
        // Check if the complaint limit has been exceeded
        if (submitResponse.data.message === "You can only submit 3 complaints within 12 hours.") {
          toast.error("You can only submit 3 complaints within 12 hours.");
        } else {
          setErrorMessage("Failed to submit complaint. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setErrorMessage("Failed to submit complaint. Please try again.");
      toast.error("Failed to submit complaint. Please try again");
      setTimeout(() => setErrorMessage(""), 4000);
    }
  };

  const closeModal = async () => {
    setIdModal(false);
  };
  return (
    <>

      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <section className="bg-gray-50 dark:bg-gray-900 flex-grow flex justify-center items-center px-6 py-8 md:h-screen lg:py-0 lg:px-16">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Complaint Us
                </h1>
                {errorMessage && (
                  <p className="text-red-600">{errorMessage}</p>
                )}
                {/* {submittedComplaintId && ( // Display the complaint ID if it's available
                  <p>Your Complaint ID: {submittedComplaintId}</p>
                )} */}

                <UserModal isOpen={idModal} onClose={() => setIdModal(!idModal)}>
                  <div className="p-6">
                    <div className="flex flex-wrap">
                      <div className="">
                        <div className="leading-loose">
                          {submittedComplaintId && (
                            <div className="">
                              <h2 className="text-lg font-bold">Your Complaint</h2>
                              <span>Your Complaint Id: </span> <span className="text-green-500 font-bold">{submittedComplaintId}</span>

                              <h3 className="text-md font-semibold mt-4 text-red-400">Please save this id and you can come back to check your complaint status using this id</h3>

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
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="complaintNature"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Complaint Nature
                    </label>
                    <input
                      type="text"
                      name="complaintNature"
                      id="complaintNature"
                      value={complaintNature}
                      onChange={(e) => setComplaintNature(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Complaint Nature"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="comment"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Comment
                    </label>
                    <textarea
                      name="comment"
                      id="comment"
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your comment here"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Submit Complaint
                  </button>
                  <div className="text-center sm:text-right dark:text-purple-300">
                    Want to check status?&nbsp;
                    <Link
                      to="/checkstatus"
                      className="text-gray-500 dark:text-gray-300 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 ml-auto inline-block mt-2 sm:mt-0"
                    >
                      Check Status
                    </Link>
                  </div>



                </form>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
}

export default ComplaintUs;
