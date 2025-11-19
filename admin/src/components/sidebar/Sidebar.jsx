import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/addcar' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/listcar' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
            <NavLink to='/acceptedorders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Accepted Orders</p>
            </NavLink>
            <NavLink to='/complatedorders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Completed Orders</p>
            </NavLink>
            <NavLink to='/rejectedorders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Rejected Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar