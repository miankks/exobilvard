import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const AdminContext = createContext();

export const AdminProvider = ({ children, url }) => {
  const { token } = useAuth();
  const [admin, setAdmin] = useState(null);

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

  useEffect(() => {
    fetchAdmin();
  }, [token]);

  return (
    <AdminContext.Provider value={{ admin, fetchAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
