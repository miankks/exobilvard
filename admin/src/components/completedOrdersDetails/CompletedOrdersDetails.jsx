import { useState, useEffect } from "react";
import "./CompletedOrdersDetails.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";
import { useOrders } from "../../context/OrdersContext";

import { MdEmail } from "react-icons/md";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { formattedDate } from "../../customHooks/formattedDate";

const CompletedOrdersDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const {
    orders,
    statusHandler,
    fetchAllOrders,
    setSelectedStatuses,
    selectedStatuses,
  } = useOrders();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectChange = (orderId, value) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const deleteHandler = async (orderId) => {
    try {
      console.log(
        "DELETE URL:",
        `${API_URL}/api/order/deleteorders/${orderId}`
      );
      console.log("TOKEN:", token);
      const response = await axios.delete(
        `${API_URL}/api/order/deleteorders/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting order");
    }
  };

  // escape regex special characters to avoid crashes when user types symbols
  const escapeRegExp = (string = "") => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // highlight matched parts (safe: uses escaped regex)
  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    if (!text && text !== 0) return "";
    const term = searchTerm.trim();
    if (!term) return text;

    const safe = escapeRegExp(term);
    const regex = new RegExp(`(${safe})`, "ig");
    const parts = String(text).split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={i} className="bg-yellow-300 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // computed filteredOrders - only these will be shown
  const filteredOrders = orders
    .filter((order) => {
      if (id) return order._id === id;
      return true;
    })
    .filter((order) => {
      if (id) return true;
      if (!searchTerm || !searchTerm.trim()) return true; // no filter when empty
      const term = searchTerm.trim().toLowerCase();

      const fullName = order.address?.fullName?.toLowerCase() || "";
      const email = order.address?.email?.toLowerCase() || "";
      const phone = order.address?.phone?.toLowerCase() || "";
      const regnummer = order.address?.regnummer?.toLowerCase() || "";
      const bookDate = (order?.bookDate || "").toString().toLowerCase();
      const orderDate = (order?.orderDate || "").toString().toLowerCase();
      const orderTime = (order?.orderTime || "").toString().toLowerCase();
      const comment = (order?.comment || "").toString().toLowerCase();

      const itemNames = (order.items || [])
        .map((i) => `${i.name} x${i.quantity}`)
        .join(" ")
        .toLowerCase();

      // You can extend these fields if needed
      return (
        fullName.includes(term) ||
        email.includes(term) ||
        phone.includes(term) ||
        regnummer.includes(term) ||
        itemNames.includes(term) ||
        bookDate.includes(term) ||
        orderDate.includes(term) ||
        orderTime.includes(term) ||
        comment.includes(term)
      );
    });

  return (
    <div className="order orders-add">
      <h3>Completed Orders Page</h3>

      {/* SEARCH BAR */}
      <div style={{ margin: "10px 0" }}>
        <input
          type="text"
          placeholder="Search orders by name, email, phone, regnummer, item..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "100%", maxWidth: 600 }}
        />
      </div>

      <div className="order-list">
        {filteredOrders.length === 0 ? (
          <div className="no-results" style={{ padding: 20 }}>
            No results found.
          </div>
        ) : (
          filteredOrders.map((order, index) => {
            const formatedDate = formattedDate(order?.date);
            return (
              <div className="order-item" key={order._id || index}>
                <img src={assets.parcel_icon} alt="" />
                <div className="order-info">
                  <p className="order-item-car">
                    {order.items.map((item, idx) => {
                      const formatted = `${item.name} x${item.quantity}`;
                      return (
                        <span key={idx}>
                          {highlightMatch(formatted)}
                          {idx < order.items.length - 1 ? ", " : ""}
                        </span>
                      );
                    })}
                  </p>
                  <p className="order-item-name">
                    {highlightMatch(order.address?.fullName)}
                  </p>
                  <div className="email-row">
                    <MdEmail />
                    <p className="order-item-email">
                      {highlightMatch(order.address?.email)}
                    </p>
                  </div>
                  <div className="email-row">
                    <BsTelephoneForwardFill />
                    <p className="order-item-phone">
                      {highlightMatch(order.address?.phone)}
                    </p>
                  </div>
                  <div className="email-row">
                    <FaCarAlt />
                    <p className="order-item-regnummer">
                      {highlightMatch(order.address?.regnummer)}
                    </p>
                  </div>
                  <div className="email-row">
                    <CiCalendarDate />
                    <p>Service datum: {order.acceptedDate}</p>
                  </div>
                  <div className="email-row">
                    <CiCalendarDate />
                    <p>Beställ datum: {formatedDate}</p>
                  </div>
                </div>
                <p>Items: {order.items.length}</p>
                <div className="select-update-btn">
                  <select
                    value={selectedStatuses[order._id] ?? order.status}
                    onChange={(e) => {
                      handleSelectChange(order._id, e.target.value);
                    }}
                  >
                    <option value="Pending to accept">Pending to accept</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <button
                    type="submit"
                    className="orders-add-btn"
                    onClick={() =>
                      statusHandler(
                        order._id,
                        selectedStatuses[order._id] ?? order.status
                      )
                    }
                  >
                    Uppdatera
                  </button>
                </div>

                <div className="delete-btn">
                  <button
                    type="submit"
                    className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer m-10"
                    onClick={() => setConfirmDeleteId(order._id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="order-description">
                  <p className="order-item-regnummer">User comments: </p>
                  <p>{order.address.userComment || "No comment provided"}</p>
                </div>
                <div className="order-description">
                  <p>Comments for client</p>
                  <p>{order.comment || "No comments provided"}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 animate-slideUp">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Delete Item?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                onClick={async () => {
                  if (!confirmDeleteId) {
                    toast.error("No order selected to delete");
                    return;
                  }

                  await deleteHandler(confirmDeleteId); // run the delete
                  setConfirmDeleteId(null); // clear selection AFTER delete
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedOrdersDetails;
