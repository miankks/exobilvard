import { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets';

export const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);
  
  const fetchAllOrders = async () => {
    const response = await axios.get(url+'/api/order/listcar');
    
    if (response.data.success) {
      setOrders(response.data.data);
      
    } else {
      toast.error("Error")
    }
  }

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status: e.target.value
    })    

    if (response.data.success) {
      await fetchAllOrders();
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
          <div className='order-item' key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-car'>
                {order.items.map((item, index) =>{
                  if (index === order.items.length -1) {
                    return item.name + " x" + item.quantity
                  } else {
                    return item.name + " x " +item.quantity + ", " 
                  }
                })}
              </p>
              <p className='order-item-name'>
                {order.address.fullName}
              </p>
              <p className='order-item-phone'>{order.address.fullName}</p>
              <p className='order-item-phone'>{order.address.email}</p>
              <p className='order-item-phone'>{order.address.phone}</p>
              <p className='order-item-phone'>Datum:{order.address.bookDate}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Pending to accept">Pending to accept</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
