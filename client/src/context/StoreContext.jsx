import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { car_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cartItems");
        return saved ? JSON.parse(saved) : {};
    });
    const [car_list, setCarList] = useState([]);
    const [userComments, setUserComments] = useState([]);
    
    const url = "http://localhost:3000";
    const [token, setToken] = useState("")

    const addToCart = (itemId) => {
    // If item doesn't exist, set quantity = 1
    if (!cartItems[itemId]) {
        setCartItems(prev => ({ 
            ...prev, 
            [itemId]: 1 
        }));
    } 
    // If item exists, increase quantity by 1
    else {
        setCartItems(prev => ({
            ...prev,
            [itemId]: prev[itemId] + 1
        }));
    }
};

    const removeFromCart = (itemId) => {
    // Prevent negative values
    if (!cartItems[itemId]) return;

    // If quantity > 1, decrement
    if (cartItems[itemId] > 1) {
        setCartItems(prev => ({ 
            ...prev, 
            [itemId]: prev[itemId] - 1 
        }));
    } 
    // If quantity becomes 0, remove from cart
    else {
        setCartItems(prev => {
            const updatedCart = { ...prev };
            delete updatedCart[itemId];
            return updatedCart;
        });
    }
};
  
    const fetchCarList = async () => {
        const response = await axios.get(url+'/api/car/listcar');
        setCarList(response.data.data);
    }
    
    const loadCartData = async () => {
        const response = await axios.post(url+"/api/cart/getcart", {});
        // const response = await axios.post(url+"/api/cart/getcart", {}, {headers:{token}});
        setCartItems(response.data.cartData);
    }

    const fetchAllComments = async () => {
        const response = await axios.get(url+"/api/comment/getallcomments");
        setUserComments(response.data.comments)
    }
    
    // to keep the token available when page is refreshed
    useEffect(()=> {
        
        const loadData = async () => {
            await fetchCarList();
            if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            await loadCartData(localStorage.getItem("token"));
        }}
        loadData();
    },[])
    
    const contextValue = {
        car_list,
        cartItems,
        url,
        token,
        userComments,
        setToken,
        setCartItems,
        addToCart,
        removeFromCart,
        fetchAllComments
    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

// getTotalCartAmount
// const getTotalCartAmount = () => {
//     let totalAMount = 0;
//     for (const item in cartItems) {
//         if (cartItems[item] > 0) {
//             // check if item ID is matching with item, so item is available in cart
//             let itemInfo = car_list.find((product) => product._id === item);
//             totalAMount += itemInfo.price * cartItems[item];
//         }
//     }
//     return totalAMount;
// }


    // const addToCart =  (itemId) => {
    //     // if user add item first time in the cart, this statement will be executed, key ID is itemId
    //     // else if any item is already available and quantity is one, else statement will increase that
    //     if (!cartItems[itemId]) {
    //         setCartItems((prev => ({ ...prev, [itemId]: 1 })))
    //     } else {
    //         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    //     }

    //     // await axios.post(url+ "/api/cart/addcart", {itemId})
    //     // if (token) {
    //         // await axios.post(url+ "/api/cart/addcart", {itemId}, {headers:{token}})
    //     // }
    // }

      // const removeFromCart = (itemId) => {
    //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    //     // const res = await axios.post(url+ "/api/cart/removecar", {itemId})
    //     console.log(cartItems);
        
    //     // if (token) {
    //     //     await axios.post(url+ "/api/cart/removecar", {itemId}, {headers:{token}})
    //     // }
    // }

    