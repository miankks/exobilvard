import { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";
import {useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";


const AdminLogin = ({url}) => {
  const { login } = useStore(); // get login function from context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(url +"/api/admin/login", formData);

      setMessage("Login Successful.");
      // Use context login function
      login(res.data.token);

      setFormData({ email: "", password: "" });
      navigate('/orders')
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed.");
    }
  }

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

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <button type="submit">Sign In</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;