import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // all orders
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [comment, setComment] = useState("");
  const [acceptedDate, setAcceptedDate] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();

  const getBackRoute = () => {
    if (location.pathname.startsWith("/acceptedorders"))
      return "/acceptedorders";
    if (location.pathname.startsWith("/rejectedorders"))
      return "/rejectedorders";
    if (location.pathname.startsWith("/completedorders"))
      return "/completedorders";
    return "/orders"; // default
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/order/allorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const ordersData = response.data.data;
        setOrders(ordersData);

        // INITIALIZE selectedStatuses FROM ORDERS
        const statusMap = {};
        ordersData.forEach((order) => {
          statusMap[order._id] = order.status;
        });
        setSelectedStatuses(statusMap);
      } else {
        toast.error("Error fetching orders");
      }
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
  const statusHandler = async (orderId, newStatus, comment, acceptedDate) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/order/status`,
        { orderId, status: newStatus, comment, acceptedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        updateOrderStatusLocally(orderId, newStatus);
        toast.success("Status updated");
        // Navigate back depending on current page
        const path = location.pathname;
        if (navigate) {
          if (path.startsWith("/acceptedorders")) navigate("/acceptedorders");
          else if (path.startsWith("/rejectedorders"))
            navigate("/rejectedorders");
          else if (path.startsWith("/completedorders"))
            navigate("/completedorders");
          else navigate("/orders");
        }
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
