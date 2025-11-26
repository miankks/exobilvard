import { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { MdOutlineMailOutline } from "react-icons/md";
import { BsTelephoneForward } from "react-icons/bs";
import { FaCarAlt, FaCheck, FaTachometerAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import Reactdatepicker from '../../components/Reactdatepicker/Reactdatepicker';

const ServiceDateOption = ({ orderId, label, date, selected, setSelectedServiceDate }) => {
  if (selected && selected !== label) return null;

  return (
    <div className="email-row">
      <CiCalendarDate />
      <p className="order-item-phone bold">{label}: {date}</p>
      <span className='accept-button-span'>
        <button
          type='button'
          className='cursor accept-button'
          onClick={() => setSelectedServiceDate(prev => ({
            ...prev,
            [orderId]: label
          }))}
        >
          <FaCheck />
        </button>
      </span>
    </div>
  );
};

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [comment, setComment] = useState('');
  const [selectedServiceDate, setSelectedServiceDate] = useState({});

  const fetchAllOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url + '/api/order/listcar', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) setOrders(response.data.data);
      else toast.error("Error fetching orders");
    } catch (err) {
      toast.error("Network Error");
    }
  };

  const updateOrderStatusLocally = (id, newStatus) => {
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
  };

  const handleSelectChange = (orderId, value) => {
    setSelectedStatuses(prev => ({ ...prev, [orderId]: value }));
  };

  const statusHandler = async (status, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", { orderId, status, comment });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllOrders();
      } else toast.error(response.data.message);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => { fetchAllOrders(); }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => {
          const selected = selectedServiceDate[order._id];
          const dates = [
            { key: "date1", label: "Service Datum 1", value: order.address.bookDate1 },
            { key: "date2", label: "Service Datum 2", value: order.address.bookDate2 },
            { key: "date3", label: "Service Datum 3", value: order.address.bookDate3 }
          ];

          return (
            <div className="order-item" key={order._id}>
              {/* Column 1 */}
              <img src={assets.parcel_icon} alt="" />

              {/* Column 2 */}
              <div className="order-info">
                <p className="order-item-car">
                  {order.items.map((item, i) => `${item.name} x${item.quantity}${i < order.items.length - 1 ? ', ' : ''}`)}
                </p>
                <p className="order-item-name">{order.address.fullName}</p>
                <div className="email-row"><MdOutlineMailOutline /><p>{order.address.email}</p></div>
                <div className="email-row"><BsTelephoneForward /><p>{order.address.phone}</p></div>
                <div className="email-row"><FaCarAlt /><p>{order.address.regnummer}</p></div>
                <div className="email-row"><FaTachometerAlt /><p>{order.address.miltal}</p></div>

                {/* Service Dates */}
                {dates.map(d => (
                  <ServiceDateOption
                    key={d.key}
                    orderId={order._id}
                    label={d.key}
                    date={d.value}
                    selected={selected}
                    setSelectedServiceDate={setSelectedServiceDate}
                  />
                ))}

                <p className="order-item-phone bold order-timestamp">Beställning Datum: {order.orderDate || "Loading"}</p>
                <p className="order-item-phone bold">Beställning Tid: {order.orderTime || "Loading"}</p>
              </div>

              {/* Column 3 */}
              <p>Items: {order.items.length}</p>

              {/* Column 4 - Status */}
              <select
                value={order.status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  updateOrderStatusLocally(order._id, newStatus);
                  handleSelectChange(order._id, newStatus);
                }}
              >
                <option value="Pending to accept">Pending to accept</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>

              {/* Column 5 - Update */}
              <button
                type="submit"
                className="add-btn"
                onClick={() => statusHandler(selectedStatuses[order._id] ?? order.status, order._id)}
              >
                Uppdatera
              </button>

              {(selectedStatuses[order._id] ?? order.status) === "Rejected" &&
                <div className='order-date'>
                  <h6>Välj en ny tid</h6>
                  <Reactdatepicker sendDataToParent={(date) => console.log(date)} />
                </div>
              }

              {/* Comments */}
              <div className="order-description">
                <p>Comments for client</p>
                <p>{order.comment || 'No comment provided'}</p>
              </div>
              <div className="order-description">
                <textarea
                  name="description"
                  rows="6"
                  placeholder="Write content here"
                  required
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;



// import { useState, useEffect } from 'react'
// import './Orders.css'
// import axios from 'axios';
// import { toast } from 'react-toastify'
// import { assets } from '../../assets/assets';
// import { MdOutlineMailOutline } from "react-icons/md";
// import { BsTelephoneForward } from "react-icons/bs";
// import { FaCarAlt } from "react-icons/fa";
// import { CiCalendarDate } from "react-icons/ci";
// import Reactdatepicker from '../../components/Reactdatepicker/Reactdatepicker';
// import { FaCheck, FaTachometerAlt } from "react-icons/fa";


// const Orders = ({url}) => {
//   const [orders, setOrders] = useState([]);
//   const [selectedStatuses, setSelectedStatuses] = useState({});
//   const [comment, setComment] = useState('');
//   const [acceptedDate, setAcceptedDate] = useState('');
//   const [selectedServiceDate, setSelectedServiceDate] = useState({});
  
  
//    const [data, setData] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         regnummer: '',
//         bookDate1:'',
//         bookDate2:'',
//         bookDate3:'',
//         miltal: ''
//       })

//   const onChangeHandler = (e) => {
//     const value = e.target.value;
//     setComment(value)
//   }

//   const updateDate = (newDate) => {
//     setAcceptedDate(newDate);
//   }

//   const fetchAllOrders = async () => {
//     const token = localStorage.getItem("token");
//     const response = await axios.get(url+'/api/order/listcar',{
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     if (response.data.success) {
//       setOrders(response.data.data);
//     } else {
//       toast.error("Error")
//     }
//   }

//   const updateOrderStatusLocally = (id, newStatus) => {
//   setOrders(prev =>
//     prev.map(o =>
//       o._id === id ? { ...o, status: newStatus } : o
//     )
//   );
// };
//   const handleSelectChange = (orderId, value) => {
//     setSelectedStatuses((prev) => ({
//       ...prev,
//       [orderId]: value,
//     }));
//   };

//   const statusHandler = async (status, orderId) => {
//     const response = await axios.post(url+"/api/order/status", {
//       orderId,
//       status,
//       comment
//     })
    
//     if (response.data.success) {
//       toast.success(response.data.message)
//       await fetchAllOrders();
//     } else {
//       toast.error(response.data.message)
//     }
//   }

//      const handleDate1 = (date) => {
//       const bookingTime = date.combined.format('YYYY MM DD - HH:mm')
//       setData({...data, bookDate1: bookingTime})
//     }

//   useEffect(() => {
//     fetchAllOrders();
//   },[])

//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order, index) => {
//           const selected = selectedServiceDate[order._id];
//           return (
//           <div className="order-item" key={index}>
            
//             {/* Column 1 */}
//             <img src={assets.parcel_icon} alt="" />

//             {/* Column 2 - User Info Section */}
//             <div className="order-info">
//               <p className="order-item-car">
//                 {order.items.map((item, index) =>
//                   index === order.items.length - 1
//                     ? item.name + " x" + item.quantity
//                     : item.name + " x " + item.quantity + ", "
//                 )}
//               </p>

//               <p className="order-item-name">{order.address.fullName}</p>
//               <div className="email-row">
//                 <MdOutlineMailOutline />
//                 <p className="order-item-email">{order.address.email}</p>
//               </div>
//               <div className="email-row">
//               <BsTelephoneForward />
//               <p className="order-item-phone">{order.address.phone}</p> 
//               </div>
//               <div className="email-row">
//                 <FaCarAlt />
//                 <p className="order-item-regnummer">{order.address.regnummer}</p>
//               </div>
//                <div className="email-row">
//                 <FaTachometerAlt />
//                 <p className="order-item-regnummer">{order.address.miltal}</p>
//               </div>
//               {!selected || selected === "date1" ? (
//               <div className="email-row">
//                   <CiCalendarDate />
//                 <p className="order-item-phone bold">
//                   Service Datum 1: {order.address.bookDate1}
//                 </p>
//                 <span className='accept-button-span'>
//                   <button type='button' 
//                         className='cursor accept-button' 
//                         onClick={() => {
//                           // updateDate(order.address.bookDate1)
//                           setSelectedServiceDate(prev => ({
//                             ...prev,
//                             [order._id]: "date1"
//                           }))}}>
//                     <FaCheck />
//                   </button>
//                 </span>
//               </div>
//               ): null}
//               {!selected || selected === "date2" ? (
//                <div className="email-row">
//                   <CiCalendarDate />
//                 <p className="order-item-phone bold">
//                   Service Datum 2: {order.address.bookDate2}
//                 </p>
//                 <span className='accept-button-span'>
//                   <button type='button' 
//                         className='cursor accept-button'
//                         onClick={() => {
//                           // updateDate(order.address.bookDate2)
//                           setSelectedServiceDate(prev => ({
//                               ...prev,
//                               [order._id]: "date2"
//                             }))}}>
//                     <FaCheck />
//                   </button>
//                 </span>
//               </div>
//               ): null}
//               {!selected || selected === "date3" ? (
//                <div className="bookdate-row">
//                   <span><CiCalendarDate /></span>
//                 <p className="order-item-phone bold">
//                   Service Datum 3: {order.address.bookDate3}
//                 </p>
//                 <span className='accept-button-span'>
//                   <button type='button' 
//                         className='cursor accept-button'
//                         onClick={() => {
//                           // updateDate(order.address.bookDate3)
//                           setSelectedServiceDate(prev => ({
//                             ...prev,
//                             [order._id]: "date3"
//                           }))}}>
//                     <FaCheck />
//                   </button>
//                 </span>
//               </div>
//               ): null}
//               <p className="order-item-phone bold order-timestamp">
//                 Beställning Datum: {order?.orderDate || "Loading"}
//               </p>

//               <p className="order-item-phone bold">
//                 Beställning Tid: {order?.orderTime || "Loading"}
//               </p>
//             </div>

//             {/* Column 3 */}
//             <p>Items: {order.items.length}</p>

//             {/* Column 4 */}
//             <select
//               value={order.status}
//               onChange={(e) => {
//                 const newStatus = e.target.value;
//                 updateOrderStatusLocally(order._id, newStatus);
//                 handleSelectChange(order._id, e.target.value);
//               }}
//             >
//               <option value="Pending to accept">Pending to accept</option>
//               <option value="Accepted">Accepted</option>
//               <option value="Rejected">Rejected</option>
//               <option value="Completed">Completed</option>
//             </select>

//             {/* Column 5 */}
//             <button
//               type="submit"
//               className="add-btn"
//               onClick={() =>
//                 statusHandler(selectedStatuses[order._id] ?? order.status, order._id)
//               }
//             >
//               Uppdatera
//             </button>
//             {(selectedStatuses[order._id] ?? order.status) === "Rejected" &&
//                <div className='order-date'>
//                 <h6>Välj en ny tid</h6>
//                 <Reactdatepicker 
//                   sendDataToParent={handleDate1}
//                 />
//               </div>
//             }
//             {/* FULL ROW at Bottom */}
//              <div className="order-description">
//               <p>Comments for client</p>
//               <p>{order.comment || 'No comment provided'}</p>
//             </div>
//             <div className="order-description">
//               <p>Comments for client</p>
//               <textarea
//                 name="description"
//                 rows="6"
//                 placeholder="Write content here"
//                 required
//                 onChange={onChangeHandler}
//                 value={comment}
//               />
//             </div>
             
//           </div>
//         )})}
//       </div>
//     </div>
//   )
// }

// export default Orders;