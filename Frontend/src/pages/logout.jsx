import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseUrl from '../components/BaseUrl';
function LogoutPage() {
  // Navigate to the login page
  const navigate = useNavigate();

  axios
    .get(`${BaseUrl}/auth/logout`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      localStorage.clear();
      navigate("/");
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response.data.success === false) {
        localStorage.clear();
        navigate("/");
      }
    });
}

export default LogoutPage;
