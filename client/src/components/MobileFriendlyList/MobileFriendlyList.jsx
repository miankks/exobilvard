import React, { useState } from "react";
import "./MobileFriendlyList.css";
import { menu_list } from "../../assets/assets";

const MobileFriendlyList = ({ category, setCategory }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index, menuName) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      setCategory("All");
    } else {
      setExpandedIndex(index);
      setCategory(menuName);
    }
  };

  return (
    <div className="explore-menu">
      {menu_list.map((item, index) => (
        <div
          key={index}
          className={`menu-card ${expandedIndex === index ? "expanded" : ""}`}
          onClick={() => handleToggle(index, item.menu_name)}
        >
          <div className="menu-header">
            <p>{item.menu_name}</p>
            <span className="toggle-icon">
              {expandedIndex === index ? "-" : "+"}
            </span>
          </div>

          {expandedIndex === index && (
            <div className="menu-body">
              <p>{item.description || "Details about this service..."}</p>
              <img src={item.menu_image} alt={item.menu_name} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileFriendlyList;
