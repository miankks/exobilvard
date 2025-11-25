import { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets';
import { MdOutlineMailOutline } from "react-icons/md";
import { BsTelephoneForward } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";

export const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [comment, setComment] = useState('');
  const onChangeHandler = (e) => {
    const value = e.target.value;
    setComment(value)
  }
  const fetchAllOrders = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(url+'/api/order/listcar',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error")
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
    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status,
      comment
    })
    
    if (response.data.success) {
      toast.success(response.data.message)
      await fetchAllOrders();
    } else {
      toast.error(response.data.message)
    }
  }
  useEffect(() => {
    fetchAllOrders();
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            
            {/* Column 1 */}
            <img src={assets.parcel_icon} alt="" />

            {/* Column 2 - User Info Section */}
            <div className="order-info">
              <p className="order-item-car">
                {order.items.map((item, index) =>
                  index === order.items.length - 1
                    ? item.name + " x" + item.quantity
                    : item.name + " x " + item.quantity + ", "
                )}
              </p>

              <p className="order-item-name">{order.address.fullName}</p>
              <div className="email-row">
                <MdOutlineMailOutline />
                <p className="order-item-email">{order.address.email}</p>
              </div>
              <div className="email-row">
              <BsTelephoneForward />
              <p className="order-item-phone">{order.address.phone}</p> 
              </div>
              <div className="email-row">
                <FaCarAlt />
                <p className="order-item-regnummer">{order.address.regnummer}</p>
              </div>
              <div className="email-row">
                  <CiCalendarDate />
                <p className="order-item-phone bold">
                  Service Datum 1: {order.address.bookDate}
                </p>
              </div>
               <div className="email-row">
                  <CiCalendarDate />
                <p className="order-item-phone bold">
                  Service Datum 2: {order.address.bookDate1}
                </p>
              </div>
               <div className="email-row">
                  <CiCalendarDate />
                <p className="order-item-phone bold">
                  Service Datum 3: {order.address.bookDate1}
                </p>
              </div>

              <p className="order-item-phone bold order-timestamp">
                Beställning Datum: {order?.orderDate || "Loading"}
              </p>

              <p className="order-item-phone bold">
                Beställning Tid: {order?.orderTime || "Loading"}
              </p>
            </div>

            {/* Column 3 */}
            <p>Items: {order.items.length}</p>

            {/* Column 4 */}
            <select
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

            {/* Column 5 */}
            <button
              type="submit"
              className="add-btn"
              onClick={() =>
                statusHandler(selectedStatuses[order._id] ?? order.status, order._id)
              }
            >
              Uppdatera
            </button>

            {/* FULL ROW at Bottom */}
             <div className="order-description">
              <p>Comments for client</p>
              <p>{order.comment || 'No comment provided'}</p>
            </div>
            <div className="order-description">
              <p>Comments for client</p>
              <textarea
                name="description"
                rows="6"
                placeholder="Write content here"
                required
                onChange={onChangeHandler}
                value={comment}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
