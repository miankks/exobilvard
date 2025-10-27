import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { car_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [car_list, setCarList] = useState([]);
    
    const url = "http://localhost:3000";
    const [token, setToken] = useState("")

    const addToCart = async (itemId) => {
        // if user add item first time in the cart, this statement will be executed, key ID is itemId
        // else if any item is already available and quantity is one, else statement will increase that
        if (!cartItems[itemId]) {
            setCartItems((prev => ({ ...prev, [itemId]: 1 })))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if (token) {
            await axios.post(url+ "/api/cart/add", {itemId}, {headers:{token}})
        }
    }

    const removeFromCart =async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if (token) {
            await axios.post(url+ "/api/cart/remove", {itemId}, {headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAMount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // check if item ID is matching with item, so item is available in cart
                let itemInfo = car_list.find((product) => product._id === item);
                totalAMount += itemInfo.price * cartItems[item];
            }
        }
        return totalAMount;
    }

    const fetchCarList = async () => {
        const response = await axios.get(url+'/api/car/list');
        setCarList(response.data.data);
    }

    // to keep the token available when page is refreshed
    useEffect(()=> {
        
        const loadData = async () => {
            await fetchCarList();
            if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }}
        loadData();
    },[])

    const contextValue = {
        car_list,
        cartItems,
        url,
        token,
        setToken,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;