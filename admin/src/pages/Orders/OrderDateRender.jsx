import './Orders.css'
import { assets } from '../../assets/assets';
import { MdEmail } from "react-icons/md";
import { BsTelephoneForward } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import Reactdatepicker from '../../components/Reactdatepicker/Reactdatepicker';
import { FaCheck, FaTachometerAlt } from "react-icons/fa";
import { formattedDate } from '../../customHooks/formattedDate';

const OrderDateRender = (order, selected) => {
    
    const orderedDated = formattedDate(order?.date);
  return (
          <div className="order-item">
            
            {/* Column 1 */}
            <img src={assets.parcel_icon} alt="" />

            {/* Column 2 - User Info Section */}
            <div className="order-info">
              <p className="order-item-car">
                {order.items.map((item, index) =>
                  index === order.items.length - 1
                    ? item.name + " x" + item.quantity
                    : item.name + " x " + item.quantity + ", "
                )}
              </p>

              <p className="order-item-name">{order.address.fullName}</p>
              <div className="email-row">
                <MdEmail />
                <p className="order-item-email">{order.address.email}</p>
              </div>
              <div className="email-row">
              <BsTelephoneForward />
              <p className="order-item-phone">{order.address.phone}</p> 
              </div>
              <div className="email-row">
                <FaCarAlt />
                <p className="order-item-regnummer">{order.address.regnummer}</p>
              </div>
               <div className="email-row">
                <FaTachometerAlt />
                <p className="order-item-regnummer">{order.address.miltal}</p>
              </div>
              {!selected || selected === "date1" ? (
              <div className="email-row">
                  <CiCalendarDate />
                <p className="order-item-phone bold">
                  Service Datum 1: {order.address.bookDate1}
                </p>
                <span className='accept-button-span'>
                  <button type='button' 
                        className='cursor accept-button' 
                        onClick={() => {
                          setAcceptedDate(order.address.bookDate1)
                          setSelectedServiceDate((prev) => ({
                            ...prev,
                            [order._id]: "date1"
                          })
                          )}}>
                    <FaCheck />
                  </button>
                </span>
              </div>
              ): null}
              {!selected || selected === "date2" ? (
               <div className="email-row">
                  <CiCalendarDate />
                <p className="order-item-phone bold">
                  Service Datum 2: {order.address.bookDate2}
                </p>
                <span className='accept-button-span'>
                  <button type='button' 
                        className='cursor accept-button'
                        onClick={() => {
                          setAcceptedDate(order.address.bookDate2)
                          setSelectedServiceDate(prev => ({
                              ...prev,
                              [order._id]: "date2"
                            }))}}>
                    <FaCheck />
                  </button>
                </span>
              </div>
              ): null}
              {!selected || selected === "date3" ? (
               <div className="bookdate-row">
                  <span><CiCalendarDate /></span>
                <p className="order-item-phone bold">
                  Service Datum 3: {order.address.bookDate3}
                </p>
                <span className='accept-button-span'>
                  <button type='button' 
                        className='cursor accept-button'
                        onClick={() => {
                          setAcceptedDate(order.address.bookDate3)
                          setSelectedServiceDate(prev => ({
                            ...prev,
                            [order._id]: "date3"
                          }))}}>
                    <FaCheck />
                  </button>
                </span>
              </div>
              ): null}
              <div className="email-row">
                <p className="order-item-regnummer">User comments: {order.comment}</p>
              </div>
              <p className="order-item-phone bold order-timestamp">
                Beställning Datum: {orderedDated || "Loading"}
              </p>
            </div>

            {/* Column 3 */}
            <p>Items: {order.items.length}</p>

            {/* Column 4 */}
            <select
              value={order.status}
              onChange={(e) => {
                const newStatus = e.target.value;
                updateOrderStatusLocally(order._id, newStatus);
                handleSelectChange(order._id, e.target.value);
              }}
            >
              <option value="Pending to accept">Pending to accept</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Column 5 */}
            <button
              type="submit"
              className="add-btn"
              onClick={() =>
                statusHandler(selectedStatuses[order._id] ?? order.status, order._id)
              }
            >
              Uppdatera
            </button>
            {(selectedStatuses[order._id] ?? order.status) === "Rejected" &&
               <div className='order-date'>
                <h6>Välj en ny tid</h6>
                <Reactdatepicker 
                  sendDataToParent={handleDate}
                />
              </div>
            }
            {/* FULL ROW at Bottom */}
             <div className="order-description">
              <p>Comments for client</p>
              <p>{order.comment || 'No comment provided'}</p>
              <p>{order.acceptedDate || 'No accepted date provided'}</p>
            </div>
            <div className="order-description">
              <p>Comments for client</p>
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
        )
}

export default OrderDateRender