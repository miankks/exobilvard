import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CarContext = createContext(null);

const CarProvider = ({children}) => {
    const [car_list, setCarList] = useState([]);
    const url = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const fetchCarList = async () => {
        const response = await axios.get(url+'/api/car/listcar');
        setCarList(response.data.data);
    };

    useEffect(()=> {
        fetchCarList();
    }, []);

    return (
        <CarContext.Provider value={{car_list, url}}>
            {children}
        </CarContext.Provider>
    )
}

export default CarProvider;