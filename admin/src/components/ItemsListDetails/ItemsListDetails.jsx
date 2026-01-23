import React from "react";
import { Link, useParams } from "react-router-dom";
import { useListCar } from "../../context/ListCarContext";
import "./ItemsListDetails.css";

const ItemsListDetails = () => {
  const { id } = useParams();
  const { carList } = useListCar();

  const car = carList.find((c) => c._id === id);

  if (!car) {
    return <p className="not-found">Car not found</p>;
  }

  return (
    <div className="details">
      <div className="details-card">
        <h1>{car.name}</h1>
        <span className="details-category">{car.category}</span>
        <p className="details-description">{car.description}</p>

        <Link to="/listcar" className="details-back">
          Back to list
        </Link>
      </div>
    </div>
  );
};

export default ItemsListDetails;
