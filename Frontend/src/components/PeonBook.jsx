
import React, { useEffect, useState } from "react";
import UserModal from "../modals/UserModal";
import axios from "axios";
import Loader from "./Loader";
import { parseISO, isAfter } from "date-fns";
import { ImagePopup, Navigate, SearchAndFilter } from "./Useful"
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from "./BaseUrl";
function PeonBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
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
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState("");
  // const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState('');
  const recordsPerPage = 6;
  // Default configuration for axios
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !description || !number || !name) {
      setErrorMessage("Fill the entire form");

      setTimeout(() => {
        setErrorMessage("");
      }, 4000);

      return;
    }

    // const isValidPhoneNumber = (phoneNumber) => {
    //   // Regular expression to validate Pakistani phone numbers
    //   const phoneRegex = /^(?:\+92|0)[0-9]{10}$/;
    //   return phoneRegex.test(phoneNumber);
    // };
    // // Validate the phone number
    // if (!isValidPhoneNumber(phone)) {
    //   // alert("Invalid phone number. Please enter a valid Pakistani phone number.");
    //   toast.error("Invalid phone number. Please enter a valid Pakistani phone number.");
    //   return;
    // }
    // Make sure 'file_upload' contains the selected file before proceeding
    if (!file_upload) {
      console.error("No file selected.");
      toast.error("No file selected.");
      return;
    }
    // Fetch date and time here
    const currentDate = new Date();
    setRecordDate(currentDate);
    setShowConfirmation(true);
  };
  const handleConfirmation = async () => {
    setShowConfirmation(false);
    try {
      const formData = new FormData(); // Create a FormData instance
      formData.append("number", number);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("email", email);
      // formData.append("phone", phone);
      formData.append("dateAndTime", recordDate.toISOString());
      formData.append("file_upload", file_upload); // Append the selected file

      await axios.post(`${BaseUrl}/peonBook`, formData);
      setEmail("");
      setDescription("");
      setNumber("");
      setFile_upload(""); // Reset the file_upload state
      fetchData();
      setRecordConfirmed(true);
      // alert("Data Saved");
      toast.success('Data Saved');
      // const { fileLink } = response.data; // Get the file link from the server response
      // if (fileLink) {
      //   alert(`File Link: ${fileLink}`);
      // }
      handleCloseModal();
    } catch (error) {
      console.error(error);
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
    setEmail("");
    setDescription("");
    setNumber("");
    setName("");
    setUserData(null);
  };
  const handleCloseUpdateModal = () => {
    setUpdateModal(false);
    setEmail("");
    setDescription("");
    setNumber("");
    setName("");
    setUserData(null);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/peonBook`);
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
    if (name) {
      updatedData.name = name;
    }
    if (description) {
      updatedData.description = description;
    }
    if (email) {
      updatedData.email = email;
    }
    axios
      .patch(`${BaseUrl}/peonBook/${userData._id}`, {
        ...updatedData,
      })
      .then((response) => {
        fetchData();
        setNumber("");
        setName("");
        setEmail("");
        setDescription("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const isDateAfterFilter = (itemDate, filterDate) => {
    const parsedItemDate = parseISO(itemDate); // Parse item date to Date object
    const parsedFilterDate = parseISO(filterDate); // Parse filter date to Date object
    return isAfter(parsedItemDate, parsedFilterDate);
  };
  // In every Component 
  const filteredData = data.filter((item) => {
    const searchTextLower = searchText.toLowerCase();
    const numberMatch =
      typeof item.number === "string" && item.number.toLowerCase().includes(searchTextLower);
    const nameMatch =
      typeof item.name === "string" && item.name.toLowerCase().includes(searchTextLower);
    const descriptionMatch =
      typeof item.description === "string" && item.description.toLowerCase().includes(searchTextLower);
    const emailMatch =
      typeof item.email === "string" && item.email.toLowerCase().includes(searchTextLower);
    // const phoneMatch =
      // typeof item.phone === "string" && item.phone.includes(searchText);
    const dateMatch =
      !filterDate || new Date(item.dateAndTime).toLocaleDateString() === new Date(filterDate).toLocaleDateString();
    return (numberMatch || nameMatch || descriptionMatch || emailMatch) && dateMatch;
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
            <div className="flex justify-between items-center">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> Dispatch Register
              </p>

              <button
                onClick={handleOpenModal}
                className="bg-white cta-btn font-semibold py-2 px-4 mb-2 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center"
              >
                <i className="fas fa-plus mr-3"></i> New Peon Book
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
                      Name
                    </th>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Description
                    </th>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Email
                    </th>
                    {/* <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Phone No
                    </th> */}
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      File
                    </th>
                    <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Status
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
                      <td className="text-left py-3 px-4">{item.name}</td>
                      <td className="text-left py-3 px-4">{item.description}</td>
                      <td className="text-left py-3 px-4">{item.email}</td>
                      {/* <td className="text-left py-3 px-4">{item.phone}</td> */}
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
                          <td className="text-left py-3 px-4">
                            {item.isVerified ? "Verified" : "Not Verified"}
                          </td>
                        </div>
                      </td>
                      <td className="text-left py-3 px-4">
                        <div className="flex">
                          {/* <button
                            className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded mr-2"
                            type="button"
                            onClick={() => {
                              axios
                                .get(
                                  `http://localhost:8080/api/peonBook/${item._id}`
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
                          </button> */}
                          {/* <button
                            className="px-4 py-1 text-white font-light tracking-wider bg-red-500 rounded"
                            type="button"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button> */}
                          {item.isVerified ? (
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-red-500 rounded opacity-50 cursor-not-allowed"
                              type="button"
                              disabled
                            >
                              Delete
                            </button>
                          ) : (
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-red-500 rounded"
                              type="button"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                      <span className="font-semibold">Name:</span> {recordToDelete && data.find((item) => item._id === recordToDelete)?.name}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Email:</span> {recordToDelete && data.find((item) => item._id === recordToDelete)?.email}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Description:</span> {recordToDelete && data.find((item) => item._id === recordToDelete)?.description}
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
                        axios
                          .delete(`${BaseUrl}/peonBook/${recordToDelete}`)
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
                        <div className="bg-white rounded p-6 shadow-lg">
                          <p className="text-lg font-semibold">Confirm the record:</p>
                          <div className="mt-4">
                            <p className="text-sm">
                              <span className="font-semibold">Number:</span> {number}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Name:</span> {name}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Description:</span> {description}
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
                              Yes
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
                          <div className="">
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
                              Name
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder="Name"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600">
                              Description
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder="description"
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600">
                              Email
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="email"
                              required=""
                              placeholder="Email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          {/* <div className="mt-2">
                            <label className="block text-sm text-gray-600">
                              Phone No
                            </label>
                            <input
                              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                              type="tel"
                              required=""
                              placeholder="Phone No (e.g. 03xx-xxxxxxx)"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div> */}

                          <div className=" mt-2">
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
                            <div className="mt-1 text-sm text-gray-500 " id="file_upload_help">Not more than 4MB file is accepted</div>
                            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
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
                              Name
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder={userData.name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600">
                              Description
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder={userData.description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600">
                              Email
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder={userData.email}
                              onChange={(e) => setEmail(e.target.value)}
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
      <ToastContainer />
    </div>
  );
}
export default PeonBook;

