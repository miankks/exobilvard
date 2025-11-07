import React, { useContext, useState } from 'react'
import './CarDisplay.css'
import { StoreContext } from '../../context/StoreContext'
// import CarItem from '../carItem/carItem';
import CarItem from '../CarItem/CarItem'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Moment from 'react-moment'
import Reactdatepicker from '../Reactdatepicker/Reactdatepicker'

const CarDisplay = ({ category }) => {
    const { car_list } = useContext(StoreContext);
    
  return ( 
    <div className='car-display' id='car-display'>
        <h2>Våra tjänster</h2>
        <div className="car-display-list">
            {car_list.map((item, index) => {
              if (category === "All" || category === item.category) {
                return <CarItem key={index} id={item._id} name={item.name} description={item.description}
                    price={item.price ? item.price : 'Pris förslag hos Exobil'} image={item.image}/>
              }
            })}
        </div>
        <Link to={'/cart'}>
          <button>Proceed to cart</button>
        </Link>
        <div>
          <Reactdatepicker />
        </div>
    </div>
  )
}

export default CarDisplay