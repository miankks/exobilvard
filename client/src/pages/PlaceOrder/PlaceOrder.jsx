import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {toast} from 'react-toastify'
import Reactdatepicker from '../../components/Reactdatepicker/Reactdatepicker';

const PlaceOrder = () => {
    const { token, car_list,removeFromCart, cartItems, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
      fullName: '',
      email: '',
      phone: '',
      regnummer: ''
    })

    const onChangeHandler = (event) => {
      const name= event.target.name
      const value = event.target.value

      setData(data => ({...data, [name]: value}))
    }

    const placeOrder = async (e) => {
      e.preventDefault();

      // before calling api structure data
      let orderItems = [];
      car_list.map((item)=> {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo['quantity'] = cartItems[item._id];
          orderItems.push(itemInfo)
        }
      })
      let orderData = {
        address: data,
        items: orderItems,
      }
      
      let response = await axios.post(url+'/api/order/place', orderData, {headers: {token}})
      console.log(response.data);
      if (response.data.success) {
        const { session_url} = response.data;
        // send user to session url
        window.location.replace(session_url);
        navigate('/myorders')
      } else {
        alert('Elert error')
      }
      // response.data.data ? navigate('/') : alert('Elert error')
    }

    useEffect(() => {
      if (!token) {
        navigate('/myorders')
      } 
    }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Fill in the information for Booking</p>
        <label>Fullständigt namn</label>
          <input required  name='fullName' onChange={onChangeHandler} value={data.fullName} type="text" placeholder='Full Name' />
        <label>E-postadress</label>
        <input  name='email' onChange={onChangeHandler} value={data.email}  type="email" placeholder='Email address' />
        <label>Telefonnummer</label>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        <label htmlFor="">Registreringsnummer</label>
        <input required  name='regnummer' onChange={onChangeHandler} value={data.regnummer} type="text" placeholder='ABC123' />
        <Reactdatepicker />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Väljat services</h2>
          <div>
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
          </div>
          <button type='submit' >Complete Booking</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder


// const PlaceOrder = () => {
//     const { getTotalCartAmount, token, car_list, cartItems, url } = useContext(StoreContext);
//     const navigate = useNavigate();

//     const [data, setData] = useState({
//       firstName: '',
//       lastName: '',
//       email: '',
//       street: '',
//       city: '',
//       state: '',
//       zipcode: '',
//       country: '',
//       phone: ''
//     })

//     const onChangeHandler = (event) => {
//       const name= event.target.name
//       const value = event.target.value

//       setData(data => ({...data, [name]: value}))
//     }

//     const placeOrder = async (e) => {
//       e.preventDefault();

//       // before calling api structure data
//       let orderItems = [];
//       car_list.map((item)=> {
//         if (cartItems[item._id] > 0) {
//           let itemInfo = item;
//           itemInfo['quantity'] = cartItems[item._id];
//           orderItems.push(itemInfo)
//         }
//       })
//       let orderData = {
//         address: data,
//         items: orderItems,
//         amount: getTotalCartAmount(),
//       }
//       let response = await axios.post(url+'/api/order/place', orderData, {headers: {token}})
//       if (response.data.success) {
//         const { session_url} = response.data;

//         // send user to session url
//         window.location.replace(session_url);
//       } else {
//         alert('Elert error')
//       }
      
//     }

//     useEffect(() => {
//       if (!token) {
//         navigate('/cart')
//       } 
//       // else if(getTotalCartAmount() === 0){
//       //   navigate('/cart')
//       // }
//     }, [token])

//   return (
//     <form onSubmit={placeOrder} className='place-order'>
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input  name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
//           <input  name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
//         </div>
//         <input  name='email' onChange={onChangeHandler} value={data.email}  type="email" placeholder='Email address' />
//         <input  name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
//         <div className="multi-fields">
//           <input  name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
//           <input  name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
//         </div>
//         <div className="multi-fields">
//           <input  name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
//           <input  name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
//         </div>
//         <input  name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart total</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>{getTotalCartAmount()}{" "}sek</p>
//             </div>
//             <hr />
//             {/* <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>{getTotalCartAmount() === 0 ? 0 : 50}{" "}sek</p>
//             </div> */}
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}{" "}sek</b>
//             </div>
//           </div>
//           <button type='submit'>Proceed to payment</button>
//         </div>
//       </div>
//     </form>
//   )
// }