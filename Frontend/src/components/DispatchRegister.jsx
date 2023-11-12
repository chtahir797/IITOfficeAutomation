import React, { useEffect, useState } from "react";
import UserModal from "../modals/UserModal";
import axios from "axios";
import Loader from "./Loader";
import { parseISO, isAfter } from "date-fns";
import { ImagePopup, Navigate, SearchAndFilter } from "./Useful";
import BaseUrl from "./BaseUrl";

function DispatchRegister() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState("");
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [designation, setDesignation] = useState("");
  const [userData, setUserData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [recordConfirmed, setRecordConfirmed] = useState(false);
  const [recordDate, setRecordDate] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [file_upload, setFile_upload] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState('');
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");
  const recordsPerPage = 6;
  axios.defaults.withCredentials = true;


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!place && !subject && !number && !designation && !file_upload) {
      setErrorMessage("Fill the entire form");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }
    if (!file_upload) {
      console.error("No file selected.");
      return;
    }
    const currentDate = new Date();
    setRecordDate(currentDate);
    setShowConfirmation(true);
  };


  const handleConfirmation = async () => {
    setShowConfirmation(false);
    try {

      const formData = new FormData();
      formData.append("number", number);
      formData.append("designation", designation);
      formData.append("subject", subject);
      formData.append("place", place);
      formData.append("file_upload", file_upload);
      formData.append("dateAndTime", recordDate.toISOString());

      axios
        .post(`${BaseUrl}/dispatchRegister`, formData)
        .then((response) => {
          setPlace("");
          setSubject("");
          setNumber("");
          setDesignation("");
          setFile_upload(""); // Reset the file_upload state
          fetchData();
          setRecordConfirmed(true);
          handleCloseModal();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFile_upload(file); // Set the selected file directly
  //   }
  // };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (!file) {
      setError('Please select a file.');
      return;
    }

    // Check if the file size exceeds 4MB (4 * 1024 * 1024 bytes)
    if (file.size > 4 * 1024 * 1024) {
      setError('File size must be less than 4MB.');
      return;
    }

    // Check if the file type is an image (JPEG, JPG, PNG)
    if (!/^(image\/jpeg|image\/jpg|image\/png)$/.test(file.type)) {
      setError('Please select an image file (JPEG, JPG, PNG).');
      return;
    }

    setError(''); // Clear any previous error messages
    setFile_upload(file);
  };


  // Function to open the image popup
  const handleOpenImagePopup = (imageUrl) => {
    setShowImagePopup(true);
    setPopupImageUrl(imageUrl);
  };
  // Function to close the image popup
  const handleCloseImagePopup = () => {
    setShowImagePopup(false);
    setPopupImageUrl("");
  };
  const handleDelete = (itemId) => {
    setDeleteConfirmation(true);
    setRecordToDelete(itemId); // Store the item ID to be deleted
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setPlace("");
    setSubject("");
    setNumber("");
    setDesignation("");
    setUserData(null);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModal(false);
    setPlace("");
    setSubject("");
    setNumber("");
    setDesignation("");
    setUserData(null);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/dispatchRegister`);
      // Sort the response data in descending order based on the dateAndTime property
      const sortedData = response.data.sort((a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime));
      setData(sortedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdateModal(false);
    const updatedData = {};
    if (number) {
      updatedData.number = number;
    }
    if (designation) {
      updatedData.designation = designation;
    }
    if (subject) {
      updatedData.subject = subject;
    }
    if (place) {
      updatedData.place = place;
    }
    axios
      .patch(`${BaseUrl}/dispatchRegister/${userData._id}`, {
        ...updatedData,
      })
      .then((response) => {
        fetchData();
        setNumber("");
        setDesignation("");
        setPlace("");
        setSubject("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Helper function to check if the item date is after the filter date
  const isDateAfterFilter = (itemDate, filterDate) => {
    const parsedItemDate = parseISO(itemDate); // Parse item date to Date object
    const parsedFilterDate = parseISO(filterDate); // Parse filter date to Date object
    return isAfter(parsedItemDate, parsedFilterDate);
  };
  // In every Component 
  const filteredData = data.filter((item) => {
    const searchTextLower = searchText.toLowerCase();
    const numberMatch =
      typeof item.number === "number" && item.number.toString().includes(searchTextLower); // Convert searchTextLower to a number for comparison
    const designationMatch =
      typeof item.designation === "string" && item.designation.toLowerCase().includes(searchTextLower);
    const subjectMatch =
      typeof item.subject === "string" && item.subject.toLowerCase().includes(searchTextLower);
    const placeMatch =
      typeof item.place === "string" && item.place.toLowerCase().includes(searchTextLower);

    const dateMatch =
      !filterDate || new Date(item.dateAndTime).toLocaleDateString() === new Date(filterDate).toLocaleDateString();

    return (numberMatch || designationMatch || subjectMatch || placeMatch) && dateMatch;
  });


  useEffect(() => {
    setCurrentPage(1); // Reset to the first page whenever data, search, or filter changes
  }, [data, searchText, filterDate]);

  // Get current records based on currentPage
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  // In every Component
  const hasMoreNextRecords = filteredData.length > recordsPerPage * currentPage;
  const hasPreviousRecords = currentPage > 1;
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    if (userData) {
      console.log(userData);
      setUpdateModal(true);
    }
  }, [userData]);
  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full">
            <div className="flex justify-between items-center flex-col sm:flex-row">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Dispatch Register
              </p>
              <button
                onClick={handleOpenModal}
                className="bg-white cta-btn font-semibold py-2 px-4 mb-2 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center"
              >
                <i className="fas fa-plus mr-3"></i> New Dispatch Register
              </button>
            </div>
            {/* Use the SearchAndFilter component */}
            <SearchAndFilter
              searchText={searchText}
              onSearchTextChange={setSearchText}
              filterDate={filterDate}
              onFilterDateChange={setFilterDate}
            />
            <div className="bg-white overflow-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Date
                    </th>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Number
                    </th>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Designation
                    </th>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Place
                    </th>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Subject
                    </th>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      File
                    </th>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {currentRecords.map((item, index) => (
                    <tr key={index}>
                      <td className="text-left py-3 px-4">{new Date(item.dateAndTime).toLocaleString()}</td>
                      <td className="text-left py-3 px-4">{item.number}</td>
                      <td className="text-left py-3 px-4">{item.designation}</td>
                      <td className="text-left py-3 px-4">{item.place}</td>
                      <td className="text-left py-3 px-4">{item.subject}</td>
                      <td className=" text-left py-3 px-4">
                        <img
                          src={item.file_upload}
                          alt=""
                          onClick={() => handleOpenImagePopup(item.file_upload)}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="text-left py-3 px-4">
                        <div className="flex">
                          <button
                            className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded mr-2"
                            type="button"
                            onClick={() => {
                              axios
                                .get(
                                  `${BaseUrl}/dispatchRegister/${item._id}`
                                )
                                .then((response) => {
                                  setUserData(response.data);
                                })
                                .catch((error) => {
                                  console.log(error);
                                });
                            }}
                          >
                            Update
                          </button>
                          {/* <button
                            className="px-4 py-1 text-white font-light tracking-wider bg-red-500 rounded"
                            type="button"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Delete Confirmation */}
            {deleteConfirmation && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded p-6 shadow-lg">
                  <p className="text-lg font-semibold text-red-700">Confirm the record:</p>
                  <div className="mt-4">
                    {/* Display the details of the item to be deleted */}
                    <p className="text-sm">
                      <span className="font-semibold">Number:</span> {recordToDelete && data.find((item) => item._id === recordToDelete)?.number}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Designation:</span> {recordToDelete && data.find((item) => item._id === recordToDelete)?.designation}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Place:</span> {recordToDelete && data.find((item) => item._id === recordToDelete)?.place}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Subject:</span> {recordToDelete && data.find((item) => item._id === recordToDelete)?.subject}
                    </p>
                  </div>
                  {recordDate && (
                    <p className="text-sm mt-4">
                      <span className="font-semibold">Date & Time:</span>{" "}
                      {recordDate.toLocaleString()}
                    </p>
                  )}
                  <div className="mt-6 flex justify-end">
                    <button
                      className="px-4 py-2 text-white font-semibold bg-red-500 rounded-md"
                      onClick={() => {
                        setDeleteConfirmation(false);
                        setRecordToDelete(null); // Reset the recordToDelete state
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 ml-4 text-white font-semibold bg-green-500 rounded-md"
                      onClick={() => {
                        // Perform the delete action
                        axios
                          .delete(`${BaseUrl}/dispatchRegister/${recordToDelete}`)
                          .then((response) => {
                            setDeleteConfirmation(false);
                            setRecordToDelete(null); // Reset the recordToDelete state
                            fetchData();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
            <UserModal isOpen={isOpen} onClose={handleCloseModal}>
              <div className="p-6">
                <div className="flex flex-wrap">
                  <div className="w-full mt-6 pl-0 lg:pl-2">
                    <div className="leading-loose">
                      {showConfirmation ? (
                        <div className="bg-white rounded p-6 ">
                          <p className="text-lg font-semibold">Confirm the record:</p>
                          <div className="mt-4">
                            <p className="text-sm">
                              <span className="font-semibold">Number:</span> {number}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Designation:</span> {designation}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Place:</span> {place}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Subject:</span> {subject}
                            </p>
                          </div>
                          {recordDate && (
                            <p className="text-sm mt-4">
                              <span className="font-semibold">Date & Time:</span>{" "}
                              {recordDate.toLocaleString()}
                            </p>
                          )}
                          <div className="mt-6">
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-green-500 rounded"
                              onClick={handleConfirmation}
                            >
                              Confirm
                            </button>
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-red-500 rounded ml-4"
                              onClick={() => setShowConfirmation(false)}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ) : (
                        <form
                          className="p-10 bg-white rounded "
                          onSubmit={handleSubmit}
                        >
                          {errorMessage && (
                            <p className="text-red-600">{errorMessage}</p>
                          )}
                          <div className="">
                            <label className="block text-sm text-gray-600">
                              Number
                            </label>
                            <input
                              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                              type="Number"
                              placeholder="number"
                              onChange={(e) => setNumber(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600">
                              Designation
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder="designation"
                              onChange={(e) => setDesignation(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600">
                              Place
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder="place"
                              onChange={(e) => setPlace(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600">
                              Subject
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder="subject"
                              onChange={(e) => setSubject(e.target.value)}
                            />
                          </div>
                          {/* <div className=" mt-2">
                            <label
                              className="  text-sm text-gray-600"
                              htmlFor="cus_email"
                            >
                              File Upload
                            </label>
                            <input
                              className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                              type="file"
                              name="myFile"
                              id="file-upload"
                              accept=".jpeg,.jpg,.png"
                              onChange={(e) => handleFileUpload(e)}
                            />
                          </div> */}

                          <div className="mt-2">
                            <label className="text-sm text-gray-600" htmlFor="cus_email">
                              File Upload
                            </label>
                            <input
                              className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                              type="file"
                              name="myFile"
                              id="file-upload"
                              accept=".jpeg,.jpg,.png"
                              onChange={(e) => handleFileUpload(e)}
                            />
                            <div className="mt-1 text-sm text-gray-500" id="file_upload_help">Not more than 4MB file is accepted</div>
                            {error && <p className="mt-2 text-red-500">{error}</p>}
                          </div>
                          <div className="mt-6">
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </UserModal>
            {userData && (
              <UserModal
                isOpen={isUpdateModal}
                onClose={handleCloseUpdateModal}
              >
                <div className="p-6">
                  <div className="flex flex-wrap">
                    <div className="w-full mt-6 pl-0 lg:pl-2">
                      <div className="leading-loose">
                        <form
                          className="p-10 bg-white rounded shadow-xl"
                          onSubmit={handleUpdate}
                          autoComplete="off"
                        >
                          <div className="">
                            Update
                            <label className="block text-sm text-gray-600">
                              Number
                            </label>
                            <input
                              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                              type="Number"
                              required=""
                              placeholder={userData.number}
                              onChange={(e) => setNumber(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600">
                              Designation
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder={userData.designation}
                              onChange={(e) => setDesignation(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600">
                              Subject
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder={userData.subject}
                              onChange={(e) => setSubject(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600">
                              Place
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder={userData.place}
                              onChange={(e) => setPlace(e.target.value)}
                            />
                          </div>
                          <div className="mt-6">
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                              type="submit"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </UserModal>
            )}
            {/* From Useful component  */}
            <div className="flex justify-between items-center mt-4">
              <Navigate
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                showNextButton={hasMoreNextRecords}
                showPreviousButton={hasPreviousRecords}
              />
            </div>
            {/* New ImagePopup component */}
            {showImagePopup && (
              <ImagePopup imageUrl={popupImageUrl} onClose={handleCloseImagePopup} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
export default DispatchRegister;



