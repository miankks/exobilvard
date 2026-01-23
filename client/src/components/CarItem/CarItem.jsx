import React, { useContext, useState } from "react";
import "./CarItem.css";
import { assets } from "../../assets/assets";
import { CartContext } from "../../context/CartContext";
import { CarContext } from "../../context/CarContext";

const CarItem = React.memo(({ id, name, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { url } = useContext(CarContext);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="car-item">
      <div className="car-item-img-container">
        <img
          src={url + "/images/" + image}
          alt="car-item-image"
          className="car-item-image"
        />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt="no image"
            className="add"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="car-item-counter">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className="car-item-info">
        <div className="car-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="car-item-description">
          {description.slice(0, 40)}...
          <span
            className="more"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(true);
            }}
          >
            {" "}
            mer info
          </span>
        </p>
      </div>
      {showDetails && (
        <div className="popup-overlay" onClick={() => setShowDetails(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>{name}</h3>
            <p>{description}</p>
            <button onClick={() => setShowDetails(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
});

export default CarItem;
