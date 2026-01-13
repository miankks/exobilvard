import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AdminLogin.css";
import { BiHide, BiShow } from "react-icons/bi";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [changePasswordIcon, setChangePasswordIcon] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);

    if (result.success) {
      navigate("/");
    } else {
      setMessage(result.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setChangePasswordIcon(!changePasswordIcon);
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          {changePasswordIcon ? (
            <BiShow onClick={handleShowPassword} className="show-password" />
          ) : (
            <BiHide onClick={handleShowPassword} className="show-password" />
          )}
        </div>

        <button type="submit">Sign In</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
