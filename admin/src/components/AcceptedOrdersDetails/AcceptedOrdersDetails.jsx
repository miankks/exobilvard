import { useState, useEffect } from 'react'
import './AcceptedOrdersDetails.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets';
import { MdEmail } from "react-icons/md";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { formattedDate } from '../../customHooks/formattedDate';

const AcceptedOrdersDetails = ({url}) => {
  const [orders, setOrders] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  
  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(url+'/api/order/acceptedorders',{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if (response.data.success) {
        setOrders(response.data.data);
        
      } else {
        toast.error("Error")
      }
    } catch (error) {
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
    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status
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
      <h3>Accepted Orders Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          const formatedDate = formattedDate(order?.date);
          return(
          <div className='complatedorder-item' key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-car'>
                {order.items.map((item, index) =>{
                  if (index === order.items.length -1) {
                    return item.name + " x" + item.quantity
                  } else {
                    return (item.name + " x " +item.quantity + ",") 
                  }
                })}
              </p>
              <p className='order-item-name'>
                {order.address.fullName}
              </p>
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
                <p className="order-item-regnummer">{order.address.regnummer}</p>
              </div>
               <div className="email-row">
                  <CiCalendarDate />
                <p className="order-item-phone bold">
                  Service Datum: {order.acceptedDate}
                </p>
              </div>
              <p className='order-item-phone order-timestamp'><b>Beställning Datum:</b> {formatedDate || 'Loading'}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <select  value={order.status} onChange={(e) => 
              {
                const newStatus = e.target.value;
                updateOrderStatusLocally(order._id, newStatus);
                handleSelectChange(order._id, e.target.value)}}>
              <option value="Pending to accept">Pending to accept</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
            <button type='submit' className='add-btn' onClick={() =>
              statusHandler(selectedStatuses[order._id] ?? order.status, order._id)
            }>
              Uppdatera
              </button>
              <div className="order-description">
                <p className="order-item-regnummer">User comments:</p>
                <p>{order.address.userComment || 'No comment provided'}</p>
              </div>
               <div className="order-description">
              <p>Comments for client</p>
              <p>{order.comment || 'No comments provided'}</p>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}

export default AcceptedOrdersDetails;