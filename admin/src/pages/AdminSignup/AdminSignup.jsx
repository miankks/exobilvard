import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AdminSignup.css";

const AdminSignup = ({ url }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(`${url}/api/admin/register`, form);

      if (res.data.success) {
        toast.success("Admin Registered Successfully!");
        setForm({ name: "", email: "", password: "" });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Signup failed");
    }
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-card" onSubmit={handleSignup}>
        <h2 className="signup-title">Admin Sign Up</h2>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Enter email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Enter password"
          />
        </div>

        <button className="signup-btn" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
