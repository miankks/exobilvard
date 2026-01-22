import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";
import { assets } from "../../assets/assets";
import "./AdminProfile.css";
import { BiHide, BiShow } from "react-icons/bi";

const AdminProfile = () => {
  const { admin, updateAdmin } = useAdmin();
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  // const { url } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [changePasswordIcon, setChangePasswordIcon] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "", // For password reset
  });

  if (!admin) return <p>Loading...</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        alert("You must be logged in as admin to update profile.");
        return;
      }

      // Password validation (only if changing password)
      if (
        formData.oldPassword ||
        formData.newPassword ||
        formData.confirmNewPassword
      ) {
        if (formData.newPassword !== formData.confirmNewPassword) {
          alert("New passwords do not match");
          return;
        }
        if (formData.newPassword.length < 6) {
          alert("Password must be at least 6 characters");
          return;
        }
        if (!formData.oldPassword) {
          alert("Old password is required to change password");
          return;
        }
      }

      // Build payload dynamically
      const payload = {};
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        // Only include fields with non-empty value
        if (value) {
          // Only include password fields if newPassword is set
          if (
            ["oldPassword", "newPassword"].includes(key) &&
            !formData.newPassword
          ) {
            return; // skip
          }
          payload[key] = value;
        }
      });

      console.log("Payload to send:", payload);

      // Send update request
      const response = await fetch(`${API_URL}/api/admin/update/${admin._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Update failed");
      }

      const updatedAdmin = await response.json();
      updateAdmin(updatedAdmin); // update context
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update profile error:", error);
      alert(error.message || "Failed to update profile");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setChangePasswordIcon(!changePasswordIcon);
  };

  const handleShowPasswordInput = () => {
    setShowPasswordInput(!showPasswordInput);
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
            <div className="password-checkbox">
              <input
                type="checkbox"
                id="changePassword"
                onClick={handleShowPasswordInput}
              />
              <label htmlFor="changePassword">Change Password</label>
            </div>
            {showPasswordInput && (
              <div>
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
              </div>
            )}
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
