import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import Header from "../components/Header";
import { Copyright } from "../components/Map";
import Modal from "../components/Modal";
import axios from "axios";
import Loader from "../components/Loader";
import BaseUrl from '../components/BaseUrl';
function Forgot() {
  const [otp, setOtp] = useState("");
  const [optModal, setOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [passwordPanel, setPasswordPanel] = useState(false);
  // alert 
  const [showAlert, setShowAlert] = useState(false); //new
  const [alertType, setAlertType] = useState("success"); //new
  const [alertMessage, setAlertMessage] = useState(""); //new
  const [errorMessage, setErrorMessage] = useState(''); //New
  axios.defaults.withCredentials = true;

    //Alert Message Function
    const showAlertMessage = (type, message) => {
      setAlertType(type);
      setAlertMessage(message);
      setShowAlert(true);
    };
    // hide alert message  
    const hideAlertMessage = () => {
      setShowAlert(false);
    };
    //time to handle alert message
    useEffect(() => {
      if (showAlert) {
        setTimeout(() => {
          hideAlertMessage();
        }, 4000);
      }
    }, [showAlert]);

  const handleOpenModal = () => {
    setOtpModal(true);
  };

  const handleCloseModal = () => {
    setOtpModal(false);
  };
  //Send otp to mail
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const data = {
        email,
        otp,
      };
      const checkOtp = await axios.get(
        `${BaseUrl}/users/checkEmail`,
        {
          params: {
            email,
            otp,
          },
        }
      );
  
      // console.log("OTP from backend:", checkOtp.data.otp);
  
      if (checkOtp.data.success) {
        // if otp verification successful then proceed to reset password
        setLoading(false);
        setOtpModal(false);
        setPasswordPanel(true);
      } else {
        // Invalid OTP, display error message
        setLoading(false);
        showAlertMessage("Error", "otp do not match");
        setOtpModal(false);
      }
    } catch (error) {
      setLoading(false);
      showAlertMessage("An error occurred during OTP verification!");
      // console.log("An error occurred during OTP verification!");
      console.log(error);
      // Handle error here if necessary
    }
  };
  
  
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const requestOtp = await axios.get(
        `${BaseUrl}/users/reset/${email}`
      );
  
      if (requestOtp.data.success) {
        // OTP request successful, proceed to display OTP modal
        setLoading(false);
        setOtpModal(true);
  
        // The OTP value is available in requestOtp.data.otp
        // console.log("OTP from backend:", requestOtp.data.otp);
      } else {
        // OTP request failed, display error message
        setLoading(false);
        showAlertMessage("Failed to send OTP");
      }
    } catch (error) {
      setLoading(false);
      showAlertMessage("An error occurred while sending OTP!");
      console.log(error);
      // Handle error here if necessary
    }
  };
  
  
  
  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const change = await axios.patch(
      `${BaseUrl}/users/updatePassword/${email}`,
      { password }
    );
    if (change) {
      setLoading(false);
      setOtpModal(false);
      setPasswordPanel(false);
      showAlertMessage("success", "Password changed successfully!");
      console.log(change.data);
    } else {
      console.log("error");
    }
  };
  return (
    <>
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900 flex-grow flex justify-center items-center px-6 py-8 md:h-screen lg:py-0 lg:px-16">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Reset Password
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={sendOtp}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <button
                    // type="submit"
                    //   onClick={handleSubmit}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Recover Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
      <Copyright />
      <Modal isOpen={optModal} onClose={handleCloseModal}>
        <div classNameName="p-6">
          <div className="flex flex-wrap">
            <div className="w-full mt-6 pl-0 lg:pl-2">
              <div className="leading-loose">
                <form
                  className="p-10 bg-white rounded shadow-xl"
                  onSubmit={handleSubmit}
                >
                  <div className="">
                    <label
                      className="block text-sm text-gray-600"
                      htmlFor="cus_name"
                    >
                      We have sent you an otp to your email
                    </label>
                    <input
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                      onChange={(event) => setOtp(event.target.value)}
                      name="name"
                      type="text"
                      required=""
                      placeholder="Your otp"
                      aria-label="Name"
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
      </Modal>
      <Modal isOpen={passwordPanel} onClose={() => setPasswordPanel(false)}>
        <div classNameName="p-6">
          <div className="flex flex-wrap">
            <div className="w-full mt-6 pl-0 lg:pl-2">
              <div className="leading-loose">
                <form
                  className="p-10 bg-white rounded shadow-xl"
                  onSubmit={resetPassword}
                >
                  <div className="">
                    <label
                      className="block text-sm text-gray-600"
                      htmlFor="cus_name"
                    >
                      New Password
                    </label>
                    <input
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      placeholder="*******"
                    />
                  </div>
                  <div className="">
                    <label
                      className="block text-sm text-gray-600"
                      htmlFor="cus_name"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                      onChange={(event) => setcPassword(event.target.value)}
                      type="password"
                      placeholder="*******"
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
      </Modal>
      {showAlert && (
        <div
          className={`${alertType === "success" ? "bg-green-500" : "bg-red-500"
            } text-white px-4 py-3 rounded-md fixed top-10 right-10`}
        >
          <div className="flex items-center justify-between">
            <p className="font-bold">
              {alertType === "success" ? "Success" : "Error"}
            </p>
            <button onClick={hideAlertMessage}>
              <span className="text-white">×</span>
            </button>
          </div>
          <p className="text-sm mt-1">{alertMessage}</p>
        </div>
      )}
      </div>
    </>
  );
}

export default Forgot;
