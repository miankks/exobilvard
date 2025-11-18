import { useState, useEffect } from 'react'
import './RejectedOrders.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets';

const RejectedOrders = ({url}) => {
  const [orders, setOrders] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  
  const fetchAllOrders = async () => {
    const response = await axios.get(url+'/api/order/rejectedorders');
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
      status
    })
    
    if (response.data.success) {
      toast.success(response.data.message)
      await fetchAllOrders();
    } else {
      toast.error(response.data.message)
    }
  }

    const deleteHandler = async (orderId) => {
      console.log(orderId);
      
    const response = await axios.post(url+"/api/order/deleteorders", {
      orderId
    })
    
    if (response.data.success) {
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
          <div className='rejecteddorder-item' key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='rejecteddorder-item-car'>
                {order.items.map((item, index) =>{
                  if (index === order.items.length -1) {
                    return item.name + " x" + item.quantity
                  } else {
                    return (item.name + " x " +item.quantity + ",") 
                  }
                })}
              </p>
              <p className='rejecteddorder-item-name'>
                {order.address.fullName}
              </p>
              <p className='order-item-phone'>{order.address.email}</p>
              <p className='order-item-phone'>{order.address.phone}</p>
              <p className='order-item-phone'>Datum: {order.address.bookDate}</p>
              <br /><br />
              <p className='order-item-phone'><b>Beställning Datum:</b> {order?.orderDate || 'Loading'}</p>
              <p className='order-item-phone'><b>Beställning Tid:</b> {order?.orderTime || 'Loading'}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <select className='rejecteddorder-item-select'  value={order.status} onChange={(e) => 
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
              Skicka
            </button>
            <div className='delete-btn'>
                <button type='submit' className='add-btn' onClick={() =>
                      deleteHandler(order._id)
                }>
                  Delete
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RejectedOrders;