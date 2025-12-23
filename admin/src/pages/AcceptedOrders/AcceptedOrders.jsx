import { useState, useEffect } from "react";
import "./AcceptedOrders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrdersContext";

const AcceptedOrders = ({ url }) => {
  const navigate = useNavigate();
  const { orders } = useOrders();

  const acceptedOrders = orders.filter((o) => o.status === "Accepted");

  const handleOrder = (orderID) => {
    navigate(`/acceptedorders/${orderID}`);
  };

  return (
    <div className="order add">
      <h3>Accepted Orders Summary</h3>
      <div className="order-list">
        {acceptedOrders.map((order, index) => {
          return (
            <div className="acceptedorders-description" key={index}>
              <div>
                <p className="order-item-name">{order.address.fullName}</p>
                <div className="email-row">
                  <p className="order-item-email">{order.address.email}</p>
                </div>
                <div className="email-row">
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>
              </div>
              <button type="button" onClick={() => handleOrder(order._id)}>
                Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AcceptedOrders;
