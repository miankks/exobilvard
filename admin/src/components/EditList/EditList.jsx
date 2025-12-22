import React, { useState, useEffect } from "react";
import { useListCar } from "../../context/ListCarContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import axios from "axios";

const EditList = ({ url }) => {
  const { carList, setCarList } = useListCar();
  const { id } = useParams();
  const navigate = useNavigate();

  const [carData, setCarData] = useState(null);
  const [image, setImage] = useState(null); // new image file
  const [preview, setPreview] = useState(""); // image preview

  const token = localStorage.getItem("token");

  // Load car data from context
  useEffect(() => {
    if (!carList || carList.length === 0) return; // wait until carList is loaded
    const car = carList.find((c) => c._id === id);

    if (car) {
      setCarData(car);
      setPreview(`${url}/images/${car.image}`);
    } else {
      navigate("/listcar"); // redirect if not found
    }
  }, [id, carList, navigate, url]);

  if (!carData) return <div>Loading...</div>;

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", carData.name);
    formData.append("description", carData.description);
    formData.append("category", carData.category);

    if (image) {
      formData.append("image", image); // append new image only
    }

    try {
      const response = await axios.put(
        `${url}/api/car/editcar/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        // Update context with new car data
        setCarList((prev) =>
          prev.map((c) => (c._id === id ? response.data.data : c))
        );
        toast.success("Car updated successfully");
        navigate("/listcar");
      } else {
        toast.error(response.data.message || "Failed to update car");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating car");
    }
  };

  return (
    <div className="add">
      {!carData ? <div>Loading...</div> : ""}
      <h2>Edit Car</h2>
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : preview || assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            placeholder="Type here"
            name="name"
            onChange={handleChange}
            value={carData.name}
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            onChange={handleChange}
            value={carData.description}
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              onChange={handleChange}
              value={carData.category}
            >
              <option value="Sommardäck & Vinterdäck">
                Sommardäck & Vinterdäck
              </option>
              <option value="Balansering & Inställning">
                Balansering & Inställning
              </option>
              <option value="Däckförvaring tillgänglig">
                Däckförvaring tillgänglig
              </option>
              <option value="Professionell montering">
                Professionell montering
              </option>
              <option value="Säker & trygg hantering">
                Säker & trygg hantering
              </option>
            </select>
          </div>
        </div>

        <button type="submit" className="add-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditList;
