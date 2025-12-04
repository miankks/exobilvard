import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useAuth } from '../../context/AuthContext';
import { assets } from '../../assets/assets';
import './AdminProfile.css';

const AdminProfile = () => {
    const { admin, updateAdmin } = useAdmin(); // Assuming you have an update function in context
    const { url } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: admin?.name || '',
        email: admin?.email || '',
        password: '', // For password reset
    });

    if (!admin) return <p>Loading...</p>;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Example API call
            const response = await fetch(`${url}/admin/update/${admin.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Update failed');

            const updatedAdmin = await response.json();
            updateAdmin(updatedAdmin); // Update context
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* Profile Picture */}
                <img
                    src={admin?.image ? `${url}/adminimage/${admin.image}` : assets.profile_icon}
                    alt="Profile"
                    className="profile-picture"
                />

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="profile-form">
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            New Password:
                            <input
                                type="password"
                                name="password"
                                placeholder="Leave blank to keep current password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </label>

                        <div className="profile-form-buttons">
                            <button type="submit" className="profile-button">
                                Save
                            </button>
                            <button
                                type="button"
                                className="profile-button cancel"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        {/* Name */}
                        <h1 className="profile-name">{admin.name}</h1>

                        {/* Email */}
                        <p className="profile-title">{admin.email}</p>

                        {/* Action Button */}
                        <button
                            className="profile-button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
