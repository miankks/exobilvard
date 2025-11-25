import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className='logo'/>
         <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <img src={assets.profile_image} alt="" className='profile'/>
    </div>
  )
}

export default Navbar