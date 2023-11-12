
import axios from "axios";
import BaseUrl from "./BaseUrl";
const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/auth/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      const userData = response.data;
      localStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem("userData");
  },
  getUserData: () => {
    const userData = localStorage.getItem("userData");
    return JSON.parse(userData);
  },
  isAuthenticated: () => {
    const userData = localStorage.getItem("userData");
    return !!userData;
  },

};

export default authService;
