import { useContext, useEffect } from 'react'
import './CarDisplay.css'
import { StoreContext } from '../../context/StoreContext'
// import CarItem from '../carItem/carItem';
import CarItem from '../CarItem/CarItem'
import { Link } from 'react-router-dom'
import { useObjectEnabled } from '../../Customhooks/useObjectEnabled'

const CarDisplay = ({ category }) => {
    const { car_list, cartItems } = useContext(StoreContext);
    // const { isEmpty, isEnabled } = useObjectEnabled(cartItems);
    // console.log(isEmpty);
    
  return ( 
    <div className='car-display' id='car-display'>
        <h2>Våra tjänster</h2>
        <div className="car-display-list">
            {car_list.map((item, index) => {
              if (category === "All" || category === item.category) {
                return <CarItem key={index} id={item._id} name={item.name} description={item.description}
                     image={item.image}/>
              }
            })}
        </div>
          <Link to={'/cart'} >
          <button>Proceed to cart</button>
          </Link> 
    </div>
  )
}

export default CarDisplay


// used if price is available for a service
// price={item.price ? item.price : 'Pris förslag hos Exobil'}