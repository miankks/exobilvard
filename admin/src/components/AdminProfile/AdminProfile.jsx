import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";
import { assets } from "../../assets/assets";
import "./AdminProfile.css";
import { BiHide, BiShow } from "react-icons/bi";

const AdminProfile = () => {
  const { admin, updateAdmin } = useAdmin(); // Assuming you have an update function in context
  const { url } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [changePasswordIcon, setChangePasswordIcon] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    oldPassword: "",
    newPasword: "",
    confirmNewPassword: "", // For password reset
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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");

      const updatedAdmin = await response.json();
      updateAdmin(updatedAdmin); // Update context
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setChangePasswordIcon(!changePasswordIcon);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Picture */}
        <img
          src={
            admin?.image
              ? `${url}/adminimage/${admin.image}`
              : assets.profile_icon
          }
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
            <div className="password-wrapper">
              <label>Old Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
                {changePasswordIcon ? (
                  <BiShow
                    onClick={handleShowPassword}
                    className="show-password"
                  />
                ) : (
                  <BiHide
                    onClick={handleShowPassword}
                    className="show-password"
                  />
                )}
              </div>
            </div>
            <div className="password-wrapper">
              <label>New Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                {changePasswordIcon ? (
                  <BiShow
                    onClick={handleShowPassword}
                    className="show-password"
                  />
                ) : (
                  <BiHide
                    onClick={handleShowPassword}
                    className="show-password"
                  />
                )}
              </div>
            </div>
            <div className="password-wrapper">
              <label>Confirm New Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                />
                {changePasswordIcon ? (
                  <BiShow
                    onClick={handleShowPassword}
                    className="show-password"
                  />
                ) : (
                  <BiHide
                    onClick={handleShowPassword}
                    className="show-password"
                  />
                )}
              </div>
            </div>
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
