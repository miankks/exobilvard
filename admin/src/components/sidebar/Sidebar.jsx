import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-group top-group">
        <NavLink to="/addcar" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Lägg till tjänst</p>
        </NavLink>
        <NavLink to="/listcar" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Objekt lista</p>
        </NavLink>
      </div>
      <div className="sidebar-group bottom-group">
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Boknings sammanfattning</p>
        </NavLink>
        <NavLink to="/acceptedorders" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Accepterade Beställningar</p>
        </NavLink>
        <NavLink to="/rejectedorders" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Avvisade Beställningar</p>
        </NavLink>
        <NavLink to="/completedorders" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Slutförda Beställningar</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
