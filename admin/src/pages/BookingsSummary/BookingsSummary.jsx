
import { useState, useEffect } from 'react'
import './BookingsSummary.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { formattedDate } from '../../customHooks/formattedDate';
import { useNavigate } from 'react-router-dom';

const BookingsSummary = ({url}) => {
  const [orders, setOrders] = useState([]);
    const navigate = useNavigate()

  const handleOrder = (orderID) => {
    navigate(`/orders/${orderID}`)
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

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetchAllOrders();
  }
}, [])

  return (
    <div className='booking-summary booking-container'>
      <h3>Beställnings sida</h3>
      <div className="booking-summary-list">
        {orders.map((order, index) => {
          return (
          <div className="booking-summary-description" key={index}>
            <div className="booking-summary-info">
              <p className="booking-item-name">{order.address.fullName}</p>
              {/* <p className="booking-item-name"><b>Namn:</b> {order.address.fullName}</p> */}
              <div className="booking-summary-email-row">
                <p className="">{order.address.email}</p>
                {/* <p className=""><b>emejl:</b> {order.address.email}</p> */}
              </div>
              <div className="booking-summary-email-row">
              <p className="">{order.address.phone}</p> 
              {/* <p className=""><b>Mobil:</b> {order.address.phone}</p>  */}
              </div>
            </div>
            <button type='button' onClick={() => handleOrder(order._id)}>Details</button>
          </div>
        )
        })}
      </div>
    </div>
  )
}

export default BookingsSummary;
