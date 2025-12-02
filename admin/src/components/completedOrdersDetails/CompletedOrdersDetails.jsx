import { useState, useEffect } from 'react'
import './CompletedOrdersDetails.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets';
import { useParams } from 'react-router-dom';

import { MdEmail } from "react-icons/md";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { formattedDate } from '../../customHooks/formattedDate';

const CompletedOrdersDetails = ({url}) => {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState({});
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOrder, setFilteredOrder] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(url + '/api/order/completedorders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      toast.error("Error fetching orders");
    }
  }

  const updateOrderStatusLocally = (id, newStatus) => {
    setOrders(prev =>
      prev.map(o =>
        o._id === id ? { ...o, status: newStatus } : o
      )
    );
  };

  const handleSelectChange = (orderId, value) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const statusHandler = async (status, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Error updating status");
    }
  }

  const deleteHandler = async (orderId) => {
    try {
      const response = await axios.post(url + "/api/order/deleteorders", {
        orderId
      });

      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Error deleting order");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  },[])


  // escape regex special characters to avoid crashes when user types symbols
  const escapeRegExp = (string = "") => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
        <span key={i} className="bg-yellow-300 font-bold">{part}</span>
      ) : (
        part
      )
    );
  };

  // computed filteredOrders - only these will be shown
  const filteredOrders = orders
    .filter(order => {
        if (id) return order._id === id;
        return true;
    })
    .filter(order => {
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
      .map(i => `${i.name} x${i.quantity}`)
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
    <div className='order add'>
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
            <div className='complatedorder-item' key={order._id || index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-car'>
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
                <p className='order-item-name'>
                  {highlightMatch(order.address?.fullName)}
                </p>
                <div className="email-row">
                  <MdEmail />
                  <p className="order-item-email">{highlightMatch(order.address?.email)}</p>
                </div>
                <div className="email-row">
                  <BsTelephoneForwardFill />
                  <p className="order-item-phone">{highlightMatch(order.address?.phone)}</p>
                </div>
                <div className="email-row">
                  <FaCarAlt />
                  <p className="order-item-regnummer">{highlightMatch(order.address?.regnummer)}</p>
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

              <select
                value={selectedStatuses[order._id] ?? order.status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  updateOrderStatusLocally(order._id, newStatus);
                  handleSelectChange(order._id, e.target.value);
                }}
              >
                <option value="Pending to accept">Pending to accept</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                type='submit'
                className='add-btn'
                onClick={() =>
                  statusHandler(selectedStatuses[order._id] ?? order.status, order._id)
                }
              >
                Uppdatera
              </button>

              <div className='delete-btn'>
                <button
                  type='submit'
                  className='px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer m-10'
                  onClick={() => setConfirmDeleteId(order._id)}
                >
                  Delete
                </button>
              </div>
               <div className="order-description">
                <p className="order-item-regnummer">User comments: {order.address.userComment || 'No comment provided'}</p>
                </div>
              <div className="order-description">
                <p>Comments for client</p>
                <p>{order.comment || 'No comments provided'}</p>
              </div>
            </div>
          )})
        )}
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 animate-slideUp">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Delete Item?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
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
                onClick={() => {
                  deleteHandler(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default CompletedOrdersDetails;
