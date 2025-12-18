import React, { useContext, useState } from "react";
import "./MobileOnlyText.css";
import { menu_list } from "../../assets/assets";
import { CarContext } from "../../context/CarContext";
import { CartContext } from "../../context/CartContext";
import { FcApproval } from "react-icons/fc";

const MobileOnlyText = React.memo(() => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { car_list } = useContext(CarContext);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleSelectService = (serviceId) => {
    if (cartItems[serviceId]) {
      removeFromCart(serviceId);
    } else {
      addToCart(serviceId);
    }
  };

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mobile-text-accordion">
      <h2>Våra tjänster</h2>
      {menu_list.map((item, index) => (
        <div
          key={index}
          className={`accordion-card ${
            expandedIndex === index ? "accordion-card-expanded" : ""
          }`}
        >
          <div className="accordion-header" onClick={() => handleToggle(index)}>
            <p>{item.menu_name || "Välj en tjänst"}</p>
            <span className="accordion-toggle">
              {expandedIndex === index ? "-" : "+"}
            </span>
          </div>
          {expandedIndex === index && (
            <div className="accordion-body">
              {car_list.map((service) => {
                if (item.menu_name === service.category) {
                  const isSelected = !!cartItems[service._id]; // check directly from cart
                  return (
                    <p
                      key={service._id}
                      className={`accordion-item ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectService(service._id);
                      }}
                    >
                      {service.name}
                      {isSelected ? <FcApproval /> : <span>+</span>}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default MobileOnlyText;
