import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import axios from 'axios';
import {toast} from 'react-toastify'
import Reactdatepicker from '../../components/Reactdatepicker/Reactdatepicker';
import { CarContext } from '../../context/CarContext';
import { CartContext } from '../../context/CartContext';

const PlaceOrder = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const {car_list, url} = useContext(CarContext)
    const itemsInCart = car_list.filter(item => cartItems[item._id] > 0);
    const navigate = useNavigate();
    const [data, setData] = useState({
      fullName: '',
      email: '',
      phone: '',
      regnummer: '',
      bookDate1:'',
      bookDate2:'',
      bookDate3:'',
      miltal: '',
      userComment: ''
    })
    
    const onChangeHandler = (event) => {
      const name= event.target.name
      const value = event.target.value

      setData(data => ({...data, [name]: value}))
    }

    const placeOrder = async (e) => {
      e.preventDefault();

      // before calling api structure data
      const orderItems = car_list
                          .filter(item => cartItems[item._id] > 0)
                          .map(item => ({...item, quantity: cartItems[item._id]}))
      let now = new Date();
      let orderData = {
        address: data,
        orderDate:  now.toLocaleString("sv-SE"),
        items: orderItems,
      }
       
      try {
        // Validate date selections
        if (!data.bookDate1 || !data.bookDate2 || !data.bookDate3) {
          toast.error("Du måste välja alla tre tider innan du bokar.");
          return; // stop submission
        }
        const res =  await axios.post(url+'/api/order/place', orderData)
        if (res.data.success) {
          toast.success(res.data.message)
          navigate('/orderconfirmation')
        } else {
          toast.error(res.data.message)
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    }

    const handleDate = (key) => (date) => {
      const bookingTime = date.combined.format('YYYY MM DD - HH:mm')
      setData(prev => ({...prev, [key]: bookingTime}));
    }

    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Fill in the information for Booking</p>
        <label>Fullständigt namn</label>
          <input required  
                  name='fullName' 
                  onChange={onChangeHandler} 
                  onInvalid={(e) => e.target.setCustomValidity("Fyll i ditt fullständiga namn")}
                  onInput={(e) => e.target.setCustomValidity("")}
                  value={data.fullName} type="text" placeholder='Full Name' />
        <label>E-postadress</label>
        <input required  
                name='email' 
                onChange={onChangeHandler} 
                onInvalid={(e) => e.target.setCustomValidity("Fyll i ditt fullständig email")}
                onInput={(e) => e.target.setCustomValidity("")}
                value={data.email}  
                type="email" 
                placeholder='Email address' />
        <label>Telefonnummer</label>
        <input required 
                name='phone' 
                onChange={onChangeHandler} 
                onInvalid={(e) => e.target.setCustomValidity("Fyll i ditt telefonnummer")}
                onInput={(e) => e.target.setCustomValidity("")}
                value={data.phone} 
                type="text" 
                placeholder='Phone' />
        <div className="regandmileage">
            <div className="input-group">
              <label htmlFor="regnummer">Registreringsnummer</label>
              <input
                required
                name="regnummer"
                onChange={onChangeHandler}
                onInvalid={(e) => e.target.setCustomValidity("Fyll i ditt bil regnummer")}
                onInput={(e) => e.target.setCustomValidity("")}
                value={data.regnummer}
                type="text"
                placeholder="ABC123"
              />
            </div>

            <div className="input-group">
              <label htmlFor="miltal">Miltal</label>
              <input
                required
                name="miltal"
                onChange={onChangeHandler}
                onInvalid={(e) => e.target.setCustomValidity("Fyll i bil miltal")}
                onInput={(e) => e.target.setCustomValidity("")}
                value={data.miltal}
                type="text"
                onBeforeInput={(e) => {
                      if (!/^\d$/.test(e.data)) {
                        e.preventDefault();
                      }
                    }}
                placeholder="miltal"
              />
            </div>
          </div>

        <h6>Välj tre tider</h6>
        <Reactdatepicker sendDataToParent={handleDate('bookDate1')} selectime={'Första tid'}/> 
        <Reactdatepicker sendDataToParent={handleDate('bookDate2')} selectime={'Andra tid'}/> 
        <Reactdatepicker sendDataToParent={handleDate('bookDate3')} selectime={'Tredje tid'}/> 
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
        {
        itemsInCart.map((item, index) => (
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
            ))}
      </div>
      </div>
        <div className='placeorder-comment-section'>
            <label htmlFor="userComment">Kommentar till Eobilvårdscenter (krävs inte)</label>
           <textarea
                name="userComment"
                rows="6"
                className='comment-area'
                placeholder="Om du vill beskriva något?"
                required
                onChange={onChangeHandler}
                value={data.userComment}
              />
          </div>
          <button type='submit' >Complete Booking</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
