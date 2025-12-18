import React, { useContext, useEffect } from "react";
import "./Orderconfirmation.css";
import { CarContext } from "../../context/CarContext";
import { CartContext } from "../../context/CartContext";

const Orderconfirmation = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { car_list, url } = useContext(CarContext);

  return (
    <div className="order-card">
      <h2 className="order-title">
        Din beställning har lagts,
        <span className="order-sub">
          du kommer att få en bekräftelse via e-post
        </span>
      </h2>
      <div className="order-items-header">
        <p>Artiklar</p>
        <p>Titel</p>
        <p>Qvantitet</p>
      </div>

      {car_list.map((item, index) => {
        if (cartItems[item._id] > 0) {
          return (
            <div key={index}>
              <div className="order-item-card">
                <img
                  src={url + "/images/" + item.image}
                  alt=""
                  className="order-img"
                />
                <p className="order-name">{item.name}</p>
                <p className="order-quantity">{cartItems[item._id]}</p>
              </div>
              <hr />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Orderconfirmation;
