import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ListCarContext = createContext();

export const ListCarProvider = ({ children, url }) => {
  const [carList, setCarList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [rejectedList, setRejectedList] = useState([]);
  const fetchList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/car/listcar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCarList(response.data.data);
      } else {
        toast.error("Error ftching car");
      }
    } catch (error) {
      toast.error("Error fetching car list");
    }
  };

  const removeCar = async (carId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/api/car/removecar`,
        { id: carId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error removing car");
      }
    } catch (error) {
      toast.error("error removing car");
    }
  };

  const updateCar = (id, updatedCar) => {
    setCarList((prev) => prev.map((c) => (c._id === id ? updatedCar : c)));
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <ListCarContext.Provider
      value={{
        carList,
        orderList,
        setCarList,
        removeCar,
        updateCar,
      }}
    >
      {children}
    </ListCarContext.Provider>
  );
};

export const useListCar = () => useContext(ListCarContext);
