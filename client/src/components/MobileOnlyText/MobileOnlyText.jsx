import React, { useState } from 'react';
import './MobileOnlyText.css';

const services = [
  'Avgaser',
  'Batterier',
  'Bromsar',
  'Kamrem & kamkedja',
  'Stötdämpare & fjädring',
  'Motorarbete',
  'Tillbehör & extrautrustning'
];

const MobileOnlyText = ({ selectedService, setSelectedService  }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(prev => !prev);
  };

  const handleSelect = (service) => {
    setCategory(service); // Update selected service
    setExpanded(false);   // Close accordion after selection
  };

   return (
    <div className="mobile-text-accordion">
      <div className={`accordion-card ${expanded ? 'accordion-card-expanded' : ''}`} onClick={handleToggle}>
        <div className="accordion-header">
          <p>{selectedService || 'Välj en tjänst'}</p>
          <span className="accordion-toggle">{expanded ? '-' : '+'}</span>
        </div>

        {expanded && (
          <div className="accordion-body">
            {services.map((service, idx) => (
              <p
                key={idx}
                className="accordion-item"
                onClick={() => handleSelect(service)}
              >
                {service} <span>+</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileOnlyText;
