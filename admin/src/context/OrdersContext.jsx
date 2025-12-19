import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { formattedDate } from "../customHooks/formattedDate";

const OrdersContext = createContext();

export const OrdersProvider = ({ children, url }) => {
  const [orders, setOrders] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [comment, setComment] = useState("");
  const [acceptedDate, setAcceptedDate] = useState("");

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(url + "/api/order/listcar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const updateOrderStatusLocally = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
    );
  };

  const statusHandler = async (status, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status,
        comment,
        acceptedDate,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        fetchAllOrders,
        selectedStatuses,
        setSelectedStatuses,
        comment,
        setComment,
        acceptedDate,
        setAcceptedDate,
        updateOrderStatusLocally,
        statusHandler,
        formattedDate,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// Custom hook (important!)
export const useOrders = () => useContext(OrdersContext);
