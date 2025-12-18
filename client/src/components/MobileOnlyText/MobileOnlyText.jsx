import React, { useContext, useState } from "react";
import "./MobileOnlyText.css";
import { menu_list } from "../../assets/assets";
import { CarContext } from "../../context/CarContext";
import { CartContext } from "../../context/CartContext";
import { FcApproval } from "react-icons/fc";

const MobileOnlyText = React.memo(() => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { car_list } = useContext(CarContext);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const handleSelectService = (serviceId) => {
    if (cartItems[serviceId]) {
      removeFromCart(serviceId);
      setSelectedServiceId(null);
    } else {
      addToCart(serviceId);
      setSelectedServiceId(serviceId);
    }
  };
  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mobile-text-accordion">
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
              {car_list.map((service, idx) => {
                if (item.menu_name === service.category) {
                  return (
                    <p
                      key={service._id}
                      className={`accordion-item ${
                        selectedServiceId === service._id ? "selected" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectService(service._id);
                      }}
                    >
                      {service.name}
                      {selectedServiceId === service._id ? (
                        <FcApproval />
                      ) : (
                        <span>+</span>
                      )}
                    </p>
                  );
                }
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default MobileOnlyText;
