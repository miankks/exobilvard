// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {

   
//     const [token, setToken] = useState("")

// }
    
//     const loadCartData = async () => {
//         const response = await axios.post(url+"/api/cart/getcart", {});
//         // const response = await axios.post(url+"/api/cart/getcart", {}, {headers:{token}});
//         setCartItems(response.data.cartData);
    
//     // to keep the token available when page is refreshed
//     useEffect(()=> {
        
//         const loadData = async () => {
//             await fetchCarList();
//             if (localStorage.getItem('token')) {
//             setToken(localStorage.getItem('token'))
//             await loadCartData(localStorage.getItem("token"));
//         }}
//         loadData();
//     },[])
    
//     const contextValue = {
//         token,
//         setToken,
//         setCartItems,
//     }
    
//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     )
// }

// export default StoreContextProvider;

