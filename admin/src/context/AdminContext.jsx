import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const AdminContext = createContext();

export const AdminProvider = ({ children, url }) => {
  const { token } = useAuth();
  const [admin, setAdmin] = useState(null);
  const [allAdmins, setAllAdmins] = useState(null);

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
    } catch (err) {
      console.log(err);
      toast.error("Error fetching admin");
    }
  };

  const fetchAllAdmins = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${url}/api/admin/getalladmins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setAllAdmins(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch all admins");
      }
    } catch (error) {
      console.error(error);

      if (error.response?.status === 403) {
        toast.error("You are not authorized to view admins");
      } else if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdmin();
      fetchAllAdmins();
    }
  }, [token]);

  return (
    <AdminContext.Provider
      value={{ admin, allAdmins, fetchAdmin, fetchAllAdmins }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
