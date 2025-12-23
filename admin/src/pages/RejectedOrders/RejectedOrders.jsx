import "./RejectedOrders.css";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrdersContext";

const RejectedOrders = ({ url }) => {
  const navigate = useNavigate();
  const { orders } = useOrders();

  const rejectedOrders = orders.filter((o) => o.status === "Rejected");

  const handleOrder = (orderID) => {
    navigate(`/rejectedorders/${orderID}`);
  };

  return (
    <div className="order add">
      <h3>Rejected orders Summary</h3>
      <div className="order-list">
        {rejectedOrders.map((order, index) => {
          return (
            <div className="rejecteddorder-description" key={index}>
              <div>
                <p className="rejecteddorder-item-name">
                  {order.address.fullName}
                </p>
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

export default RejectedOrders;
