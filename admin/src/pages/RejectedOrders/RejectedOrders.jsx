import { useContext, useState, useEffect } from 'react'
import './RejectedOrders.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets';
import { StoreContext } from "../../context/StoreContext";

const RejectedOrders = ({url}) => {
  const { statusUpdateHandler } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  
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
      <h3>Rejected orders Page</h3>
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
              <p className='order-item-phone'><b>Service Datum: {order.address.bookDate}</b></p>
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
              statusHandler(selectedStatuses[order._id] ?? order.status, order._id, url)
              // statusUpdateHandler(selectedStatuses[order._id] ?? order.status, order._id, url)
            }>
              Uppdatera
            </button>
            <div className='delete-btn'>
                <button type='submit' className='px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer m-10'
                    onClick={() => setConfirmDeleteId(order._id)}
                  >
                  Delete
                </button>
            </div>
          </div>
        ))}
      </div>
        {confirmDeleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center animate-fadeIn">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 animate-slideUp">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Delete Item?
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this item? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
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
  )
}

export default RejectedOrders;