import "./BookingsSummary.css";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrdersContext";

const BookingsSummary = ({ url }) => {
  const {
    orders,
    statusHandler,
    updateOrderStatusLocally,
    selectedStatuses,
    setSelectedStatuses,
  } = useOrders();
  const navigate = useNavigate();

  const pendingOrders = orders.filter((o) => o.status === "Pending to accept");

  const handleOrder = (orderID) => {
    navigate(`/orders/${orderID}`);
  };

  return (
    <div className="order add">
      <h3>Beställnings sida</h3>
      <div className="booking-summary-list">
        {pendingOrders.map((order, index) => {
          return (
            <div className="booking-summary-description" key={index}>
              <div className="booking-summary-info">
                <p className="booking-item-name">{order.address.fullName}</p>
                <div className="email-row">
                  <p className="">{order.address.email}</p>
                </div>
                <div className="email-row">
                  <p className="">{order.address.phone}</p>
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

export default BookingsSummary;
