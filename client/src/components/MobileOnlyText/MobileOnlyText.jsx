import React, { useContext, useState } from 'react';
import './MobileOnlyText.css';
import { menu_list } from '../../assets/assets'
import { CarContext } from '../../context/CarContext';

const services = [
  'Avgaser',
  'Batterier',
  'Bromsar',
  'Kamrem & kamkedja',
  'Stötdämpare & fjädring',
  'Motorarbete',
  'Tillbehör & extrautrustning'
];

const MobileOnlyText = ({ selectedService, setSelectedService, category  }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { car_list } = useContext(CarContext);

  const handleToggle = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };
  
  console.log(car_list);
  
  const handleSelect = (service) => {
    setCategory(service); // Update selected service
    setExpanded(null);   // Close accordion after selection
  };


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
                    <div className="accordion-body">
                        {car_list.map((service, idx) => {
                             if (item.menu_name === service.category) {
                                return (
                                    <p
                                        key={idx}
                                        className="accordion-item"
                                        onClick={() => handleSelect(service)}
                                    >
                                        {service.name} <span>+</span>
                                    </p>
                                )}
                    })}
                    </div>
                    )}
                </div>
            ))}
    </div>
  );
};

export default MobileOnlyText;
