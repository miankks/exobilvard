import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById("menu")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const toggleContact = () => {
    setContactOpen((prev) => !prev);
    setMenu("contact-us");
  };

  return (
    <>
      <div className="navbar">
        <Link to={"/"}>
          <img src={assets.exobil_logo} alt="" className="logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="navbar-menu">
          <Link
            to={"/"}
            onClick={() => {
              setMenu("home");
              setContactOpen(false);
            }}
            className={menu === "home" ? "active" : ""}
          >
            Hem
          </Link>

          <a
            onClick={() => {
              goToMenu();
              setContactOpen(false);
              setMenu("menu");
            }}
            className={menu === "menu" ? "active" : ""}
          >
            Meny
          </a>

          <a
            onClick={toggleContact}
            className={menu === "contact-us" ? "active" : ""}
          >
            Kontakta oss
          </a>
        </ul>

        <div className="navbar-right">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </Link>

          {/* Burger Icon */}
          <div className="burger" onClick={() => setMobileOpen(true)}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      {/* Contact Info Dropdown */}
      <div className={`contact-dropdown ${contactOpen ? "show" : ""}`}>
        <div className="contact-item">
          <img src={assets.phone_icon} alt="" />
          <span>076 140 40 40</span>
        </div>

        <div className="contact-item">
          <img src={assets.clock_icon} alt="" />
          <span>Mån–Fre: 08.00 - 17.00</span>
          <span>Lör: 10.00 - 15.00</span>
          <span>Sön: Stängt</span>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            <button
              className="close-btn"
              onClick={() => setMobileOpen(false)}
            >
              ×
            </button>

            <Link
              to={"/"}
              onClick={() => {
                setMenu("home");
                setMobileOpen(false);
              }}
            >
              Hem
            </Link>

            <a
              onClick={() => {
                goToMenu();
                setMobileOpen(false);
              }}
            >
              Meny
            </a>

            <a
              onClick={() => {
                toggleContact();
                setMobileOpen(false);
              }}
            >
              Kontakta oss
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
