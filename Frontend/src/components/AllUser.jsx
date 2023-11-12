import React, { useEffect, useState } from "react";
import UserModal from "../modals/UserModal";
import axios from "axios";
import Loader from "./Loader";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from "./BaseUrl";

function AllUser() {
  //Defining states
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateModal, setUpdateModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [userData, setUserData] = useState(null);
  const [otp, setOtp] = useState("");
  const [optModal, setOtpModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); //Current page 
  const [filteredUsers, setFilteredUsers] = useState([]); //filter user
  const [searchQuery, setSearchQuery] = useState(""); //Search 
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleDelete = (itemId) => {
    setSelectedItemId(itemId);
    setConfirmationModalOpen(true);
  };


  // defaulf configuration for axios 
  axios.defaults.withCredentials = true;

  // Handle Search 
  useEffect(() => {
    const filtered = data.filter(
      (user) =>
        user.userType !== "admin" &&
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phoneNo.includes(searchQuery.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [data, searchQuery]);

  const usersPerPage = 8;

  const lastIndex = currentPage * usersPerPage; //last user

  const firstIndex = lastIndex - usersPerPage; //first user

  const currentUsers = data.slice(firstIndex, lastIndex); //current user

  //Next page button
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // const handleDelete = (itemId) => {
  //   const isConfirmed = window.confirm("Are you sure to delete this record?");
  //   if (isConfirmed) {
  //     axios
  //       .delete(`${BaseUrl}/users/${itemId}`)
  //       .then((response) => {
  //         fetchData();
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };
  const confirmDelete = () => {
    axios
      .delete(`${BaseUrl}/users/${selectedItemId}`)
      .then((response) => {
        fetchData();
        closeConfirmationModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeConfirmationModal = () => {
    setSelectedItemId(null);
    setConfirmationModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setEmail("");
    setPassword("");
    setName("");
    setPhoneNo("");
    setUserType("");
    setUserData(null);
  };
  //Close and Update modal
  const handleCloseUpdateModal = () => {
    setUpdateModal(false);
    setEmail("");
    setPassword("");
    setName("");
    setPhoneNo("");
    setUserType("");
    setUserData(null);
  };
  //Change modal
  const handleSelectChange = (event) => {
    setUserType(event.target.value);
  };
  // fetching the data of users 
  useEffect(() => {
    fetchData();
  }, []);
  //old
  // const fetchData = async () => {
  //   axios
  //     .get(`${BaseUrl}/users`, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const fetchData = async () => {
    axios
      .get(`${BaseUrl}/users`, {
        withCredentials: true,
      })
      .then((response) => {
        // Separate "director" and other users
        const directorUsers = response.data.filter(user => user.userType === "director");
        const otherUsers = response.data.filter(user => user.userType !== "director");

        // Sort the other users in reverse order
        const sortedOtherUsers = otherUsers.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

        // Combine "director" users on top and other users
        const finalData = [...directorUsers, ...sortedOtherUsers];

        setData(finalData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  //function to capture token from cookies
  const getAuthToken = () => {
    const name = "access_token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    for (const cookie of cookies) {
      if (cookie.trim().indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  };
  //send mail to entered account typed mail
  const sendOtp = async () => {
    setLoading(true);

    try {
      const emailField = document.getElementById("tahir");
      const email = emailField.value;
      const response = await axios.post(`${BaseUrl}/users/otp`, {
        email,
      });

      setLoading(false);
      setOtpModal(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
      // toast.success('Unblocked Successfully');
      toast.error("Failed to send OTP");
    }
  };

  // handle OTP verification and user creation
  const verifyOtp = async (e) => {
    setLoading(true);
    setOtpModal(false);
    e.preventDefault();

    try {
      console.log("OTP Value:", otp);
      const token = getAuthToken();
      const response = await axios.get(
        `${BaseUrl}/users/checkOtp/${otp}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data === true) {
        send();
      } else {
        // showAlertMessage("error", "OTP verification failed!");
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      // showAlertMessage("error", "An error occurred during OTP verification!");
      toast.error("An error occured during OTP Verification");
      setLoading(false);
      console.log(error);
    }
  };
  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // form fill restriction
    if (!name || !email || !phoneNo || (!password && userType !== "attendance-user")) {
      setErrorMessage1("Fill the entire form");
      setTimeout(() => {
        setErrorMessage1("");
      }, 4000);
      return;
    }

    // name restriction
    const nameRegex = /^[A-Za-z]/;
    if (!nameRegex.test(name)) {
      setErrorMessage2("Use only Alphabets");
      setTimeout(() => {
        setErrorMessage2("");
      }, 4000);
      return;
    }

    // email restriction
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format!");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    }

    // Check if the user type is "attendance-user" to skip password validation
    if (userType === "attendance-user") {
      setIsOpen(!isOpen);
      setLoading(!loading);
      try {
        await sendOtp();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      // For other user types, proceed with password validation
      if (!password) {
        setErrorMessage1("Fill the entire form");
        setTimeout(() => {
          setErrorMessage1("");
        }, 4000);
        return;
      }

      setIsOpen(!isOpen);
      setLoading(!loading);
      try {
        await sendOtp();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // if user has not updated any of the fields
    if (!name && !email && !password && !userType && !phoneNo) {
      alert("One input is compulsory to update");
      return;
    }

    setUpdateModal(false);

    const updatedData = {};
    if (name) {
      updatedData.name = name;
    }
    if (email) {
      updatedData.email = email;
    }
    if (phoneNo) {
      updatedData.phoneNo = phoneNo;
    }

    // Hash the new password if it is provided
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      updatedData.password = hashedPassword;
    }

    // Only update the userType if it is not "director"
    if (userType && userData.userType !== "director") {
      updatedData.userType = userType;
    }

    axios
      .patch(`${BaseUrl}/users/${userData._id}`, updatedData)
      .then((response) => {
        console.log(response.data);
        fetchData();
        setEmail("");
        setPassword("");
        setUserType("");
        setPhoneNo("");
        setUserData(null);
      })
      .catch((error) => {
        console.log(error);
        // alert("Error updating user!");
        toast.error("Error updating user!");
      });
  };




  // Handling OTP Verification
  const handleSubmitOtp = async (e) => {
    setLoading(true);
    setOtpModal(false);
    e.preventDefault();
    try {
      const response = await axios.get(`${BaseUrl}/users/checkOtp/${otp}`);
      if (response.data === true) {
        send();
      } else {
        // showAlertMessage("error", "OTP verification failed!");
        // alert("error", "OTP verification failed!");
        toast.error("OTP verification failed!");
      }
    } catch (error) {
      // showAlertMessage("error", "An error occurred during OTP verification!");
      // alert("error", "An error occurred during OTP verification!");
      toast.error("An error occurred during OTP verification!");
      setLoading(false);
      console.log(error);
    }
  };

  // send  for creating a new user data and check for user exist or not  
  const send = () => {
    axios
      .post(`${BaseUrl}/users`, {
        name,
        email,
        phoneNo,
        password,
        userType,
      })
      .then((response) => {
        setLoading(false);
        setEmail("");
        setPassword("");
        setName("");
        setUserType("");
        fetchData();
        toast.success("User created successfully!");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          toast.error("User already exist");
        } else if (error.response && error.response.status === 410) {

          toast.error("Phone already exist");
        } else {
          toast.error("Error creating user");
        }
        setLoading(false);
      });

  };
  // Monitor change in userdata 
  useEffect(() => {
    if (userData) {
      console.log(userData);
      setUpdateModal(!isUpdateModal);
    }
  }, [userData]);
  // Handle user type selection
  const handleUserTypeSelection = (event) => {
    setUserType(event.target.value);
    setUserTypeSelected(true);
  };
  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full ">
            <div className="flex justify-between items-center">
              <p className="text-xl pb-3 flex items-center">
                <i className="fas fa-list mr-3"></i> All Users
              </p>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-1 text-gray-700 bg-gray-200 rounded"
              />
              <button
                onClick={handleOpenModal}
                className=" bg-white cta-btn font-semibold py-2 px-4 mb-2 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center"
              >
                <i className="fas fa-plus mr-3"></i> New Users
              </button>
            </div>

            <div className="bg-white overflow-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Name
                    </th>
                    <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Email
                    </th>
                    <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Phone no
                    </th>
                    <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                      User Type
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Update
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {filteredUsers
                    .slice(firstIndex, lastIndex)
                    .map((item, index) => (
                      <tr key={index}>
                        <td className="text-left py-3 px-4">{item.name}</td>
                        <td className="w-1/3 text-left py-3 px-4">{item.email}</td>
                        <td className="w-1/3 text-left py-3 px-4">{item.phoneNo}</td>
                        <td className="text-left py-3 px-4">{item.userType}</td>
                        <td className="text-left py-3 px-4">
                          <button
                            className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                            type="button"
                            onClick={() => {
                              axios
                                .get(`${BaseUrl}/users/${item._id}`)
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
                        </td>
                        <td className="text-left py-3 px-4">
                          {/* Render delete button only if user type is not "director" */}
                          {/* {item.userType !== "director" ? (
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-red-500 rounded"
                              type="button"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          ) : (
                            <span className="px-5 py-2 text-white font-light tracking-wider bg-gray-400 rounded">Delete</span>
                          )} */}


                          {item.userType !== "director" ? (
                            <button
                              className="px-4 py-1 text-white font-light tracking-wider bg-red-500 rounded"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          ) : (
                            <span className="px-5 py-2 text-white font-light tracking-wider bg-gray-400 rounded">
                              Delete
                            </span>
                          )}

                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <UserModal isOpen={isOpen} onClose={handleCloseModal}>
              <div classNameName="p-6">
                <div className="flex flex-wrap">
                  <div className="w-full mt-6 pl-0 lg:pl-2">
                    <div className="leading-loose">
                      <form
                        className="p-10 bg-white rounded shadow-xl"
                        onSubmit={handleSubmit}
                      >
                        {errorMessage1 && <p className="text-red-500">{errorMessage1}</p>}
                        <div className="mt-2">
                          <label htmlFor="dropdown" className="block text-sm text-gray-600">
                            Select User Type:
                          </label>
                          <select
                            id="dropdown"
                            value={userType}
                            onChange={handleSelectChange}
                            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                          >
                            <option value="">Select User Type</option>
                            <option value="diary-manager">Diary Manager</option>
                            <option value="contact-manager">Contact Manager</option>
                            <option value="attendance-manager">Attendance Manager</option>
                            <option value="attendance-user">Attendance User</option>
                          </select>
                        </div>

                        <div className="">
                          <label className="block text-sm text-gray-600" htmlFor="cus_name">
                            Name
                          </label>
                          <input
                            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                            type="text"
                            required=""
                            placeholder="Your Name"
                            aria-label="Name"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        {errorMessage2 && <p className="text-red-500">{errorMessage2}</p>}
                        <div className="mt-2">
                          <label className="block text-sm text-gray-600" htmlFor="cus_email">
                            Email
                          </label>
                          <input
                            className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
                            type="email"
                            required=""
                            id="tahir"
                            placeholder="Email"
                            aria-label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        </div>

                        <div className="mt-2">
                          <label className="block text-sm text-gray-600" htmlFor="cus_phone">
                            Phone No
                          </label>
                          <input
                            className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
                            type="tel"
                            required=""
                            placeholder="Phone No"
                            aria-label="Phone No"
                            onChange={(e) => setPhoneNo(e.target.value)}
                          />
                        </div>

                        {userType !== "attendance-user" && (
                          // Render the password field only if the user type is not "attendance-user"
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600" htmlFor="cus_email">
                              Password
                            </label>
                            <input
                              className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
                              type="password"
                              required=""
                              placeholder="Password"
                              aria-label="Password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        )}

                        <div className="mt-6">
                          <button
                            className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
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
                <div classNameName="p-6">
                  <div className="flex flex-wrap">
                    <div className="w-full mt-6 pl-0 lg:pl-2">

                      <div className="leading-loose">
                        <form
                          className="p-10 bg-white rounded shadow-xl"
                          onSubmit={handleUpdate}
                          autoComplete="off"
                        >
                          {errorMessage1 && <p className="text-red-500">{errorMessage1}</p>}
                          <div className="">
                            <label className="block text-sm text-gray-600" htmlFor="cus_name">
                              Name
                            </label>
                            <input
                              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                              type="text"
                              required=""
                              placeholder={userData.name}
                              aria-label="Name"
                              onChange={(e) => setName(e.target.value)}
                            />
                            {errorMessage2 && <p className="text-red-500">{errorMessage2}</p>}
                          </div>

                          <div className="mt-2">
                            <label className="block text-sm text-gray-600" htmlFor="cus_email">
                              Email
                            </label>
                            <input
                              className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
                              type="email"
                              required=""
                              placeholder={userData.email}
                              aria-label="Email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                          </div>
                          <div className="mt-2">
                            <label className="block text-sm text-gray-600" htmlFor="cus_phone">
                              Phone No
                            </label>
                            <input
                              className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
                              type="tel"
                              required=""
                              placeholder={userData.phoneNo}
                              aria-label="Phone No"
                              onChange={(e) => setPhoneNo(e.target.value)}
                            />
                          </div>

                          <div className="mt-2">
                            <label className="block text-sm text-gray-600" htmlFor="cus_email">
                              New Password
                            </label>
                            <input
                              className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
                              type="password"
                              required=""
                              placeholder="New Password"
                              aria-label="New Password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="mt-2">
                            <label htmlFor="dropdown" className="block text-sm text-gray-600">
                              Select User Type:
                            </label>
                            <select
                              id="dropdown"
                              value={userType}
                              onChange={handleSelectChange}
                              className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                              disabled={userData && userData.userType === "director"}
                            >
                              <option value="">Select User Type</option>
                              <option value="diary-manager">Diary Manager</option>
                              <option value="contact-manager">Contact Manager</option>
                              <option value="attendance-manager">Attendance Manager</option>
                              <option value="attendance-user">Attendance User</option>
                            </select>

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
            <UserModal isOpen={optModal} onClose={() => setOtpModal(!optModal)}>
              <div className="p-6">
                <div className="flex flex-wrap">
                  <div className="w-full mt-6 pl-0 lg:pl-2">
                    <div className="leading-loose">
                      <form
                        className="p-10 bg-white rounded shadow-xl"
                        onSubmit={verifyOtp}
                      >
                        <div className="">
                          <label className="block text-sm text-gray-600" for="cus_name">
                            We have sent an OTP to your email
                          </label>
                          <input
                            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                            type="text"
                            required=""
                            placeholder="Enter your OTP"
                            aria-label="Name"
                            onChange={(e) => setOtp(e.target.value)}
                          />
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
                    </div>
                  </div>
                </div>
              </div>
            </UserModal>
            <div className="flex justify-between items-center mt-4">
              {/* Display next button if there are more users */}
              {data.length > lastIndex && (
                <button
                  className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                  type="button"
                  onClick={handleNextPage}
                >
                  Next
                </button>
              )}

              {/* Display previous button if current page is not the first page */}
              {currentPage > 1 && (
                <button
                  className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                  type="button"
                  onClick={handlePreviousPage}
                >
                  Previous
                </button>
              )}
            </div>
          </div>



        )}

        {confirmationModalOpen && (
          <div
            className="absolute top-0 left-0 flex items-center justify-center w-full h-full"
            style={{ backgroundColor: "rgba(0,0,0,.5)" }}
          >
            <div
              className="h-auto p-4 mx-2 text-left bg-white rounded shadow-xl dark:bg-gray-800 md:max-w-xl md:p-6 lg:p-8 md:mx-0"
              onClick={closeConfirmationModal}
            >
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold leading-snug text-gray-900 dark:text-gray-400">
                  Do you want to delete this record?
                </h2>
                <div className="mt-4">
                  <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
                    This process is irreversible.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <span className="block w-full gap-3 rounded-md shadow-sm md:flex">
                  <button
                    onClick={closeConfirmationModal}
                    className="inline-flex justify-center w-full px-4 py-2 mb-4 text-red-500 border border-red-500 rounded-md dark:hover:bg-red-400 dark:text-red-400 dark:hover:text-gray-100 dark:border-red-400 md:mb-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 hover:text-gray-100 hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="inline-flex justify-center w-full px-4 py-2 text-white bg-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:hover:bg-red-400 focus:ring-red-600 hover:bg-red-600"
                  >
                    Confirm
                  </button>
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}
export default AllUser;























