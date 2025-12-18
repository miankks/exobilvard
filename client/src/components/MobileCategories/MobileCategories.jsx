import React, { useState } from 'react';
import './MobileCategories.css';
import { menu_list } from '../../assets/assets';

const MobileCategories = ({ category, setCategory }) => {
  const [expandedIndex, setExpandedIndex] = useState(null); // track expanded item

  const handleToggle = (index, menuName) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // collapse if clicked again
      setCategory('All');
    } else {
      setExpandedIndex(index); // expand this item
      setCategory(menuName);
    }
  };

  return (
    <div className="explore-menu">
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className={`explore-menu-list-item ${expandedIndex === index ? 'expanded' : ''}`}
            onClick={() => handleToggle(index, item.menu_name)}
          >
            <div className="menu-header">
              <p>{item.menu_name}</p>
              <span className="plus-sign">{expandedIndex === index ? '-' : '+'}</span>
            </div>

            {/* Expanded content */}
            {expandedIndex === index && (
              <div className="menu-content">
                {/* You can show image or extra info here */}
                <img src={item.menu_image} alt={item.menu_name} />
                <p>Additional details about {item.menu_name} go here.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCategories;
