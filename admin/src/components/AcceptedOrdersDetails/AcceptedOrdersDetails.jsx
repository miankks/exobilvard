import { assets } from "../../assets/assets";
import { MdEmail } from "react-icons/md";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { formattedDate } from "../../customHooks/formattedDate";
import { useOrders } from "../../context/OrdersContext";

const AcceptedOrdersDetails = () => {
  const { orders, statusHandler, selectedStatuses, setSelectedStatuses } =
    useOrders();

  const acceptedOrders = orders.filter((o) => o.status === "Accepted");

  const handleSelectChange = (orderId, value) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  return (
    <div className="order orders-add">
      <h3>Accepted Orders Page</h3>
      <div className="order-list">
        {acceptedOrders.map((order, index) => {
          const formatedDate = formattedDate(order?.date);

          return (
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-car">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x" + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ",";
                    }
                  })}
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
                  <p className="order-item-regnummer">
                    {order.address.regnummer}
                  </p>
                </div>
                <div className="email-row">
                  <CiCalendarDate />
                  <p className="order-item-phone bold">
                    Service Datum: {order.acceptedDate}
                  </p>
                </div>
                <p className="order-item-phone order-timestamp">
                  <b>Beställning Datum:</b> {formatedDate || "Loading"}
                </p>
              </div>
              <p>Items: {order.items.length}</p>
              <div className="select-update-btn">
                <select
                  value={selectedStatuses[order._id] ?? order.status}
                  onChange={(e) => {
                    handleSelectChange(order._id, e.target.value);
                  }}
                >
                  <option value="Pending to accept">Pending to accept</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  type="submit"
                  className="orders-add-btn"
                  onClick={() =>
                    statusHandler(
                      order._id,
                      selectedStatuses[order._id] ?? order.status
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
          );
        })}
      </div>
    </div>
  );
};

export default AcceptedOrdersDetails;
