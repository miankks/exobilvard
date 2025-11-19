import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify'


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    
    const [handleOrders, setHandleOrders] = useState({});
    // const deleteOrder = (orderId) => {
    // }

    const statusUpdateHandler = async (status, orderId, url) => {
        const response = await axios.post(url+"/api/order/status", {
      orderId,
      status
    })
    
    if (response.data.success) {
      toast.success(response.data.message)
    //   await fetchAllOrders();
    } else {
      toast.error(response.data.message)
    }
    }
    const contextValue = {
        handleOrders,
        statusUpdateHandler
    }
     return (
            <StoreContext.Provider value={contextValue}>
                {props.children}
            </StoreContext.Provider>
        )
        
}


export default StoreContextProvider;