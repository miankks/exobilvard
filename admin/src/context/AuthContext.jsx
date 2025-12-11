import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({children, url}) => {
    const [token, setToken] = useState(localStorage.getItem("token" || null));
    
    const login = async (formData) => {
        try {
            const response = await axios.post(`${url}/api/admin/login`, formData);

            if (!response.data.success) {
                return {success: false, message: response.data.message}
            }

            const newToken = response.data.token;
            localStorage.setItem("token", newToken);
            setToken(newToken);
            return { success: true, token: newToken}
        } catch (error) {
            return {
                success: false, message: error.response?.data?.message || "Login failed"
            }
        }
    }

    const signup = async (formData) => {
        try {
            const token = localStorage.getItem("token"); // super-admin token
            const response = await axios.post(`${url}/api/admin/register`, formData, {
                headers: {"Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            })
            if (response.data.success) {
                return await login({
                    email: formData.get("email"),
                    password: formData.get("password")
                })
            }
            return {success: true, message: response.data.message}
        } catch (error) {
            return {
                success: false, message: error.response?.data?.message || "Signup failed"
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    }

    return <AuthContext.Provider value={{token, login, signup, logout, url}}>
        {children}
    </AuthContext.Provider> 
}

export const useAuth = () => useContext(AuthContext);