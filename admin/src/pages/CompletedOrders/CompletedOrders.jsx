import { useState, useEffect } from 'react'
import './CompletedOrders.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const CompletedOrders = ({url}) => {
  const [orders, setOrders] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const handleOrder = (orderID) => {
    navigate(`/completedorders/${orderID}`)
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
  const filteredOrders = orders.filter(order => {
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
      <h3>Completed Orders Summary</h3>

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

      <div>
        {filteredOrders.length === 0 ? (
          <div className="no-results" style={{ padding: 20 }}>
            No results found.
          </div>
        ) : (
          filteredOrders.map((order, index) => {
            return (
            <div className='completeorder-description' key={order._id || index}>
              <div>
                <p className='order-item-name'>
                  {highlightMatch(order.address?.fullName)}
                </p>
                <div className="email-row">
                  <p className="order-item-email">{highlightMatch(order.address?.email)}</p>
                </div>
                <div className="email-row">
                  <p className="order-item-phone">{highlightMatch(order.address?.phone)}</p>
                </div>
              </div>
               <button type='button' onClick={() => handleOrder(order._id)}>Details</button>
            </div>
          )})
        )}
      </div>
    </div>
  )
}

export default CompletedOrders;
