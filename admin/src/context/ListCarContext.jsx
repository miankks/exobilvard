import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ListCarContext = createContext();

export const ListCarProvider = ({ children, url }) => {
  const [carList, setCarList] = useState([]);
  const [acceptedList, setAcceptedList] = useState([]);
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

  const fetchAcceptedOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(url + "/api/order/acceptedorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setAcceptedList(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  const updateOrderStatusLocally = (id, newStatus) => {
    setAcceptedList((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
    );
  };

  useEffect(() => {
    fetchList();
    fetchAcceptedOrders();
  }, []);

  return (
    <ListCarContext.Provider
      value={{
        carList,
        acceptedList,
        setCarList,
        removeCar,
        fetchAcceptedOrders,
        updateOrderStatusLocally,
      }}
    >
      {children}
    </ListCarContext.Provider>
  );
};

export const useListCar = () => useContext(ListCarContext);
