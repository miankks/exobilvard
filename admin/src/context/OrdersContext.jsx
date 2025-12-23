import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrdersContext = createContext();

export const OrdersProvider = ({ children, url }) => {
  const [orders, setOrders] = useState([]); // all orders
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [comment, setComment] = useState("");
  const [acceptedDate, setAcceptedDate] = useState("");

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/order/allorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) setOrders(response.data.data);
      else toast.error("Error fetching orders");
    } catch (err) {
      toast.error("Server error");
    }
  };

  // Update order status locally (optimistic UI)
  const updateOrderStatusLocally = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Update status via API and refresh orders
  const statusHandler = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        updateOrderStatusLocally(orderId, newStatus);
        toast.success("Status updated");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        fetchOrders,
        selectedStatuses,
        setSelectedStatuses,
        comment,
        setComment,
        acceptedDate,
        setAcceptedDate,
        updateOrderStatusLocally,
        statusHandler,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
