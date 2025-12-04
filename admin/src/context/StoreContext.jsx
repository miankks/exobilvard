import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StoreContext = createContext();

export const StoreProvider = ({ children, url }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [admin, setAdmin] = useState(null);

  // Fetch admin if token exists
  const fetchAdmin = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${url}/api/admin/getadmin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setAdmin(response.data.data);
      } else {
        toast.error("Failed to fetch admin");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching admin");
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, [token]); // refetch if token changes

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    fetchAdmin(); // fetch admin after login/signup
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAdmin(null);
  };
  
  return (
    <StoreContext.Provider value={{ token, admin, login, logout, url }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
