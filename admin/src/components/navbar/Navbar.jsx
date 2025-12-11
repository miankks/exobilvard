import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { toast} from 'react-toastify'
import axios from 'axios';


const Navbar = ({url}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const [admin, setAdmin] = useState(null);
  
   const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redirect to login after logout
  };

    const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/admin/getadmin`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      
      if (response.data.success) {
        setAdmin(response.data.data)
      } else {
        toast.error('Admin Error')
      }
    } catch (error) {
      toast.error("Error fetching admin");
    }
  }
  useEffect(() => {
     if(token) fetchAdmin();
    }, [token])
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className='logo'/>
         <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {/* Show Signup & Login only if NOT logged in */}
          {token &&<li><Link to="/signup">Add new admin</Link></li>}
          {!token && <li><Link to="/login">Login</Link></li>}
          {/* Show Logout if logged in */}
          {token && <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>}
        </ul>
            <span className='profile-img'>{token && admin &&(admin.image ?
              <Link to={'/adminprofile'}><img src={`${url}/adminimage/${admin.image}`} alt="" className='profile'/></Link>
            : <Link to={'/adminprofile'}><img src={assets.profile_icon} alt="" className='profile'/></Link>)}
            </span>
    </div>
  )
}

export default Navbar