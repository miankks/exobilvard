import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify'


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [handleOrders, setOrders] = useState({});

    const deleteOrder = (orderId) => {


    }

    const statusHandler = async ({status, orderId, url}) => {
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
}

export default StoreContextProvider;