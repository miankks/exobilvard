import { useEffect } from "react";
import { useOrders } from "../../context/OrdersContext";
import { assets } from "../../assets/assets";
import { MdEmail } from "react-icons/md";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { formattedDate } from "../../customHooks/formattedDate";
import { useParams } from "react-router-dom";

const RejectedOrders = () => {
  const { orderId } = useParams();
  const {
    orders,
    statusHandler,
    updateOrderStatusLocally,
    selectedStatuses,
    setSelectedStatuses,
    fetchOrders,
  } = useOrders();

  if (!orders?.length) {
    return <p>Loading orders...</p>;
  }

  const order = orders.find((o) => String(o._id) === String(orderId));

  if (!order) {
    return <p>Order not found</p>;
  }

  const formatedDate = formattedDate(order.date);

  const handleSelectChange = (orderId, value) => {
    setSelectedStatuses((prev) => ({ ...prev, [orderId]: value }));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order orders-add">
      <h3>Accepted Order Details</h3>

      <div className="order-item">
        <img src={assets.parcel_icon} alt="" />

        <div>
          <p className="order-item-car">
            {order.items.map(
              (item, index) =>
                `${item.name} x${item.quantity}${
                  index < order.items.length - 1 ? ", " : ""
                }`,
            )}
          </p>

          <p className="order-item-name">{order.address.fullName}</p>

          <div className="email-row">
            <MdEmail />
            <p className="order-item-email">{order.address.email}</p>
          </div>

          <div className="email-row">
            <BsTelephoneForwardFill />
            <p className="order-item-phone">{order.address.phone}</p>
          </div>

          <div className="email-row">
            <FaCarAlt />
            <p className="order-item-regnummer">{order.address.regnummer}</p>
          </div>

          <div className="email-row">
            <CiCalendarDate />
            <p className="order-item-phone bold">
              Service Datum: {order.acceptedDate}
            </p>
          </div>

          <p className="order-item-phone order-timestamp">
            <b>Beställning Datum:</b> {formatedDate}
          </p>
        </div>

        <p>Items: {order.items.length}</p>

        <div className="select-update-btn">
          <select
            value={selectedStatuses[order._id] ?? order.status}
            onChange={(e) => handleSelectChange(order._id, e.target.value)}
          >
            <option value="Pending to accept">Pending to accept</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            className="orders-add-btn"
            onClick={() =>
              statusHandler(
                order._id,
                selectedStatuses[order._id] ?? order.status,
              )
            }
          >
            Uppdatera
          </button>
        </div>

        <div className="order-description">
          <p className="order-item-regnummer">User comments:</p>
          <p>{order.address.userComment || "No comment provided"}</p>
        </div>

        <div className="order-description">
          <p>Comments for client</p>
          <p>{order.comment || "No comments provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default RejectedOrders;
