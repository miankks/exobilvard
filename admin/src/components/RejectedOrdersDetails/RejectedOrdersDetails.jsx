import { useContext, useState, useEffect } from "react";
import "./RejectedOrdersDetails.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { MdEmail } from "react-icons/md";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { formattedDate } from "../../customHooks/formattedDate";

const RejectedOrdersDetails = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(url + "/api/order/rejectedorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  const updateOrderStatusLocally = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
    );
  };
  const handleSelectChange = (orderId, value) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const statusHandler = async (status, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status,
    });

    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrders();
    } else {
      toast.error(response.data.message);
    }
  };

  const deleteHandler = async (orderId) => {
    const response = await axios.post(url + "/api/order/deleteorders", {
      orderId,
    });

    if (response.data.success) {
      await fetchAllOrders();
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Rejected orders Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          const formatedDate = formattedDate(order?.date);
          return (
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-car">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x" + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ",";
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.fullName}</p>
                <div className="email-row">
                  <MdEmail />
                  <p className="order-item-email">{order.address.email}</p>
                </div>
                <div className="email-row">
                  <BsTelephoneForwardFill />
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <div className="email-row">
                  <FaCarAlt />
                  <p className="order-item-regnummer">
                    {order.address.regnummer}
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
                  className="order-item-select"
                  value={order.status}
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
                  type="submit"
                  className="orders-add-btn"
                  onClick={() =>
                    statusHandler(
                      selectedStatuses[order._id] ?? order.status,
                      order._id,
                      url
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
                <p className="order-item-regnummer">User comments:</p>
                <p>{order.address.userComment || "No comment provided"}</p>
              </div>
              <div className="order-description">
                <p>Comments for client</p>
                <p>{order.comment || "No comments provided"}</p>
              </div>
            </div>
          );
        })}
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
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
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
  );
};

export default RejectedOrdersDetails;
