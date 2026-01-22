import { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { MdEmail } from "react-icons/md";
import { BsTelephoneForwardFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import Reactdatepicker from "../Reactdatepicker/Reactdatepicker";
import { FaCheck, FaTachometerAlt } from "react-icons/fa";
import { formattedDate } from "../../customHooks/formattedDate";
import { useParams } from "react-router-dom";
import { useOrders } from "../../context/OrdersContext";

const Orders = () => {
  const { id } = useParams();
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [comment, setComment] = useState("");
  const [acceptedDate, setAcceptedDate] = useState("");
  const [selectedServiceDate, setSelectedServiceDate] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);

  const { orders, statusHandler } = useOrders();
  const onChangeHandler = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  const handleSelectChange = (orderId, value) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const handleDate = (date) => {
    const newDateAccepted = formattedDate(date);
    setAcceptedDate(newDateAccepted);
  };

  useEffect(() => {
    if (id) {
      setFilteredOrders(orders.filter((order) => order._id === id));
    } else {
      setFilteredOrders(orders);
    }
  }, [orders, id]);

  const pendingOrders = filteredOrders.filter(
    (order) => order.status === "Pending to accept",
  );

  return (
    <div className="order orders-add">
      <h3>Beställning</h3>
      <div className="order-list">
        {pendingOrders.map((order, index) => {
          const selected = selectedServiceDate[order._id];
          const orderedDate = formattedDate(order?.date);
          return (
            <div className="order-item" key={index}>
              {/* Column 1 */}
              <img src={assets.parcel_icon} alt="" />

              {/* Column 2 - User Info Section */}
              <div className="order-info">
                <p className="order-item-car">
                  {order.items.map((item, index) =>
                    index === order.items.length - 1
                      ? item.name + " x" + item.quantity
                      : item.name + " x " + item.quantity + ", ",
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
                  <p className="order-item-regnummer">
                    {order.address.regnummer}
                  </p>
                </div>
                <div className="email-row">
                  <FaTachometerAlt />
                  <p className="order-item-regnummer">{order.address.miltal}</p>
                </div>
                {!selected || selected === "date1" ? (
                  <div className="email-row">
                    <CiCalendarDate />
                    <p className="order-item-phone">
                      <b>Service Datum 1:</b> {order.address.bookDate1}
                    </p>
                    <span className="accept-button-span">
                      <button
                        type="button"
                        className="cursor accept-button"
                        onClick={() => {
                          setAcceptedDate(order.address.bookDate1);
                          setSelectedServiceDate((prev) => ({
                            ...prev,
                            [order._id]: "date1",
                          }));
                        }}
                      >
                        <FaCheck />
                      </button>
                    </span>
                  </div>
                ) : null}
                {!selected || selected === "date2" ? (
                  <div className="email-row">
                    <CiCalendarDate />
                    <p className="order-item-phone">
                      <b>Service Datum 2:</b> {order.address.bookDate2}
                    </p>
                    <span className="accept-button-span">
                      <button
                        type="button"
                        className="cursor accept-button"
                        onClick={() => {
                          setAcceptedDate(order.address.bookDate2);
                          setSelectedServiceDate((prev) => ({
                            ...prev,
                            [order._id]: "date2",
                          }));
                        }}
                      >
                        <FaCheck />
                      </button>
                    </span>
                  </div>
                ) : null}
                {!selected || selected === "date3" ? (
                  <div className="email-row">
                    <span>
                      <CiCalendarDate />
                    </span>
                    <p className="order-item-phone">
                      <b>Service Datum 3:</b> {order.address.bookDate3}
                    </p>
                    <span className="accept-button-span">
                      <button
                        type="button"
                        className="cursor accept-button"
                        onClick={() => {
                          setAcceptedDate(order.address.bookDate3);
                          setSelectedServiceDate((prev) => ({
                            ...prev,
                            [order._id]: "date3",
                          }));
                        }}
                      >
                        <FaCheck />
                      </button>
                    </span>
                  </div>
                ) : null}

                <p className="order-item-phone bold order-timestamp">
                  Beställning Datum: {orderedDate || "Loading"}
                </p>
              </div>

              {/* Column 3 */}
              <p>Items: {order.items.length}</p>

              {/* Column 5 */}
              {(selectedStatuses[order._id] ?? order.status) === "Rejected" && (
                <div className="order-date">
                  <h6>Välj en ny tid</h6>
                  <Reactdatepicker sendDataToParent={handleDate} />
                </div>
              )}
              {/* Column 4 */}
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
                      selectedStatuses[order._id] ?? order.status,
                      comment,
                      acceptedDate,
                    )
                  }
                >
                  Uppdatera
                </button>
              </div>

              {/* FULL ROW at Bottom */}
              <div className="order-description">
                <b>Comments from client</b>
                <p className="order-item-regnummer">
                  {order.address.userComment || "No comment provided"}
                </p>
              </div>
              <div className="order-description">
                <b>Comments for client</b>
                <textarea
                  name="description"
                  rows="6"
                  placeholder="Write content here"
                  required
                  onChange={onChangeHandler}
                  value={comment}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
