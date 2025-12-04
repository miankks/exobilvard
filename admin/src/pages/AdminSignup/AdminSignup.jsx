import { useState } from "react";
import { assets } from '../../assets/assets'
import axios from "axios";
import { toast } from "react-toastify";
import "./AdminSignup.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

const AdminSignup = ({ url }) => {
  const { signup } = useStore();
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const token = localStorage.getItem("token");

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (image) {
        formData.append("image", image);
      }
    if (!form.name || !form.email || !form.password ) {
      toast.error("All fields are required");
      return;
    }

    try {
      // ✅ call the store signup function
      const result = await signup(formData);
      // const res = await axios.post(`${url}/api/admin/register`, formData, {
      //    headers: {
      //   "Content-Type": "multipart/form-data",
      //   },
      // });

      if (result.success) {
        toast.success("Admin Registered Successfully!");
        setForm({ name: "", email: "", password: "", image: "" });
        setImage(false);
        navigate('/orders');
      } else {
        toast.error(result.message);
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
                    <p>Upload Image</p>
                    <label htmlFor="image">
                      <img src={image? URL.createObjectURL(image): assets.upload_area} alt="" />
                    </label>
                    <input type="file" id='image' hidden 
                      onChange={(e) => setImage(e.target.files[0])}
                    />
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
