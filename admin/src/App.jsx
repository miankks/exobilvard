import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './components/Orders/Orders';
import CompletedOrders from './pages/CompletedOrders/CompletedOrders';
import RejectedOrders from './pages/RejectedOrders/RejectedOrders';
import AcceptedOrders from './pages/AcceptedOrders/AcceptedOrders';
import AdminSignup from './pages/AdminSignup/AdminSignup';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingsSummary from './pages/BookingsSummary/BookingsSummary';
import CompletedOrdersDetails from './components/completedOrdersDetails/CompletedOrdersDetails';
import RejectedOrdersDetails from './components/RejectedOrdersDetails/RejectedOrdersDetails';
import AcceptedOrdersDetails from './components/AcceptedOrdersDetails/AcceptedOrdersDetails';
import AdminProfile from './components/AdminProfile/AdminProfile';
import { StoreProvider } from "./context/StoreContext";
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';


const App = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div>
      <AuthProvider url={API_URL}>
        <AdminProvider url={API_URL}>
          <ToastContainer />
          <Navbar url={API_URL}/>
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path='/addcar' element={<Add url={API_URL}/>} />
              <Route path='/adminprofile' element={<AdminProfile url={API_URL}/>} />
              <Route path='/listcar' element={<List url={API_URL}/>} /> 
              <Route path='/orders/' element={<BookingsSummary url={API_URL}/>} /> 
              <Route path='/orders/:id' element={<Orders url={API_URL}/>} /> 
              <Route path='/completedorders' element={<CompletedOrders url={API_URL}/>} /> 
              <Route path='/completedorders/:id' element={<CompletedOrdersDetails url={API_URL}/>} /> 
              <Route path='/acceptedorders' element={<AcceptedOrders url={API_URL}/>} /> 
              <Route path='/acceptedorders/:id' element={<AcceptedOrdersDetails url={API_URL}/>} /> 
              <Route path='/rejectedorders' element={<RejectedOrders url={API_URL}/>} /> 
              <Route path='/rejectedorders/:id' element={<RejectedOrdersDetails url={API_URL}/>} /> 
              <Route path='/signup' element={<AdminSignup url={API_URL}/>} /> 
              <Route path='/login' element={<AdminLogin url={API_URL}/>} /> 
            </Routes >
            </div>
          </AdminProvider>
        </AuthProvider>
    </div>
  )
}

export default App