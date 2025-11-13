import React, { useContext } from 'react'
import './Orderconfirmation.css'
import { StoreContext } from '../../context/StoreContext'

const Orderconfirmation = () => {
  const {car_list, cartItems, url } = useContext(StoreContext);
  console.log(car_list);
  
  return (
    <div className='orderconfirmation-block'>
    <div className='orderconfirmation-heading'>Din beställning har lagts, du kommer att få en bekräftelse via e-post</div>
      <div className="orderconfirmation-items-title">
          <p>Artiklar</p>
          <p>Titel</p>
          <p>Qvantitet</p>
        </div>
        <br />
        <hr />
     {car_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="orderconfirmation-items-title cart-items-item">
                  <img src={url+'/images/'+item.image} alt="" />
                  <p>{item.name}</p>
                  {/* will show quantity of each product */}
                  <p>{cartItems[item._id]}</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
  )
}

export default Orderconfirmation