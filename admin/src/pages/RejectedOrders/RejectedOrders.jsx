import { useContext, useState, useEffect } from 'react'
import './RejectedOrders.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const RejectedOrders = ({url}) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  
  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(url+'/api/order/rejectedorders',{
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

  const handleOrder = (orderID) => {
    navigate(`/rejectedorders/${orderID}`)
  }

  useEffect(() => {
    fetchAllOrders();
  },[])

  return (
    <div className='order add'>
      <h3>Rejected orders Summary</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
          <div className='rejecteddorder-description' key={index}>
            <div>
              <p className='rejecteddorder-item-name'>
                {order.address.fullName}
              </p>
             <div className="email-row">
                <p className="order-item-email">{order.address.email}</p>
              </div>
              <div className="email-row">
              <p className="order-item-phone">{order.address.phone}</p> 
              </div>
            </div>
            <button type='button' onClick={() => handleOrder(order._id)}>Details</button>
          </div>
        )})}
      </div>
       
    </div>
  )
}

export default RejectedOrders;