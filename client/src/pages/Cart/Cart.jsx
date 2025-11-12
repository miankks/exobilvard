import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, car_list, removeFromCart, url } = useContext(StoreContext);
  
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Artiklar</p>
          <p>Titel</p>
          <p>Qvantitet</p>
          <p>Ta bort</p>
        </div>
        <br />
        <hr />
        {car_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+'/images/'+item.image} alt="" />
                  <p>{item.name}</p>
                  {/* will show quantity of each product */}
                  <p>{cartItems[item._id]}</p>
                  <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <button onClick={() => navigate('/order')}>Proceed to checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart

// const Cart = () => {
//   const { cartItems, car_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

//   const navigate = useNavigate();
//   return (
//     <div className='cart'>
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Artiklar</p>
//           <p>Titel</p>
//           <p>Pris</p>
//           <p>Qvantitet</p>
//           <p>Total</p>
//           <p>Ta bort</p>
//         </div>
//         <br />
//         <hr />
//         {car_list.map((item, index) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div key={index}>
//                 <div className="cart-items-title cart-items-item">
//                   <img src={url+'/images/'+item.image} alt="" />
//                   <p>{item.name}</p>
//                   <p>{item.price}sek</p>
//                   {/* will show quantity of each product */}
//                   <p>{cartItems[item._id]}</p>
//                   <p>{item.price * cartItems[item._id]}sek</p>
//                   <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
//                 </div>
//                 <hr />
//               </div>
//             )
//           }
//         })}
//       </div>
//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart total</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>{getTotalCartAmount()}{" "}sek</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>{getTotalCartAmount() === 0 ? 0 : 50}{" "}sek</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}{" "}sek</b>
//             </div>
//           </div>
//           <button onClick={() => navigate('/order')}>Proceed to checkout</button>
//         </div>
//         <div className="cart-promocode">
//           <div>
//             <p>If you have a promo code, enter it here</p>
//             <div className='cart-promocode-input'>
//               <input type="text" placeholder='promocode'/>
//               <button>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
