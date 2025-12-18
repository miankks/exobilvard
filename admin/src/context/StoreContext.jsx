import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StoreContext = createContext();

export const StoreProvider = ({ children, url }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [admin, setAdmin] = useState(null);

  // Fetch admin
  // LOGIN + fetch admin combined
  const login = async (formData) => {
    try {
      // 1️⃣ Call login API
      const response = await axios.post(`${url}/api/admin/login`, formData);

      if (!response.data.success) {
        return { success: false, message: response.data.message };
      }

      const newToken = response.data.token;

      // 2️⃣ Save token
      localStorage.setItem("token", newToken);
      setToken(newToken);

      // 3️⃣ Fetch admin immediately after login
      try {
        const adminResponse = await axios.get(`${url}/api/admin/getadmin`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });

        if (adminResponse.data.success) {
          setAdmin(adminResponse.data.data);
        } else {
          toast.error("Failed to fetch admin");
        }
      } catch (err) {
        console.log(err);
        toast.error("Error fetching admin");
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // SIGNUP
  const signup = async (formData) => {
    try {
      const response = await axios.post(`${url}/api/admin/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        // Backend does NOT return token → we MUST request login manually
        const loginResult = await login({
          email: formData.get("email"),
          password: formData.get("password"),
        });

        return loginResult; // returns {success:true}
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAdmin(null);
  };

  return (
    <StoreContext.Provider value={{ token, admin, login, signup, logout, url }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
