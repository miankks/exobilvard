import { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets';

export const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  
  const fetchAllOrders = async () => {
    const response = await axios.get(url+'/api/order/listcar');
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
                    return (item.name + " x " +item.quantity + ",") 
                  }
                })}
              </p>
              <p className='order-item-name'>
                {order.address.fullName}
              </p>
              <p className='order-item-phone'>{order.address.email}</p>
              <p className='order-item-phone'>{order.address.phone}</p>
              <p className='order-item-phone'>Service Datum: {order.address.bookDate}</p>
              <br /><br />
              <p className='order-item-phone'><b>Beställning Datum:</b> {order?.orderDate || 'Loading'}</p>
              <p className='order-item-phone'><b>Beställning Tid:</b> {order?.orderTime || 'Loading'}</p>
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
          </div>
        ))}
      </div>
    </div>
  )
}

// import { useState, useEffect } from 'react'
// import './Orders.css'
// import axios from 'axios';
// import { toast } from 'react-toastify'
// import { assets } from '../../assets/assets';

// export const Orders = ({url}) => {
//   const [orders, setOrders] = useState([]);
//   // console.log(orders);
  
//   const fetchAllOrders = async () => {
//     const response = await axios.get(url+'/api/order/listcar');
    
//     if (response.data.success) {
//       setOrders(response.data.data);
      
//     } else {
//       toast.error("Error")
//     }
//   }

//   const statusHandler = async (e, orderId) => {
//     console.log(orderId);
    
//     const response = await axios.post(url+"/api/order/status", {
//       orderId,
//       status: e.target.value
//     })    

//     if (response.data.success) {
//       await fetchAllOrders();
//     }
//   }
//   useEffect(() => {
//     fetchAllOrders();
//   },[])

//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order, index) => (
//           <div className='order-item' key={index}>
//             <img src={assets.parcel_icon} alt="" />
//             <div>
//               <p className='order-item-car'>
//                 {order.items.map((item, index) =>{
//                   if (index === order.items.length -1) {
//                     return item.name + " x" + item.quantity
//                   } else {
//                     return (item.name + " x " +item.quantity + ",") 
//                   }
//                 })}
//               </p>
//               <p className='order-item-name'>
//                 {order.address.fullName}
//               </p>
//               <p className='order-item-phone'>{order.address.email}</p>
//               <p className='order-item-phone'>{order.address.phone}</p>
//               <p className='order-item-phone'>Datum: {order.address.bookDate}</p>
//               <br /><br />
//               <p className='order-item-phone'><b>Beställning Datum:</b> {order?.orderDate || 'Loading'}</p>
//               <p className='order-item-phone'><b>Beställning Tid:</b> {order?.orderTime || 'Loading'}</p>
//             </div>
//             <p>Items: {order.items.length}</p>
//             {/* <select onChange={(e) => statusHandler(e, order._id)} value={order.status}> */}
//             <select  value={order.status}>
//               <option value="Pending to accept">Pending to accept</option>
//               <option value="Accepted">Accepted</option>
//               <option value="Rejected">Rejected</option>
//               <option value="Completed">Completed</option>
//             </select>
//             <button type='submit' className='add-btn' onClick={(e) => statusHandler(e, order._id)}>
//               Skicka
//               </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
