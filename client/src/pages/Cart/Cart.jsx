import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { CarContext } from "../../context/CarContext";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { car_list, url } = useContext(CarContext);
  const itemsInCart = car_list.filter((item) => cartItems[item._id] > 0);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Artiklar</p>
          <p>Titel</p>
          <p>Qvantitet</p>
          <p>Ta bort</p>
        </div>
        <br />
        <hr />
        {car_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  {/* will show quantity of each product */}
                  <p>{cartItems[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <button
            disabled={itemsInCart.length === 0}
            onClick={() => navigate("/order")}
          >
            Gå vidare till kassan
          </button>
          {itemsInCart.length === 0 && (
            <div>
              <p className="empty-cart">Din varukorg är tom</p>
              <Link to={"/"}>
                <button>Tillbaka till Meny</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
