import React, { useContext, useState } from 'react';
import './MobileOnlyText.css';
import { menu_list } from '../../assets/assets'
import { CarContext } from '../../context/CarContext';
import { CartContext } from '../../context/CartContext';
import { FcApproval } from "react-icons/fc";

const MobileOnlyText = React.memo(({ id, name, selectedService, setSelectedService, category  }) => {
  const {cartItems, addToCart, removeFromCart} = useContext(CartContext)
  const {url} = useContext(CarContext)
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { car_list } = useContext(CarContext);
  const [categoryCheck, setCategoryCheck] = useState(false)

  const handleToggle = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  const handleCheck = () => {
    setCategoryCheck(!categoryCheck)
  }


   return (
    <div className="mobile-text-accordion">
            {menu_list.map((item, index) => (
                <div key={index} 
                    className={`accordion-card ${expandedIndex === index ? 'accordion-card-expanded' : ''}`} 
                >
                    <div className='accordion-header' onClick={() => handleToggle(index)}>
                        <p>{item.menu_name || 'Välj en tjänst'}</p>
                        <span className="accordion-toggle">{expandedIndex === index ? '-' : '+'}</span>
                    </div>
                    {expandedIndex === index && (
                    <div className="accordion-body" onClick={handleCheck}>
                        {car_list.map((service, idx) => {
                             if (item.menu_name === service.category) {
                                return (
                                    <p
                                        key={idx}
                                        className="accordion-item"
                                        onClick={() => addToCart(id)}
                                    >
                                        {service.name} 
                                        {categoryCheck ? <FcApproval />: <span>+</span>}
                                    </p>
                                )}
                        })}
                    </div>
                    )}
                </div>
            ))}
    </div>
  );
});

export default MobileOnlyText;
