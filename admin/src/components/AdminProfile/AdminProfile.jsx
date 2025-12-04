import { useAdmin } from '../../context/AdminContext';
import { useAuth } from '../../context/AuthContext';
import { assets } from '../../assets/assets';
import './AdminProfile.css'; // Import the CSS


const AdminProfile = () => {
    const { admin } = useAdmin();
    const { url } = useAuth();

     if (!admin) {
        return <p>Loading...</p>; // Or a spinner
    }
    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* Profile Picture */}
                <img
                    src={admin?.image ? `${url}/adminimage/${admin.image}` : assets.profile_icon}
                    alt="Profile"
                    className="profile-picture"
                />

                {/* Name */}
                <h1 className="profile-name">{admin.name}</h1>

                {/* Email */}
                <p className="profile-title">{admin.email}</p>

                {/* Action Button */}
                <button className="profile-button">Edit</button>
            </div>
        </div>
    );
};

export default AdminProfile;
