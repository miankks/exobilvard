import { createContext, useEffect, useReducer } from 'react';

export const CartContext = createContext(null);

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': return {
            ...state, 
            [action.id]: (state[action.id] ||0) + 1, 
        };

        case 'REMOVE':  
            if (!state[action.id]) return state;

            if (state[action.id] === 1) {
                const updated = { ...state};
                delete updated[action.id];
                return updated;
            }

            return {
                ...state,
                [action.id]: state[action.id] - 1,
            }
        case 'SET':
            return action.payload;
        
            default:
                return state;
    }
}

const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useReducer(
        cartReducer,
        {},
        () => {
            const saved = localStorage.getItem("cartItems");
            return saved ? JSON.parse(saved) : {};
        }
    )

// persist cart

useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems])

const addToCart = (id) => setCartItems({type: "ADD", id});
const removeFromCart = (id) => setCartItems({type: "REMOVE", id});
const setCart = (data) => setCartItems({type: "SET",payload: data});

return (
    <CartContext.Provider value={{cartItems, addToCart, removeFromCart, setCart}}>
        {children}
    </CartContext.Provider>
)
}

export default CartProvider;
