import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

   const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redirect to login after logout
  };

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className='logo'/>
         <ul className="nav-links">
          <li><Link to="/orders">Home</Link></li>
          {/* Show Signup & Login only if NOT logged in */}
          {!token &&<li><Link to="/signup">Sign Up</Link></li>}
          {!token && <li><Link to="/login">Login</Link></li>}
          {/* Show Logout if logged in */}
          {token && <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>}
        </ul>
        <img src={assets.profile_image} alt="" className='profile'/>
    </div>
  )
}

export default Navbar